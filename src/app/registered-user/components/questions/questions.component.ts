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
  public correctOptions;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuestionsComponent>
  ) {
    console.log(data);
    console.log(data.result.questions);
    console.log(data.row.questionIds);
    this.examDetails = data.row.questionIds;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.questions = this.data.result.questions;
    this.totalQuestions = this.questions.length;
    this.maximumQuestionLength = this.questions.length - 1;
    this.getQuestionsIndexBased(0);

  }
  changeQuestions(i: number) {
    this.currentQuestionIndex = i;
    this.getQuestionsIndexBased(i);
  }
  getQuestionsIndexBased(index: number) {
    this.questions = this.data.result.questions;
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
    this.correctOptions=this.indexBasedQuestions.options.filter((item:any)=> item.explanation !=null);
    console.log(this.correctOptions);
    this.selectedOptions=this.indexBasedQuestions.answerObject[0].selectedAnswer
    console.log(this.selectedOptions);
    this.mergeArray();
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

  mergeArray(){
    const mergedArray = this.questions.map(question => {
      const correspondingDetail = this.examDetails.find(detail => detail.questionId === question._id);
      // Add properties from examDetails to questions
      return {
        ...question,
        flag: correspondingDetail ? correspondingDetail.flag : null,
        isCorrectAnswer: correspondingDetail ? correspondingDetail.isCorrectAnswer : null,
        selectedAnswer: correspondingDetail ? correspondingDetail.selectedAnswer : null,
        // Add more properties as needed
      };
    });
    console.log(mergedArray);
    this.questions=mergedArray
  }
}

