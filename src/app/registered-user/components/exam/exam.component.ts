import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/faculty/model/question';
import { QuerstionService } from 'src/app/faculty/service/querstion.service';
import Scrollbar from 'smooth-scrollbar';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
  tutorId: string;
  public questLength: number;
  questions: Question[];
  @ViewChild('scrollExplanationContainer') scrollExplanationContainer: ElementRef;
  @ViewChild('scrollQuestionContainer') scrollQuestionContainer: ElementRef;
  public indexBasedQuestions;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuerstionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tutorId = params['id']; // Retrieve the tutor ID from the route parameters
      // Use this.tutorId as needed in your TutorComponent
      console.log(this.tutorId);
    });
    this.getAllQuestions(this.tutorId);
  }

  ngAfterViewInit(){
    const scrollbars = Scrollbar.init(this.scrollExplanationContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });
    const scrollbar = Scrollbar.init(this.scrollQuestionContainer.nativeElement, {
      // Smooth Scrollbar options go here
    });

  }

  getAllQuestions(reqId: string) {
    let data = { reqId };
    this.questionService.getAllQuestions(data).subscribe((doc: any) => {
      this.questLength = doc.result.questions.length;
      this.questions = doc.result.questions;
      console.log(this.questions);
      this.getQuestionsIndexBased(0);
    });
  }



  getQuestionsIndexBased(index:number){
    this.indexBasedQuestions=this.questions[index];
    console.log(this.indexBasedQuestions);
  }

  changeQuestions(i:number){
    console.log(i);
    this.getQuestionsIndexBased(i);
  }
}
