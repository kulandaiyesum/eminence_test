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
      console.log(doc.result);
      this.questLength = doc.result.questions.length;
      this.questions = doc.result.questions;
      this.title = doc.result.request.keywords[0];
      this.getQuestion(this.questions[0]._id, 0);
    });
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
    const payload = {
      _id: this.tempQuestion.question._id,
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
        this.questionService
          .daleteQuestion(this.tempQuestion.question._id)
          .subscribe(
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
