import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  public currentQuestionIndex: number = 0;
  public totalQuestions: number;
  public questions;
  public indexBasedQuestions;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.questions = this.data;
    this.totalQuestions = this.questions.length;
    this.indexBasedQuestions = this.questions[0];
  }
  changeQuestions(i: number) {
    this.currentQuestionIndex = i;
    this.getQuestionsIndexBased(i);
  }
  getQuestionsIndexBased(index: number) {
    this.questions = this.data;
  }
}
