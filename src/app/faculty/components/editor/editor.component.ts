import { Question } from '../../model/question';
import { QgenService } from './../../service/qgen.service';
import { Component, HostListener, OnInit } from '@angular/core';

interface tempQuestion {
  index: number;
  question: Question;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  showDiv = false;
  questions: Question[];
  tempQuestion: tempQuestion;
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

  editQuestion(question: Question) {
    console.log(question);
  }
  deleteQuestion(question: Question) {}
  showDeleteOption() {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.showDiv) {
      return;
    }
    const target = event.target as HTMLElement;
    const divSection = document.querySelector('.why_delete');
    console.log(divSection.contains(target));
    if (!divSection && !divSection.contains(target)) {
      console.log('clg');
      this.showDiv = false;
    }
  }

  toggleDivSection() {
    console.log('clicked!');
    this.showDiv = !this.showDiv;
  }
}
