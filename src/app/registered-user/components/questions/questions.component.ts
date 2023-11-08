import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  public maximumQuestionLength: number = 0;
  public examDetails: any[] = [];
  public currentQuestionsID: string;
  public selectedOptions: string;
  public answerObject;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuestionsComponent>
  ) {
    console.log(data);
    console.log(data.result);
    console.log(data.row.questionIds);
    this.examDetails = data.row.questionIds;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.questions = this.data.result;
    this.totalQuestions = this.questions.length;
    this.maximumQuestionLength = this.questions.length - 1;
    this.getQuestionsIndexBased(0);
  }
  changeQuestions(i: number) {
    this.currentQuestionIndex = i;
    this.getQuestionsIndexBased(i);
  }
  getQuestionsIndexBased(index: number) {
    this.questions = this.data.result;
    this.indexBasedQuestions = this.questions[index];
    this.currentQuestionsID = this.indexBasedQuestions._id;
    console.log(this.currentQuestionsID);
    this.indexBasedQuestions.examDetails = this.examDetails;
    this.answerObject = this.indexBasedQuestions.examDetails.filter(
      (item: any) => item.questionId === this.currentQuestionsID
    );
    console.log(this.answerObject);
    this.indexBasedQuestions.answerObject = this.answerObject;
    console.log(this.indexBasedQuestions);
    this.selectedOptions=this.indexBasedQuestions.answerObject[0].selectedAnswer
    console.log(this.selectedOptions);
  }

  generateAlphabetChar(index: number): string {
    return String.fromCharCode(65 + index);
  }

  previous() {
    console.log(this.currentQuestionIndex);
    this.currentQuestionIndex = this.currentQuestionIndex - 1;
    this.getQuestionsIndexBased(this.currentQuestionIndex);
  }

  next() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.getQuestionsIndexBased(this.currentQuestionIndex);
  }
}
