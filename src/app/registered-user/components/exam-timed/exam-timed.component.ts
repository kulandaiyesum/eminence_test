import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { QgenOption, Question } from 'src/app/faculty/model/question';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';
import { ExamService } from '../../service/exam.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ExamtimedComfirmationComponent } from '../examtimed-comfirmation/examtimed-comfirmation.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { NotesComponent } from '../notes/notes.component';
import { LabValuesComponent } from '../lab-values/lab-values.component';
import Scrollbar from 'smooth-scrollbar';


class payloadQuestion {
  questionId: string;
  selectedAnswer: string;
  isCorrectAnswer: string;
  flag: string = 'NO';
  time: number;
  selectedAnswerId: string;
}
@Component({
  selector: 'app-exam-timed',
  templateUrl: './exam-timed.component.html',
  styleUrls: ['./exam-timed.component.scss'],
})
export class ExamTimedComponent implements OnInit, OnDestroy {
  private userFirstName: string = '';
  private userId: string = '';
  private secretKey: string = environment.secretKey;
  private examTimedObject: any = {
    studentId: '',
    questions: [],
    mode: '',
    time: 0,
    percentage: 0,
    questionsCount: 0,
    correctQuestions:0,
    subjectId: '',
    createdBy: '',
  };
  questions: Question[];
  selectedQuestion: Question;
  selectOption = '';

  private examArray: payloadQuestion[] = [];
  tempQuestionIndex = 0;
  private tempOption = '';
  isFlag: boolean;
  private timer: number = 0;
  displayTimer: string;
  private IntevelStoper: any;

  setHeight: boolean = false;
  private examStoper: any;
  private calcutatedTime: number;
  private savedTimer: number = 0;
  private savedCalculatedTime: number = 0;
  private timePerQuestion = environment.timePerQuestion;

  public liveExamRoomCode;
  chatMessages = [
    {
      userName: 'Emily',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky,Wow, This question is actually pretty tricky,Wow, This question is actually pretty tricky,Wow, This question is actually pretty tricky,Wow, This question is actually pretty tricky',
    },
    {
      userName: 'John',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'Joe',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'sri',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'honey',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'swathi',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'dhara',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'tamil',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'jawahar',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'veera',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    {
      userName: 'shek',
      timestamp: '09:20',
      text: 'Wow, This question is actually pretty tricky',
    },
    // Add more messages as needed
  ];

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(
    private rsaService: RsaService,
    private examService: ExamService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.stopTimer();
    clearInterval(this.examStoper);
  }
  ngOnInit(): void {
    this.questions = JSON.parse(localStorage.getItem('emex-td'));
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );
    this.examTimedObject.mode = localStorage.getItem('emm'); //mode
    if (localStorage.getItem('emsm') === 'undefined') {
    } else {
      this.examTimedObject.systemId = localStorage.getItem('emsm'); //systemId
    }
    if (localStorage.getItem('emssm') === 'undefined') {
    } else {
      this.examTimedObject.subSystemId = localStorage.getItem('emssm'); //subsystemId
    }

    this.examTimedObject.subjectId = localStorage.getItem('emsbi'); //subject
    this.examTimedObject.createdBy = this.userFirstName;
    this.examTimedObject.studentId = this.userId;
    this.selectedQuestion = this.questions[0];
    this.startTimer();
    this.displayTimerUI();
    this.liveExamRoomCode = localStorage.getItem('8');
    console.log(this.liveExamRoomCode);
  }

