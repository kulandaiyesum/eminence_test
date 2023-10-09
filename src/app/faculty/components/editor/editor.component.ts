import { Subject } from 'rxjs';
import { Question, TempQuestion } from '../../model/question';
import { QgenService } from './../../service/qgen.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuerstionService } from '../../service/querstion.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  public questionList;
  public questLength;
  public questions1;
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
  constructor(
    private qgenService: QgenService,
    private questionService: QuerstionService
  ) {}
  ngOnInit(): void {
    this.getdata();
    this.getAllQuestions();
  }

  getAllQuestions() {
    let data = { reqId: '6523aa6fa6ebf5653e6f3022' };
    this.questionService.getAllQuestions(data).subscribe((doc: any) => {
      console.log(doc.result);

      this.questLength = doc.result.length;
      this.questionList = doc.result;
      this.questions1 = doc.result[0]?.title;

      console.log(this.questions1);

      this.getQuestion(this.questionList[0]._id, 0);
    });
  }
  getdata() {
    this.qgenService.getQgenQuestionData().subscribe((res: any) => {
      console.log(res);

      this.questions = res[0]?.questions;
      this.requet_id = res[0]?.request_id;
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
