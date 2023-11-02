import { ExamDataService } from './../../service/exam-data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/faculty/model/question';
import { QuerstionService } from 'src/app/faculty/service/querstion.service';
import Scrollbar from 'smooth-scrollbar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import Swal from 'sweetalert2';

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
  public currentQuestionIndex: number = 0;
  public maximumQuestionLength: number = 0;
  public correctNews: boolean;
  public incorrectNews: boolean;

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
      console.log(this.questions.length);
      this.maximumQuestionLength = this.questions.length - 1;
      this.getQuestionsIndexBased(this.currentQuestionIndex);
    });
  }

  getQuestionsIndexBased(index: number) {
    this.indexBasedQuestions = this.questions[index];
    console.log(this.indexBasedQuestions);
    this.showExplanations = false;
    this.incorrectNews = false;
    this.correctNews = false;
  }

  changeQuestions(i: number) {
    this.currentQuestionIndex = i;
    console.log(this.currentQuestionIndex);
    this.getQuestionsIndexBased(i);
  }

  optionSelected(event: any) {
    console.log('Selected option: ', event.value);

    console.log(this.indexBasedQuestions.options);
    const correctOptions = this.indexBasedQuestions.options.filter(
      (item: any) => item.explanation != null
    );
    console.log(correctOptions[0].text);
    if (correctOptions[0].text === event.value) {
      console.log('Selected answer is correct ');
      this.showExplanations = true;
      this.correctNews = true;
      this.incorrectNews = false;
    } else {
      console.log('Selected answer is incorrect XXX');
      Swal.fire({
        title: 'You selected the wrong answer',
        width: '500px',
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          this.showExplanations = true;
          this.incorrectNews = true;
          this.correctNews = false;
        }
      });
    }
  }

  generateAlphabetChar(index: number): string {
    return String.fromCharCode(65 + index);
  }

  previous() {
    this.currentQuestionIndex = this.currentQuestionIndex - 1;
    this.getQuestionsIndexBased(this.currentQuestionIndex);
  }

  next() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.getQuestionsIndexBased(this.currentQuestionIndex);
  }
}