  ngAfterViewInit() {
    const scrollbar = Scrollbar.init(this.scrollContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });
  }

  navigateQuestion(questionId: string, index: number) {
    this.selectedQuestion = this.questions.find((q) => q._id === questionId);
    this.tempQuestionIndex = index;
    this.isFlaggedByDefault(questionId);
    this.startTimer();
  }
  navigateQuestionByIndex(index: number) {
    this.selectedQuestion = this.questions[index];
    this.tempQuestionIndex = index;
    this.isFlaggedByDefault(this.selectedQuestion._id);
    this.startTimer();
  }
  isFlagged(event: any) {
    if (event.target.id === this.selectedQuestion._id) {
      const tempObj = this.examArray.find(
        (question) => question.questionId === this.selectedQuestion._id
      );
      if (tempObj !== undefined) {
        this.examArray.forEach((payloadQuestion) => {
          if (payloadQuestion.questionId === this.selectedQuestion._id) {
            if (payloadQuestion.flag === 'YES') {
              payloadQuestion.flag = 'NO';
            } else {
              payloadQuestion.flag = 'YES';
            }
          }
        });
      } else {
        let tempPayloadQuestion: payloadQuestion = {
          questionId: '',
          selectedAnswer: '',
          isCorrectAnswer: '',
          flag: 'NO',
          time: 0,
          selectedAnswerId: '',
        };
        tempPayloadQuestion.flag = 'YES';
        tempPayloadQuestion.questionId = this.selectedQuestion._id;
        this.examArray.push(tempPayloadQuestion);
      }
    }
  }
  isFlaggedByDefault(selectedQuestionId: string) {
    if (this.examArray === undefined) {
      return;
    }
    const tempObj = this.examArray.find(
      (question) => question.questionId === selectedQuestionId
    );
    if (tempObj === undefined) {
      this.isFlag = false;
    } else {
      tempObj.flag === 'YES' ? (this.isFlag = true) : (this.isFlag = false);
      this.selectOption =
        tempObj.selectedAnswerId === '' ? '' : tempObj.selectedAnswerId;
    }
  }
  gotoNext(selectedQuestion: Question, selectedOptionId: string) {
    if (selectedOptionId !== undefined && selectedOptionId !== '') {
      const tempObj = this.examArray.find(
        (question) => question.questionId === selectedQuestion?._id
      );
      const correctAnswer: QgenOption = selectedQuestion.options.find(
        (item: any) => item.explanation != null
      );
      if (tempObj !== undefined) {
        this.examArray.forEach((payloadQuestion) => {
          if (payloadQuestion.questionId === this.selectedQuestion._id) {
            payloadQuestion.isCorrectAnswer =
              correctAnswer._id === selectedOptionId ? 'YES' : 'NO';
            payloadQuestion.selectedAnswer = this.tempOption;
            payloadQuestion.selectedAnswerId = selectedOptionId;
            payloadQuestion.time = this.timer;
          }
        });
      } else {
        let tempPayloadQuestion: payloadQuestion = {
          questionId: '',
          selectedAnswer: '',
          isCorrectAnswer: '',
          flag: 'NO',
          time: 0,
          selectedAnswerId: '',
        };
        tempPayloadQuestion.isCorrectAnswer =
          correctAnswer._id === selectedOptionId ? 'YES' : 'NO';
        tempPayloadQuestion.questionId = selectedQuestion?._id;
        tempPayloadQuestion.selectedAnswer = this.tempOption;
        tempPayloadQuestion.time = this.timer;
        tempPayloadQuestion.selectedAnswerId = selectedOptionId;
        this.examArray.push(tempPayloadQuestion);
      }
    }
    if (this.questions.length === this.tempQuestionIndex + 1) return;
    this.navigateQuestionByIndex(this.tempQuestionIndex + 1);
  }
  selectOptionIndex(i: number) {
    this.tempOption = this.generateAlphabetChar(i);
  }

  generateAlphabetChar(index: number): string {
    return String.fromCharCode(65 + index);
  }

  startTimer() {
    this.stopTimer();
    if (this.savedTimer !== 0 && this.timer === this.savedTimer) {
      this.savedTimer = 0;
    } else {
      this.timer = 0;
      const tempObj = this.examArray.find(
        (payloadQuestion) =>
          payloadQuestion.questionId === this.selectedQuestion._id
      );
      if (tempObj) {
        this.timer = tempObj.time;
      }
    }
    this.IntevelStoper = setInterval(() => {
      this.timer++;
    }, 1000);
  }

  displayTimerUI() {
    if (
      this.savedCalculatedTime !== 0 &&
      this.calcutatedTime === this.savedCalculatedTime
    ) {
      this.savedCalculatedTime = 0;
    } else {
      this.calcutatedTime = this.timePerQuestion * this.questions.length;
    }
    this.examStoper = setInterval(() => {
      this.calcutatedTime--;
      const min = Math.floor(this.calcutatedTime / 60);
      const sec = this.calcutatedTime % 60;
      this.displayTimer = `${String(min).padStart(2, '0')}:${String(
        sec
      ).padStart(2, '0')}`;
      if (this.calcutatedTime === 0) {
        this.stopDisplayTimerAndEndExam();
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.IntevelStoper);
  }
  stopDisplayTimerAndEndExam() {
    clearInterval(this.examStoper);
    this.submitExam(true);
  }

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

  isCurrentQuestion(questionId: string): boolean {
    return questionId === this.selectedQuestion._id;
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
    this.examTimedObject.correctQuestions = correctAnswers;
    percentage = (correctAnswers / qLength) * 100;
    return parseFloat(percentage.toFixed(2));
  }

  openCalculatorPopup() {
    const dialogRef = this.dialog.open(CalculatorComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  openNotesPopup() {
    const dialogRef = this.dialog.open(NotesComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openLabValues() {
    const dialogOption = {
      width: '80%',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(LabValuesComponent, dialogOption);
  }

  timeTakenForExam(): number {
    const TotalExamTime = this.timePerQuestion * this.questions.length;
    return TotalExamTime - this.calcutatedTime;
  }

  submitExam(isTimeOut: boolean = false) {
    this.stopTimer();
    clearInterval(this.examStoper);
    this.savedTimer = this.timer;
    this.savedCalculatedTime = this.calcutatedTime;
    this.examTimedObject.percentage = this.calculateResultInPercentage();
    console.log('is time out', isTimeOut);
    let dialogBoxSettings = {
      width: isTimeOut ? '400px' : '500px',
      margin: '0 auto',
      border: '1px solid #000',
      data: isTimeOut,
    };
    const dialogRef = this.dialog.open(
      ExamtimedComfirmationComponent,
      dialogBoxSettings
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (
        (isTimeOut && (result === 'YES' || result === undefined)) ||
        (!isTimeOut && result === 'YES')
      ) {
        this.examTimedObject.questions = this.examArray;
        this.examTimedObject.time = this.timeTakenForExam();
        this.examTimedObject.questionsCount = this.questions.length;
        console.log(this.examTimedObject);
        this.examService.examSubmit(this.examTimedObject).subscribe(
          (response: any) => {
            console.log(response);
            localStorage.removeItem('8');
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
            this.toastr.error(error.error.message, '', { timeOut: 3000 });
          }
        );
      } else {
        this.timer = this.savedTimer;
        this.calcutatedTime = this.savedCalculatedTime;
        this.startTimer();
        this.displayTimerUI();
      }
    });
  }
}

// following function can be used in future development

// isQuestionSubmited(questionId: string): boolean {
//   let result = false;
//   const tempObj = this.examArray.find(
//     (payloadObj) => payloadObj.questionId === questionId
//   );
//   if (tempObj && tempObj.selectedAnswerId !== '') {
//     result = true;
//   }
//   return result;
// }

// isDefaultQuestion(questionId: string): boolean {
//   let result = false;
//   const tempObj = this.examArray.find(
//     (payloadObj) => payloadObj.questionId === questionId
//   );
//   if (tempObj && tempObj.selectedAnswerId == '' && (tempObj.flag == 'YES'||tempObj.flag == 'NO')) {
//     result = true;
//   }
//   return result
// }
