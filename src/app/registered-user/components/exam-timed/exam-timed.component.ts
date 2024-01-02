import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { Message } from '../../model/message';
import { PrivateExamService } from '../../service/private-exam.service';
import { FormControl, FormGroup } from '@angular/forms';
import { indexBasedQuestionType } from '../../model/exam.class';
import { MatSidenav } from '@angular/material/sidenav';

class payloadQuestion {
  questionId: string = '';
  selectedAnswer: string = '';
  isCorrectAnswer: string = 'NO';
  flag: string = 'NO';
  time: number = 0;
  createdBy: string = '';
  studentId: string = '';
  selectedAnswerId: string = '';
}
@Component({
  selector: 'app-exam-timed',
  templateUrl: './exam-timed.component.html',
  styleUrls: ['./exam-timed.component.scss'],
})
export class ExamTimedComponent implements OnInit, OnDestroy {
  public message: Message;
  public currentTime;
  public currentTime1;
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
    correctQuestions: 0,
    subjectId: '',
    createdBy: '',
    examType: 'SINGLE',
  };
  questions: indexBasedQuestionType[];
  selectedQuestion: indexBasedQuestionType;
  selectOption = '';

  private examArray: payloadQuestion[] = [];
  tempQuestionIndex = 0;
  private tempOption = '';
  isFlag: boolean = false;
  private timer: number = 0;
  displayTimer: string;
  private IntevelStoper: any;
  public chatData;
  public messageList = [];

  setHeight: boolean = false;
  private examStoper: any;
  private calcutatedTime: number;
  private savedTimer: number = 0;
  private savedCalculatedTime: number = 0;
  private timePerQuestion = environment.timePerQuestion;
  showCalculator: boolean = false;
  showNotepad: boolean = false;
  showLabValues: boolean = false;

  public liveExamRoomCode: string;
  chatForm: FormGroup;
  private chartIntervalId;
  // @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('target') private myScrollContainer: ElementRef;
  gettingChatData;
  type: number; // the value maybe 0, 1, 2 or 3
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private rsaService: RsaService,
    private examService: ExamService,
    private router: Router,
    private toastr: ToastrService,
    private privateExamService: PrivateExamService,
    public dialog: MatDialog,
    private zone: NgZone
  ) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl(),
    });
  }
  ngOnDestroy(): void {
    this.stopTimer();
    clearInterval(this.examStoper);
    this.stopChartInterval();
    localStorage.setItem('11', 'true');
  }
  ngOnInit(): void {
    this.message = new Message();
    this.currentTime = new Date();
    const hours = this.currentTime.getHours();
    const min = this.currentTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = min < 10 ? '0' + min : min;
    this.currentTime1 = `${formattedHours}:${formattedMinutes} ${ampm}`;
    this.questions = JSON.parse(localStorage.getItem('emex-td'));
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );
    this.type = +localStorage.getItem('qbt');
    // console.log('type in exam timed mode', this.type);
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

    this.questions.forEach((question: indexBasedQuestionType) => {
      let tempQuestionObj: payloadQuestion = new payloadQuestion();
      tempQuestionObj.questionId = question._id;
      tempQuestionObj.studentId = this.userId;
      tempQuestionObj.createdBy = this.userFirstName;
      this.examArray.push(tempQuestionObj);
    });
    this.liveExamRoomCode = localStorage.getItem('8');
    this.gettingChatData = { roomCode: this.liveExamRoomCode };
    if (this.liveExamRoomCode) {
      this.examTimedObject.examType = 'GROUP';
      this.clickMessage();
      this.getChatmessages();
      this.startChartInterval();
    }
    localStorage.setItem('11', 'false');
    console.log(localStorage.getItem('11'));
    // window.location.reload();
  }

  // ngAfterViewInit() {
  //   const scrollbar = Scrollbar.init(this.myScrollContainer.nativeElement, {
  //     // Smooth Scrollbar options go here
  //   });
  // }

  navigateQuestion(questionId: string, index: number) {
    const highlightedElements = document.querySelectorAll('.highlighted-text');
    highlightedElements.forEach((element) => {
      element.outerHTML = element.innerHTML;
    });
    this.selectedQuestion = this.questions.find((q) => q._id === questionId);
    this.tempQuestionIndex = index;
    this.isFlaggedByDefault(questionId);
    this.startTimer();
  }
  navigateQuestionByIndex(index: number) {
    const highlightedElements = document.querySelectorAll('.highlighted-text');
    highlightedElements.forEach((element) => {
      element.outerHTML = element.innerHTML;
    });
    this.selectedQuestion = this.questions[index];
    this.tempQuestionIndex = index;
    this.isFlaggedByDefault(this.selectedQuestion._id);
    this.startTimer();
  }
  isFlagged(event: any) {
    if (event.target.id === this.selectedQuestion._id) {
      this.examArray.forEach((payloadQuestion) => {
        if (payloadQuestion.questionId === this.selectedQuestion._id) {
          // if (payloadQuestion.flag === 'YES') {
          //   payloadQuestion.flag = 'NO';
          // } else {
          //   payloadQuestion.flag = 'YES';
          // }
          payloadQuestion.flag = this.isFlag ? 'YES' : 'NO';
        }
      });
    }
  }
  isFlaggedByDefault(selectedQuestionId: string) {
    const tempObj = this.examArray.find(
      (question) => question.questionId === selectedQuestionId
    );
    if (tempObj) {
      this.isFlag = tempObj.flag === 'YES' ? true : false;
      this.selectOption =
        tempObj.selectedAnswerId === '' ? '' : tempObj.selectedAnswerId;
    } else {
      this.isFlag = false;
    }
  }
  gotoNext(selectedQuestion: indexBasedQuestionType, selectedOptionId: string) {
    if (selectedOptionId !== undefined && selectedOptionId !== '') {
      const correctAnswer: QgenOption = selectedQuestion.options.find(
        (item: any) => item.explanation != null
      );
      this.examArray.forEach((payloadQuestion) => {
        if (payloadQuestion.questionId === this.selectedQuestion._id) {
          payloadQuestion.isCorrectAnswer =
            correctAnswer._id === selectedOptionId ? 'YES' : 'NO';
          payloadQuestion.selectedAnswer = this.tempOption;
          selectedOptionId
            ? (payloadQuestion.selectedAnswerId = selectedOptionId)
            : '';
          payloadQuestion.time = this.timer;
        }
      });
    }
    if (this.questions.length === this.tempQuestionIndex + 1) return;
    this.selectOption = '';
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

  // openLabValues() {
  //   if (this.sidenav._animationState === 'open') {
  //     this.sidenav.close();
  //   } else {
  //     this.sidenav.open();
  //   }
  // }

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
    // console.log('is time out', isTimeOut);
    // console.log(this.examArray, this.isAllQuestionsAttend());
    let dialogBoxSettings = {
      width: isTimeOut ? '400px' : '500px',
      margin: '0 auto',
      border: '1px solid #000',
      data: { isTimeOut, isAllQuestionsAttend: this.isAllQuestionsAttend() },
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
            // console.log(response);
            if (this.type === 2 || this.type === 3) {
              this.examService.examSubmitPatch(this.examTimedObject).subscribe(
                (response: any) => {},
                (err: any) => {
                  this.toastr.error(err.error.message, '', {
                    timeOut: 3000,
                  });
                }
              );
            }
            localStorage.removeItem('8');
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
  clickMessage() {
    this.message.time = this.currentTime1;
    this.message.senderUsername = this.userFirstName;
    this.message.roomCode = this.liveExamRoomCode;
    this.privateExamService.updateChat(this.message).subscribe((doc) => {
      this.chatForm.reset();
      let data1 = { roomCode: this.liveExamRoomCode };
      this.privateExamService.getByRoomCode(data1).subscribe((doc1: any) => {
        this.chatData = doc1.result;
        this.messageList = this.chatData.messageList;
        console.log(this.messageList);
        this.messageList = this.messageList.filter(
          (item: any) => item.replymessage !== undefined
        );
        setTimeout(() => {
          this.scrollToElement();
        }, 500);
      });
    });
  }

  scrollToElement(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
    // console.log(" bottom la pacha");
  }

  getChatmessages() {
    this.privateExamService
      .getByRoomCode(this.gettingChatData)
      .subscribe((doc1: any) => {
        this.chatData = doc1.result;
        this.messageList = this.chatData.messageList;
        this.messageList = this.messageList.filter(
          (item: any) => item.replymessage !== undefined
        );
        setTimeout(() => {
          this.scrollToElement();
        }, 500);
      });
  }

  startChartInterval() {
    this.chartIntervalId = setInterval(() => {
      this.getChatmessages();
    }, 1000);
  }

  stopChartInterval() {
    if (this.chartIntervalId) {
      clearInterval(this.chartIntervalId);
    }
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

  isAllQuestionsAttend() {
    let selectedQuestionLength = 0;
    this.examArray.forEach((payloadObj) => {
      if (payloadObj.selectedAnswerId !== '') {
        selectedQuestionLength++;
      }
    });
    if (this.examArray.length === 0) {
      return false;
    } else if (this.questions.length === selectedQuestionLength) {
      return true;
    } else {
      return false;
    }
  }

  closeLabValue(event: any) {
    // this.sidenav.close();
    this.showLabValues = false;
  }
  closeCalculator(event: any) {
    if (this.showCalculator) {
      this.showCalculator = false;
    }
  }
  closeNotepad(event: any) {
    if (this.showNotepad) {
      this.showNotepad = false;
    }
  }

  onMouseUp(event: MouseEvent) {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText?.length) {
      const range = window.getSelection()?.getRangeAt(0);
      const newNode = document.createElement('span');
      newNode.classList.add('highlighted-text');
      range.surroundContents(newNode);
    }
  }
}
