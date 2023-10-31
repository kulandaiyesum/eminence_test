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
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Subject } from 'src/app/master/model/subject.class';
import { SubSystem } from 'src/app/master/model/sub-system';
import { System } from 'src/app/master/model/system';

@Component({
  selector: 'app-build-test',
  templateUrl: './build-test.component.html',
  styleUrls: ['./build-test.component.scss'],
})
export class BuildTestComponent {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('scrollExplanationContainer')
  scrollExplanationContainer: ElementRef;
  @ViewChildren(MatCheckbox) checkboxes: QueryList<MatCheckbox>;

  subjects: Subject[] = [];
  systems: System[] = [];
  subsystemList: SubSystem[] = [];
  selectedSystem: string = 'all';
  subSystems: string[] = [];
  selectedSubSystem: string = 'all';
  public subsystemOptions: any[] = [];
  public systemList: any[];

  selectedSubjectControl = new FormControl();
  selectedSystemControl = new FormControl();
  selectedSubSystemControl = new FormControl();
  filteredSubjects: Observable<Subject[]>;
  filteredSystems: Observable<System[]>;
  filteredSubjectss: Subject[];
  selectedSubject: any;
  systemControl = new FormControl();
  filteredSystemList: Observable<any[]>;

  subSystemControl = new FormControl();
  filteredSubSystemOptions: Observable<any[]>;

  constructor(
    private cdr: ChangeDetectorRef,
    private subjectService: SubjectService,
    private systemService: SystemService,
    private subSystemService: SubSystemService
  ) {}

  ngOnInit(): void {
    this.getAllSystem();
    this.filteredSystemList = this.systemControl.valueChanges.pipe(
      startWith(''), // Start with an empty string
      map((value) => this._filterUniques(value))
    );
    this.filteredSubSystemOptions = this.subSystemControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSubSystemOptions(value))
    );
  }

  ngAfterViewInit() {
    const scrollbar = Scrollbar.init(this.scrollContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });

    this.subjectService.getAllTopicMaster().subscribe(
      (data: any) => {
        this.subjects = data.result || [];
        this.filteredSubjectss = this.subjects.slice();
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );

    this.systemService.getAllSystems().subscribe(
      (data: any) => {
        this.systems = data.result || [];
        this.filteredSystems = this.selectedSystemControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterSystems(value))
        );
      },
      (error) => {
        console.error('Error fetching systems:', error);
      }
    );

    this.getAllSubSystems();

    // Initialize the filter for subjects and systems
    this.filteredSubjects = this.selectedSubjectControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSubjects(value))
    );
  }

  filterSystems(value: any) {
    this.filteredSystems = this.selectedSystemControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterSystems(value))
    );
  }filterValue

  filterSubjects(event: any) {
    const filterValue = event.target.value.toLowerCase();
    this.filteredSubjectss = this.subjects.filter((subject: any) =>
      subject.subject.toLowerCase().includes()
    );
  }

  displayFn(subject: any): string {
    return subject && subject.subject ? subject.subject : '';
  }

  onSubjectSelected(event: MatOptionSelectionChange) {
    this.selectedSubject = event.source.value;
  }

  onSystemChange(selectedSystem: string) {
    if (selectedSystem === 'all') {
      this.getAllSubSystems();
    } else {
      this.subsystemOptions = this.getSubSystemsBySystem(selectedSystem);
    }
    console.log('Selected System:', selectedSystem);
    console.log('Subsystems:', this.subsystemOptions);
  }

  getAllSystem() {
    this.systemService.getAllSystems().subscribe((doc: any) => {
      this.systemList = doc.result;
    });
  }

  private _filterUniques(value: string): any[] {
    const filterValue = value.toLowerCase();
    if (this.systemList) {
      return this.systemList.filter((item) =>
        item.system.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  onOptionSelected(event: any) {
    const selectedValue = event.option.value;
    const matchingItems = this.subsystemList.filter(
      (item) => item.systemId.system === selectedValue
    );
    this.subsystemOptions = matchingItems;
  }

  getSubSystemsBySystem(systemId: string): string[] {
    const matchingSubSystems = this.systems.find(
      (system) => system._id === systemId
    );
    return matchingSubSystems ? matchingSubSystems.subSystemId : [];
  }

  private _filterSubSystemOptions(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.subsystemOptions.filter((system) =>
      system.subSystem.toLowerCase().includes(filterValue)
    );
  }

  onSubSystemSelected(event: any) {
    this.selectedSubSystem = event.option.value;
    this.onSubSystemSelectionChange(this.selectedSubSystem);
  }

  onSubSystemSelectionChange(selectedValue: string) {
    console.log('Selected Subsystem: ', selectedValue);
  }

  getAllSubSystems() {
    this.subSystemService.getAllsubSystems().subscribe(
      (data: any) => {
        this.subsystemList = data.result || [];
        this.subsystemOptions = this.subsystemList;
        console.log('Subsystems fetched successfully:', this.subsystemOptions);
      },
      (err: any) => {
        console.error('Error fetching subsystems:', err);
      }
    );
  }

  selectAll(event: any): void {
    const isChecked = event.checked;

    if (isChecked) {
      this.checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
    } else {
      this.checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    this.cdr.detectChanges();
  }

  onSystemSelected(selectedSystem: any) {
    this.onSystemChange(selectedSystem);
  }

  private _filterSubjects(value: string): Subject[] {
    const filterValue = value.toLowerCase();
    return this.subjects.filter((subject) =>
      subject.subject.toLowerCase().includes(filterValue)
    );
  }

  private _filterSystems(value: string): System[] {
    const filterValue = value.toLowerCase();
    return this.systems.filter((system) =>
      system.system.toLowerCase().includes(filterValue)
    );
  }
}
