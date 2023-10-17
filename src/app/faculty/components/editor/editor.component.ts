import { Subject } from 'rxjs';
import { Question, TempQuestion } from '../../model/question';
import { QgenService } from './../../service/qgen.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { QuerstionService } from '../../service/querstion.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  public questLength: number;
  public title;
  public optionsAttributes = [];

  questions: Question[];
  tempQuestion: TempQuestion;
  reqId: string;
  reasons: string[] = [
    "Simply didn't need it",
    'Inaccuracy in question/answer choices',
    'Inaccuracy in explanation',
    'Question was too easy',
  ];
  showDiv = false;
  selectedAnswer: string = '';
  isEditMode: boolean = false;
  selectedOptionExplanation: string = '';
  editIconVisibility: boolean = true;
  questionId:string;
  @ViewChild('editableDiv') editableDiv: ElementRef;
  constructor(
    private qgenService: QgenService,
    private questionService: QuerstionService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.reqId = this.activatedRoute.snapshot.params['reqId'];
    if (this.reqId) {
      this.getAllQuestions(this.reqId);
    }
    console.log(this.reqId);
  }

  getAllQuestions(reqId: string) {
    let data = { reqId };
    this.questionService.getAllQuestions(data).subscribe((doc: any) => {
      this.questLength = doc.result.questions.length;
      this.questions = doc.result.questions;
      console.log(this.questions);
      this.title = doc.result.request.keywords[0];
      this.getQuestion(this.questions[0]._id, 0);
    });
  }

  showReviewAlert(question_id: string, index: number, question: any) {
    console.log(question);
    console.log(question.status);

    this.questionId=this.tempQuestion.question._id
    console.log(this.questionId);
    if (index + 1 != this.tempQuestion.index + 1 && question.status !="REVIEWED") {
      Swal.fire({
        title: 'Do you reviewed this question?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, reviewed',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.getQuestion(question_id, index); // Call your function when the user clicks "Yes, reviewed"
          this.changeStatusOfQuestion();
        } else {
          // Handle the "No" case (close the popup or perform any other action)
        }
      });
    }
  }

  getQuestion(question_id: string, index: number) {
    const findQuestion = this.questions.find((q) => q._id === question_id);
    this.editIconVisibility = !findQuestion.isEdited;
    this.tempQuestion = {
      index: index,
      question: findQuestion,
    };
    this.editableDiv.nativeElement.textContent =
      this.tempQuestion.question.title;
  }

  changeStatusOfQuestion() {
    this.questionService.updateStatusOfQuestion(this.questionId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error updating resource:', error);
      }
    );
  }

  saveChange() {
    this.isEditMode = false;
    this.cdr.detectChanges();

    this.tempQuestion.question.options.forEach((option) => {
      if (option._id === this.selectedAnswer) {
        option.correctAnswer = 'true';
        option.explanation = this.selectedOptionExplanation;
      } else {
        option.correctAnswer = 'false';
        option.explanation = '';
      }
    });
    this.tempQuestion.question.options.forEach((res) => {
      this.optionsAttributes.push({
        id: res.coreOptionId,
        text: res.text,
        explanation: res.explanation,
        correct_answer: res.correctAnswer,
      });
    });
    this.tempQuestion.question.title =
      this.editableDiv.nativeElement.textContent;
    let data = {
      selectAnswer: this.selectedAnswer,
      option: this.selectedOptionExplanation,
      temp: this.tempQuestion,
      Option: this.optionsAttributes,
    };
    this.questionService
      .UpdateOption(this.reqId, data)
      .subscribe((doc: any) => {
        this.toastr.success(doc.message, '', {
          timeOut: 3000,
        });
        this.getAllQuestions(this.reqId);
      });
  }
  toggleDivSection() {
    this.showDiv = !this.showDiv;
  }

  editQuestion(question: Question) {
    this.isEditMode = true;
    const selectedOption = this.tempQuestion.question.options.find(
      (option) => option.correctAnswer === 'true'
    );
    console.log(selectedOption);
    if (selectedOption) {
      this.selectedAnswer = selectedOption._id;
      console.log(this.selectedAnswer);
      this.selectedOptionExplanation = selectedOption.explanation;
    }
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  selectAnswer(answerId: string) {
    this.selectedAnswer = answerId;
  }

  updateExplanation(optionid: string) {
    const correctAnswer = this.tempQuestion.question?.options.find(
      (option) => option._id === optionid
    );
    if (correctAnswer) {
      this.selectedAnswer = correctAnswer._id;
      this.selectedOptionExplanation = correctAnswer.explanation;
    }
  }
  deleteQuestion(reason: string) {
    console.log(this.tempQuestion.question.coreQuestionId);

    const payload = {
      _id: this.tempQuestion.question.coreQuestionId,
      reqId: this.tempQuestion.question.reqId,
      reason,
    };
    this.showDiv = false;
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.daleteQuestion(payload).subscribe(
          (response: any) => {
            console.log(response);
            this.toastr.success(response.message, '', {
              timeOut: 3000,
            });
            this.getAllQuestions(this.reqId);
          },
          (err) => {
            console.log(err);
            this.toastr.error(err.error.message, '', {
              timeOut: 3000,
            });
          }
        );
      }
    });
  }
}
