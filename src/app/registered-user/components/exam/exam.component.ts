import { ExamDataService } from './../../service/exam-data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/faculty/model/question';
import { QuerstionService } from 'src/app/faculty/service/querstion.service';
import Scrollbar from 'smooth-scrollbar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  tutorId: string;
  public questLength: number;
  questions: Question[];
  @ViewChild('scrollExplanationContainer')
  scrollExplanationContainer: ElementRef;
  @ViewChild('scrollQuestionContainer') scrollQuestionContainer: ElementRef;
  public indexBasedQuestions;
  public showExplanations: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuerstionService,
    private examDataService: ExamDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'custom-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/lab.svg')
    );
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tutorId = params['id']; // Retrieve the tutor ID from the route parameters
      // Use this.tutorId as needed in your TutorComponent
      console.log(this.tutorId);
    });
    if (this.tutorId) {
      this.getAllQuestions(this.tutorId);
    } else {
      this.questions = JSON.parse(localStorage.getItem('emex-td'));
      // this.questions = this.examDataService.getExamRoomData();
      this.questLength = this.questions.length;
      this.getQuestionsIndexBased(0);
    }
  }

  ngAfterViewInit() {
    const scrollbars = Scrollbar.init(
      this.scrollExplanationContainer.nativeElement,
      {
        // Smooth Scrollbar options go here
      }
    );
    const scrollbar = Scrollbar.init(
      this.scrollQuestionContainer.nativeElement,
      {
        // Smooth Scrollbar options go here
      }
    );
  }

  getAllQuestions(reqId?: string) {
    let data = { reqId };
    this.questionService.getAllQuestions(data).subscribe((doc: any) => {
      this.questLength = doc.result.questions.length;
      this.questions = doc.result.questions;
      console.log(this.questions);
      this.getQuestionsIndexBased(0);
    });
  }

  getQuestionsIndexBased(index: number) {
    this.indexBasedQuestions = this.questions[index];
    console.log(this.indexBasedQuestions);
    this.showExplanations = false;
  }

  changeQuestions(i: number) {
    console.log(i);
    this.getQuestionsIndexBased(i);
  }

  optionSelected(event: any) {
    console.log('Selected option: ', event.value);
    this.showExplanations = true;
  }
}
