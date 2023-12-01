import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExamService } from '../../service/exam.service';
import { ToastrService } from 'ngx-toastr';
import {
  ExamTutorOption,
  indexBasedQuestionType,
} from '../../model/exam.class';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CalculatorComponent } from '../calculator/calculator.component';
import { LabValuesComponent } from '../lab-values/lab-values.component';
import { NotesComponent } from '../notes/notes.component';
import { LiveExamService } from '../../service/live-exam.service';

@Component({
  selector: 'app-live-examroom',
  templateUrl: './live-examroom.component.html',
  styleUrls: ['./live-examroom.component.scss'],
})
export class LiveExamroomComponent implements OnInit, OnDestroy {
  questions: indexBasedQuestionType[] = [];
  revealAnswer: boolean = false;
  constantTime: number = environment.timePerQuestion;
  currentIndex: number = 0;
  setHeight: boolean = false;

  currentQuestion: indexBasedQuestionType;
  selectedOptionId: string;
  // selectedOptionAlphaLetter: string;

  correctOptionAlphaLetter: string = '';
  correctOptionText: string = '';
  correctOption: ExamTutorOption | undefined;

  questionStopper: any;
  timer: number = 0;
  questionTimerUI: string = '00:00';

  displayTimer: string = '00:00';
  displayTimerStopper: any;

  constructor(
    private liveExamService: LiveExamService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.displayTimerStopper);
    clearInterval(this.questionStopper);
  }

  ngOnInit(): void {
    this.liveExamService.getQuestionsByTopic().subscribe(
      (data: any) => {
        console.log('response form server, first object', data.result[0]);
        this.questions = data.result;
        this.currentQuestion = this.questions[this.currentIndex];
        this.questionTimer();
        this.explanationTimer();
      },
      (err: any) => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  /**
   * function that controls timer in top of the page
   */
  questionTimer() {
    this.timer = this.constantTime;
    this.questionStopper = setInterval(() => {
      this.timer--;
      const min = Math.floor(this.timer / 60);
      const sec = this.timer % 60;
      this.questionTimerUI = `${String(min).padStart(2, '0')}:${String(
        sec
      ).padStart(2, '0')}`;
      if (this.timer === 0) {
        clearInterval(this.questionStopper);
        if (this.revealAnswer) {
          this.changeQuestion();
        } else {
          this.RevealAnswer();
        }
      }
    }, 1000);
  }

  /**
   * function go to next question
   */
  changeQuestion() {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex === this.questions.length) {
      Swal.fire({
        title: 'Exam Finished!',
        width: '500px',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then((result) => {
        this.router.navigate(['/eminence/student/exam-room']);
      });
    } else {
      this.revealAnswer = false;
      this.correctOption = undefined;
      this.correctOptionAlphaLetter = '';
      this.currentQuestion = this.questions[this.currentIndex];
      clearInterval(this.questionStopper);
      this.questionTimer();
    }
  }

  /**
   * showing timer in bottom of page
   */
  explanationTimer() {
    let tempTime = 0;
    this.displayTimerStopper = setInterval(() => {
      tempTime++;
      const min = Math.floor(tempTime / 60);
      const sec = tempTime % 60;
      this.displayTimer = `${String(min).padStart(2, '0')}:${String(
        sec
      ).padStart(2, '0')}`;
    }, 1000);
  }

  // selectOptionIndex(i: number) {
  //   this.selectedOptionAlphaLetter = this.generateAlphabetChar(i);
  // }

  generateAlphabetChar(index: number): string {
    return String.fromCharCode(65 + index);
  }

  /**
   * function to show answer
   */
  RevealAnswer() {
    this.revealAnswer = true;
    const tempCorrectOption = this.currentQuestion.options.find(
      (option) => option.explanation !== null
    );
    this.correctOption = tempCorrectOption;
    if (this.correctOption) {
      const correctOptionIndex = this.currentQuestion.options.findIndex(
        (option) => option._id === this.correctOption?._id
      );
      this.correctOptionAlphaLetter =
        this.generateAlphabetChar(correctOptionIndex);
      clearInterval(this.questionStopper);
      this.questionTimer();
    }
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
}
