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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const correctAnswer = this.tempQuestion.question?.options.find(
      (option) => option.correct_answer === true
    );
    if (correctAnswer) {
      this.selectedAnswer = correctAnswer.id;
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
      (option) => option.correct_answer === true
    );
    if (selectedOption) {
      this.selectedAnswer = selectedOption.id;
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
      (option) => option.id === optionid
    );
    if (correctAnswer) {
      this.selectedAnswer = correctAnswer.id;
      this.selectedOptionExplanation = correctAnswer.explanation;
    }
  }

  saveChanges() {
    this.isEditMode = false;
    this.cdr.detectChanges();
    console.log('child selected', this.isEditMode);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
