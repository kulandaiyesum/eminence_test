import { ExamDataService } from './../../service/exam-data.service';
import {
  Component,
  ElementRef,
  ViewChildren,
  ChangeDetectorRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { MatCheckbox } from '@angular/material/checkbox';
import { SubjectService } from 'src/app/master/service/subject.service';
import { SystemService } from 'src/app/master/service/system.service';
import { SubSystemService } from 'src/app/master/service/sub-system.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Subject } from 'src/app/master/model/subject.class';
import { SubSystem } from 'src/app/master/model/sub-system';
import { System } from 'src/app/master/model/system';
import { Qbank } from '../../model/qbank';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';
import { QuerstionService } from 'src/app/faculty/service/querstion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-test',
  templateUrl: './build-test.component.html',
  styleUrls: ['./build-test.component.scss'],
})
export class BuildTestComponent {
  userId: string = '';
  secretKey: string = environment.secretKey;
  filteredSubjects: Observable<Subject[]>; // subject
  filteredSystems: Observable<System[]>; // system
  filteredSubSystemOptions: Observable<any[]>; // subsystem

  qbankForm: FormGroup;
  qbankObject: Qbank;
  subjectList: Subject[] = [];
  systemList: System[];
  subsystemList: SubSystem[] = [];
  examMode: string = '';
  type: number;
  selectAllCheckbox: boolean = false;
  unusedCheckbox: boolean = false;

  constructor(
    private rsaService: RsaService,
    private cdr: ChangeDetectorRef,
    private subjectService: SubjectService,
    private questionService: QuerstionService,
    private systemService: SystemService,
    private subSystemService: SubSystemService,
    private querstionService: QuerstionService,
    private examDataService: ExamDataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
  }

  ngOnInit(): void {
    this.qbankObject = new Qbank();
    this.qbankForm = this.fb.group(
      {
        _id: [''],
        subjectId: ['', Validators.required],
        systemId: ['', Validators.required],
        subsystemId: ['', Validators.required],
        type0: false,
        type1: false,
        type2: false,
        type3: false,
        type4: false,
        questionsCount: [
          '',
          [
            Validators.required,
            // this.maxQuestionsValidator,
            Validators.max(40),
            Validators.min(1),
          ],
        ],
        mode1: false,
        mode2: false,
      },
      {
        validators: Validators.compose([
          this.atLeastOneTypeSelectedValidator(),
          this.atLeastOneModeSelectedValidator(),
        ]),
      }
    );
    this.getAllSubject();
    this.getAllSystem();
    this.getAllSubsystem();

    this.qbankForm.get('type0').valueChanges.subscribe((typeAll) => {
      console.log(typeAll);
      if (typeAll) {
        this.qbankForm.get('type1').setValue(true);
        this.qbankForm.get('type2').setValue(true);
        this.qbankForm.get('type3').setValue(true);
      } else {
        this.qbankForm.get('type1').setValue(false);
        this.qbankForm.get('type2').setValue(false);
        this.qbankForm.get('type3').setValue(false);
      }
    });
  }
  toggleChanged(selectedMode: string) {
    this.examMode = '';
    if (this.examMode === selectedMode) {
      this.qbankForm.get('mode1').setValue(false);
      this.qbankForm.get('mode2').setValue(false);
      this.examMode = '';
    }
    this.examMode = selectedMode;
  }

  maxQuestionsValidator(control: AbstractControl): ValidationErrors | null {
    const maxQuestions = 40;
    if (control.value > maxQuestions) {
      return { max: true };
    }
    return null;
  }
  atLeastOneModeSelectedValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const mode1 = control.get('mode1').value;
      const mode2 = control.get('mode2').value;
      if (!(mode1 || mode2)) {
        return { atLeastOneMode: true };
      }
      return null;
    };
  }
  atLeastOneTypeSelectedValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const type0 = control.get('type0').value;
      const type1 = control.get('type1').value;
      const type2 = control.get('type2').value;
      const type3 = control.get('type3').value;
      const type4 = control.get('type4').value;
      if (!(type0 || type1 || type2 || type3 || type4)) {
        return { atLeastOneType: true };
      }
      return null;
    };
  }

  generateTest() {
    const temp = this.qbankForm.value;
    // const typeArray: number[] = [];
    let type: number;
    for (let i = 0; i <= 4; i++) {
      if (temp[`type${i}`]) {
        // typeArray.push(i);
        type = i;
        break;
      }
    }
    this.qbankObject.mode = this.examMode;
    this.qbankObject.questionsCount = parseInt(temp.questionsCount, 10);
    this.qbankObject.subjectId = temp.subjectId;
    this.qbankObject.subsystemId = temp.subsystemId;
    this.qbankObject.systemId = temp.systemId;
    this.qbankObject.type = type;
    this.qbankObject.userId = this.userId;
    this.qbankObject.status = 'VREVIEWED';
    console.log(this.qbankObject);
    this.questionService
      .postQbankRequest(this.qbankObject)
      .subscribe((doc: any) => {
        console.log(doc);
        const tempData = doc.result;
        // this.examDataService.setExamRoomData(tempData);
        localStorage.setItem('emex-td', JSON.stringify(tempData));
        localStorage.setItem('emm', this.qbankObject.mode);
        localStorage.setItem('emsm', this.qbankObject.systemId);
        localStorage.setItem('emssm', this.qbankObject.subsystemId);
        localStorage.setItem('emsbi', this.qbankObject.subjectId);
        if (this.qbankObject.mode === 'TUTOR') {
          this.router.navigate(['/eminence/student/exam']);
        } else {
          this.router.navigate(['/eminence/student/exam-timed']);
        }
      });
  }

  getAllSystem() {
    this.systemService.getAllSystems().subscribe((doc: any) => {
      this.systemList = doc.result;
      // console.log('system', this.systemList);
    });
  }
  getAllSubject() {
    this.subjectService.getAllTopicMaster().subscribe(
      (res: any) => {
        this.subjectList = res.result;
        // console.log('subject', this.subjectList);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getAllSubsystem() {
    this.subSystemService.getAllsubSystems().subscribe(
      (res: any) => {
        this.subsystemList = res.result;
        // console.log('subsystem', this.subsystemList);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
