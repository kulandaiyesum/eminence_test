import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/faculty/model/question';
import { QuerstionService } from 'src/app/faculty/service/querstion.service';
import Scrollbar from 'smooth-scrollbar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import Swal from 'sweetalert2';
import {
  Exam,
  ExamTutorOption,
  indexBasedQuestionType,
} from '../../model/exam.class';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';
import { ExamService } from '../../service/exam.service';
import { LabValuesComponent } from '../lab-values/lab-values.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { MatDialog } from '@angular/material/dialog';
import { NotesComponent } from '../notes/notes.component';
import { ToastrService } from 'ngx-toastr';

class examTutorPayload {
  studentId: string;
  questions: Exam[];
  createdBy: string;
  mode: string = 'TUTOR';
  examType: string = 'SINGLE'; // 'SINGLE', 'GROUP'
  correctQuestions: number = 0;
  percentage: number = 0;
}
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  public questLength: number;
  @ViewChild('scrollExplanationContainer')
  scrollExplanationContainer: ElementRef;
  @ViewChild('scrollQuestionContainer') scrollQuestionContainer: ElementRef;
  public indexBasedQuestions: indexBasedQuestionType;
  public showExplanations: boolean = false;
  public currentQuestionIndex: number = 0; //
  public correctNews: boolean;
  public incorrectNews: boolean;
  selectedOption: ExamTutorOption; // option object
  secretKey: string = environment.secretKey;
  userId: string = '';
  userFirstName: string = '';
  examArray: Exam[] = [];
  toDisplayEnd: number;
  flagChecked: boolean = false;
  calculatorPopupVisible = false;
  questions: indexBasedQuestionType[];
  selectOption = ''; // this for chosing options
  setHeight: boolean = false; // this for option(lab, calculator and notes)
  isQuestionsFromQgen: boolean = false;
  public examObject: examTutorPayload;

  private requestid: string;
  type: number; // the value maybe 0, 1, 2 or 3
  constructor(
    private route: ActivatedRoute,
    private rsaService: RsaService,
    private examService: ExamService,
    private router: Router,
    private dialog: MatDialog,
    private toster: ToastrService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.requestid = params['id'];
    });
    this.examObject = new examTutorPayload();
    this.questions = JSON.parse(localStorage.getItem('emex-td'));
    this.questLength = this.questions.length;
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );
    this.examObject.studentId = this.userId;
    this.examObject.createdBy = this.userFirstName;
    this.questions.forEach((question: indexBasedQuestionType) => {
      let tempQuestionObj: Exam = new Exam();
      tempQuestionObj.questionId = question._id;
      tempQuestionObj.studentId = this.userId;
      tempQuestionObj.createdBy = this.userFirstName;
      this.examArray.push(tempQuestionObj);
    });
    this.getQuestionsIndexBased(0);

    this.type = +localStorage.getItem('qbt');
    // console.log('type in exam tutor mode', this.type);
  }

  ngAfterViewInit() {
    const scrollbars = Scrollbar.init(
      this.scrollExplanationContainer.nativeElement,
      {}
    );
    const scrollbar = Scrollbar.init(
      this.scrollQuestionContainer.nativeElement,
      {}
    );
  }

  getQuestionsIndexBased(index: number) {
    this.indexBasedQuestions = this.questions[index];
    if (this.indexBasedQuestions.status === 'Pending') {
      this.isQuestionsFromQgen = true;
    }
    this.showExplanations = false;
    this.incorrectNews = false;
    this.correctNews = false;
    this.flagChecked = false;
    this.isFlaggedByDefault(this.indexBasedQuestions._id);
  }

  isFlaggedByDefault(questionId: string) {
    const tempPayloadObj = this.examArray.find(
      (p) => p.questionId === questionId
    );
    if (tempPayloadObj) {
      this.flagChecked = tempPayloadObj.flag === 'YES' ? true : false;
      this.selectOption =
        tempPayloadObj.selectedAnswerId === ''
          ? ''
          : tempPayloadObj.selectedAnswerId;
    } else {
      this.flagChecked = false;
    }
  }

  /**
   * Function to change question by clicking the buttons(1,2,3,...)
   * @param i (index)
   */
  changeQuestions(i: number) {
    this.currentQuestionIndex = i;
    this.getQuestionsIndexBased(i);
  }
  openDialog() {
    const dialogRef = this.dialog.open(LabValuesComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  optionSelected(i: number, selectedOption: ExamTutorOption) {
    const correctOption = this.indexBasedQuestions.options.find(
      (option) => option.correctAnswer === 'true'
    );
    const selectedOptionIndex: string = this.generateAlphabetChar(i);
    if (correctOption._id === selectedOption._id) {
      this.showExplanations = true;
      this.correctNews = true;
      this.incorrectNews = false;
      Swal.fire({
        title: 'Your answer is correct!',
        width: '500px',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });
      this.examArray.forEach((payloadObj) => {
        if (payloadObj.questionId === this.indexBasedQuestions._id) {
          payloadObj.isCorrectAnswer = 'YES';
          payloadObj.selectedAnswer = selectedOptionIndex;
          payloadObj.selectedAnswerId = selectedOption._id;
        }
      });
    } else {
      Swal.fire({
        title: 'You selected the wrong answer',
        width: '500px',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.showExplanations = true;
          this.incorrectNews = true;
          this.correctNews = false;
        }
        this.examArray.forEach((payloadObj) => {
          if (payloadObj.questionId === this.indexBasedQuestions._id) {
            payloadObj.isCorrectAnswer = 'NO';
            payloadObj.selectedAnswer = selectedOptionIndex;
            payloadObj.selectedAnswerId = selectedOption._id;
          }
        });
      });
    }
  }

  generateAlphabetChar(index: number): string {
    return String.fromCharCode(65 + index);
  }

  previous() {
    this.currentQuestionIndex = this.currentQuestionIndex - 1;
    this.getQuestionsIndexBased(this.currentQuestionIndex);
  }

  next() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.getQuestionsIndexBased(this.currentQuestionIndex);
  }

  flagChanges(event: any) {
    if (event.target.id === this.indexBasedQuestions._id) {
      this.examArray.forEach((payloadObj) => {
        if (payloadObj.questionId === event.target.id) {
          payloadObj.flag = this.flagChecked ? 'YES' : 'NO';
        }
      });
    }
  }
  showEndExamConfirmation() {
    const notAnsweresQuestionLength = this.examArray.filter(
      (p) => p.selectedAnswerId === ''
    ).length;
    Swal.fire({
      title:
        notAnsweresQuestionLength !== 0
          ? 'Not all questions have been answered. Do you want to finish the exam?'
          : 'Are you sure want to end this exam?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, end it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitExam();
      }
    });
  }

  submitExam() {
    // systemId?: string;
    // subSystemId?: string;
    // subjectId?: string;
    // from?: string; // checking where there the questions generated form qgen or qbank. if its qbank dont send field to server. if its from qgen send form = 'qgen'
    // requestid: string;

    if (this.isQuestionsFromQgen) {
      const tempObjQgen = {
        from: 'qgen',
        requestid: this.requestid,
      };
      Object.assign(this.examObject, tempObjQgen);
    } else {
      const tempObjTutor = {
        systemId: localStorage.getItem('emsm'),
        subSystemId: localStorage.getItem('emssm'),
        subjectId: localStorage.getItem('emsbi'),
      };
      Object.assign(this.examObject, tempObjTutor);
    }
    this.examObject.questions = this.examArray;
    this.examObject.percentage = this.calculateResultInPercentage();
    this.examService.examSubmit(this.examObject).subscribe(
      (response: any) => {
        // console.log(response);
        if (this.type === 2 || this.type === 3) {
          this.examService.examSubmitPatch(this.examObject).subscribe(
            (response: any) => {
              // console.log(response);
            },
            (err: any) => {
              // console.log(err);
              this.toster.error(err.error.message, '', {
                timeOut: 3000,
              });
            }
          );
        }
        localStorage.removeItem('emex-td');
        Swal.fire('Exam finished', 'Have a look on performance board').then(
          (result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/eminence/student/saved']);
            }
            this.router.navigate(['/eminence/student/saved']);
          }
        );
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
  openCalculatorPopup() {
    const dialogRef = this.dialog.open(CalculatorComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  closeCalculatorPopup() {
    this.calculatorPopupVisible = false;
  }
  openNotepadEditor() {
    const dialogRef = this.dialog.open(NotesComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The notepad dialog was closed');
    });
  }

  isQuestionSubmited(questionId: string): boolean {
    let result = false;
    const tempObj = this.examArray.find(
      (payloadObj) => payloadObj.questionId === questionId
    );
    if (tempObj && tempObj.selectedAnswerId !== '') {
      result = true;
    }
    return result;
  }

  /**
   * the bellow function will check the current qustion is flagged or not
   * @param questionId
   * @returns
   */
  isflaggedQuestion(questionId: string): boolean {
    const tempObj = this.examArray.find(
      (payloadObj) => payloadObj.questionId === questionId
    );
    let returnOBj = false;
    if (tempObj && tempObj.flag === 'YES') {
      returnOBj = true;
    }
    return returnOBj;
  }

  calculateResultInPercentage(): number {
    let percentage = 0;
    let correctAnswers = 0;
    let worngAnswers = 0;
    const qLength = this.questions.length;
    this.examArray.forEach((p) => {
      if (p.isCorrectAnswer === 'YES') {
        correctAnswers++;
      } else {
        worngAnswers++;
      }
    });
    this.examObject.correctQuestions = correctAnswers;
    percentage = (correctAnswers / qLength) * 100;
    return parseFloat(percentage.toFixed(2));
  }
}
