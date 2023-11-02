import { ExamDataService } from './../../service/exam-data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/faculty/model/question';
import { QuerstionService } from 'src/app/faculty/service/querstion.service';
import Scrollbar from 'smooth-scrollbar';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { Exam } from '../../model/exam.class';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';
import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  tutorId: string;
  public questLength: number;
  questions: Question[];
  examInstance: Exam = new Exam();
  @ViewChild('scrollExplanationContainer')
  scrollExplanationContainer: ElementRef;
  @ViewChild('scrollQuestionContainer') scrollQuestionContainer: ElementRef;
  public indexBasedQuestions;
  public showExplanations: boolean = false;
  public currentQuestionIndex: number = 0;
  public maximumQuestionLength: number = 0;
  public correctNews: boolean;
  public incorrectNews: boolean;
  secretKey: string = environment.secretKey;
  userId: string = '';
  userFirstName: string = '';
  examArray: string[] = [];
  toDisplayEnd:number;

  public examObject: {
    studentId: string;
    question: any[]; // You can use a specific type for 'question' if needed
    createdAt: string;
    createdBy: string;
  } = {
    studentId: '',
    question: [], // Initialize 'question' as an empty array or with data
    createdAt: '',
    createdBy: '',
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuerstionService,
    private examDataService: ExamDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private rsaService: RsaService,
    private examService:ExamService
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
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    console.log(this.userId);
    this.examInstance.studentId=this.userId
    this.examObject.studentId=this.userId
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );
    console.log(this.userFirstName);
    this.examInstance.createdBy=this.userFirstName
    this.examObject.createdBy=this.userFirstName
    this.examInstance.Flag="NO"
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


  /******
   *
   *Below method is for options selection event
   *
   * ******/

  optionSelected(event: any) {
    // console.log('Selected option: ', event.value);
    // console.log(this.indexBasedQuestions.options);
    // console.log(this.indexBasedQuestions);
    const correctOptions = this.indexBasedQuestions.options.filter(
      (item: any) => item.explanation != null
    );
    this.examInstance.questionId=this.indexBasedQuestions._id
    const selectOptionsIndex=this.indexBasedQuestions.options.findIndex(item => item.text === event.value);
    const selectedOptions=this.generateAlphabetChar(selectOptionsIndex);
    console.log("Selected options is : " + selectedOptions);
    this.examInstance.selectedAnswer=selectedOptions
    if (correctOptions[0].text === event.value) {
      console.log('Selected answer is correct ');
      this.showExplanations = true;
      this.correctNews = true;
      this.incorrectNews = false;
      this.examInstance.correctAnswer="YES"
    } else {
      console.log('Selected answer is incorrect XXX');
      this.examInstance.correctAnswer="NO"
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
    console.log(this.examInstance);
    this.addObjectToExamArray(this.examInstance)
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

  flagChanges(){
    if (this.examInstance.Flag=="YES") {
      this.examInstance.Flag="NO"
    } else {
      this.examInstance.Flag="YES"
    }
  }

  addObjectToExamArray(data: any) {
    this.examArray = [...this.examArray, data];
    console.log(this.examArray);
  }

  submitExam(){
    this.examObject.question=this.examArray
    this.examService.examSubmit(this.examObject).subscribe((response:any)=>{
      console.log(response);
    },
    (error) => {
      console.error('An error occurred:', error);
    }
    )
  }
}
