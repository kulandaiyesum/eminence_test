import { Subject } from 'rxjs';
import { Question, TempQuestion } from '../../model/question';
import { QgenService } from './../../service/qgen.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();
  questions: Question[];
  tempQuestion: TempQuestion;
  requet_id: string;
  reasons: string[] = [
    "Simply didn't need it",
    'Inaccuracy in question/answer choices',
    'Inaccuracy in explanation',
    'Question was too easy',
  ];
  constructor(private qgenService: QgenService) {}
  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    this.qgenService.getQgenQuestionData().subscribe((res: any) => {
      this.questions = res[0]?.questions;
      this.requet_id = res[0]?.request_id;
      this.getQuestion(this.questions[0].id, 0);
    });
  }
  getQuestion(question_id: string, index: number) {
    const findQuestion = this.questions.find((q) => q.id === question_id);
    this.tempQuestion = {
      index: index,
      question: findQuestion,
    };
  }

  saveChange() {
    console.log('save called in parent');
    this.eventsSubject.next();
  }
}
