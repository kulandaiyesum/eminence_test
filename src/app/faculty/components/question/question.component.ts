import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Question, TempQuestion } from '../../model/question';
import { Observable, Subscription } from 'rxjs';
import { QuerstionService } from '../../service/querstion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() tempQuestion: TempQuestion;
  @Input() eventEmitter: EventEmitter<string>;
  showDiv = false;
  selectedAnswer: string = '';
  isEditMode: boolean = false;
  selectedOptionExplanation: string = '';
  reasons: string[] = [
    "Simply didn't need it",
    'Inaccuracy in question/answer choices',
    'Inaccuracy in explanation',
    'Question was too easy',
  ];
  private eventsSubscription: Subscription;

  @Input() events: Observable<void>;

  constructor(
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private questionService: QuerstionService
  ) {}

  ngOnInit(): void {
    const correctAnswer = this.tempQuestion.question?.options.find(
      (option) => option.correctAnswer === 'true'
    );
    if (correctAnswer) {
      this.selectedAnswer = correctAnswer._id;
    }
    this.eventsSubscription = this.events.subscribe(() => {
      console.log('advjdjv', this.isEditMode);
      if (this.isEditMode) {
        this.saveChanges();
      }
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

  saveChanges() {
    this.isEditMode = false;
    this.cdr.detectChanges();
    let data = {
      selectAnswer: this.selectedAnswer,
      option: this.selectedOptionExplanation,
      temp: this.tempQuestion,
    };
    this.questionService.UpdateOption(data).subscribe((doc: any) => {
      this.toastr.success(doc.message, '', {
        timeOut: 3000,
      });
      window.location.reload();
    });
  }

  deleteQuestion(reason: string) {
    console.log(
      this.tempQuestion.question._id,
      this.tempQuestion.question.reqId,
      reason
    );
    this.showDiv = false;
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
