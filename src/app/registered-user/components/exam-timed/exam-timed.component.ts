import { Component, OnInit } from '@angular/core';
import { QgenOption, Question } from 'src/app/faculty/model/question';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';
import { ExamService } from '../../service/exam.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
export class ExamTimedComponent implements OnInit {
  userFirstName: string = '';
  userId: string = '';
  secretKey: string = environment.secretKey;
  examTimedObject: any = {
    studentId: '',
    questions: [],
    mode: '',
    systemId: '',
    subSystemId: '',
    subjectId: '',
    createdBy: '',
  };
  questions: any;
  selectedQuestion: Question;
  selectOption = '';

  examArray: payloadQuestion[] = [];
  tempQuestionIndex = 0;
  tempOption = '';
  isFlag: boolean;
  timer: number = 0;
  displayTimer: any;
  IntevelStoper: any;

  setHeight: boolean = false;

  constructor(
    private rsaService: RsaService,
    private examService: ExamService,
    private router: Router
  ) {}
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
    this.examTimedObject.systemId = localStorage.getItem('emsm'); //systemId
    this.examTimedObject.subSystemId = localStorage.getItem('emssm'); //subsystemId
    this.examTimedObject.subjectId = localStorage.getItem('emsbi'); //subject
    this.examTimedObject.createdBy = this.userFirstName;
    this.examTimedObject.studentId = this.userId;
    console.log(this.examTimedObject, this.questions);
    this.selectedQuestion = this.questions[0];
    this.startTimer();
  }

  navigateQuestion(questionId: string, index: number) {
    this.selectedQuestion = this.questions.find((q) => q._id === questionId);
    this.tempQuestionIndex = index;
    this.isFlaggedByDefault(questionId);
    this.startTimer();
  }
  navigateQuestionByIndex(index: number) {
    this.questions;
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
          flag: '',
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
          flag: '',
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
    this.timer = 0;
    const tempObj = this.examArray.find(
      (payloadQuestion) =>
        payloadQuestion.questionId === this.selectedQuestion._id
    );
    if (tempObj) {
      this.timer = tempObj.time;
    }
    this.IntevelStoper = setInterval(() => {
      this.timer++;
      const min = Math.floor(this.timer / 60);
      const sec = this.timer % 60;
      this.displayTimer = `${String(min).padStart(2, '0')}:${String(
        sec
      ).padStart(2, '0')}`;
      if (this.timer >= 90) {
        this.stopTimer();
        if (this.questions.length === this.tempQuestionIndex + 1) return;
        this.navigateQuestionByIndex(this.tempQuestionIndex + 1);
      }
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.IntevelStoper);
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

  isCurrentQuestion(questionId: string): boolean {
    return questionId === this.selectedQuestion._id;
  }

  submitExam() {
    this.stopTimer();
    this.examTimedObject.questions = this.examArray;
    console.log(this.examTimedObject);
    this.examService.examTimedSubmit(this.examTimedObject).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire('Exam finished', 'Have a look on performance board').then(
          (result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/eminence/student/build-test']);
            }
            this.router.navigate(['/eminence/student/build-test']);
          }
        );
      },
      (error) => {
        console.error('An error occurred:', error);
        Swal.fire('Exam finished', 'Have a look on performance board').then(
          (result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/eminence/student/build-test']);
            }
            this.router.navigate(['/eminence/student/build-test']);
          }
        );
      }
    );
  }
}
