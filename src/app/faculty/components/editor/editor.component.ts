import { Subject } from 'rxjs';
import { Question, TempQuestion } from '../../model/question';
import { QgenService } from './../../service/qgen.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuerstionService } from '../../service/querstion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();
  // public questionList;
  public questLength: number;
  // public questions1;
  questions: Question[];
  tempQuestion: TempQuestion;
  reqId: string;
  // requet_id: string;
  reasons: string[] = [
    "Simply didn't need it",
    'Inaccuracy in question/answer choices',
    'Inaccuracy in explanation',
    'Question was too easy',
  ];
  constructor(
    private qgenService: QgenService,
    private questionService: QuerstionService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.reqId = this.activatedRoute.snapshot.params['reqId'];
    if(this.reqId) {
      this.getAllQuestions(this.reqId);
    }
    console.log(this.reqId);
  }

  getAllQuestions(reqId: string) {
    let data = { reqId };
    this.questionService.getAllQuestions(data).subscribe((doc: any) => {
      console.log(doc.result);
      this.questLength = doc.result.length;
      this.questions = doc.result;
      this.getQuestion(this.questions[0]._id, 0);
    });
  }
  // getdata() {
  //   this.qgenService.getQgenQuestionData().subscribe((res: any) => {
  //     console.log(res);

  //     this.questions = res[0]?.questions;
  //     this.requet_id = res[0]?.request_id;
  //   });
  // }
  getQuestion(question_id: string, index: number) {
    const findQuestion = this.questions.find((q) => q._id === question_id);
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
