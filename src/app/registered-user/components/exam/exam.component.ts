import { ExamDataService } from './../../service/exam-data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  examArray: any[] = [];
  toDisplayEnd: number;
  flagChecked: boolean = false;

  public examObject: {
    studentId: string;
    questions: any[]; // You can use a specific type for 'question' if needed
    createdAt: string;
    createdBy: string;
    flag: string;
  } = {
    studentId: '',
    questions: [], // Initialize 'question' as an empty array or with data
    createdAt: '',
    createdBy: '',
    flag: '',
  };
  public optionInstance: {
    questionId: string;
    selectedAnswer: string;
    isCorrectAnswer: string;
    flag: string;
  } = {
    flag: '',
    questionId: '',
    selectedAnswer: '',
    isCorrectAnswer: '',
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuerstionService,
    private examDataService: ExamDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private rsaService: RsaService,
    private examService: ExamService,
    private router: Router
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
    this.examInstance.studentId = this.userId;
    this.examObject.studentId = this.userId;
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );
    console.log(this.userFirstName);
    this.examInstance.createdBy = this.userFirstName;
    this.examObject.createdBy = this.userFirstName;
    this.examInstance.flag = 'NO';
    this.optionInstance.flag = 'NO';
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
    this.flagChecked = false;
  }

  changeQuestions(i: number) {
    this.currentQuestionIndex = i;
    console.log(this.currentQuestionIndex == i);
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
    this.examInstance.questionId = this.indexBasedQuestions._id;
    this.optionInstance.questionId = this.indexBasedQuestions._id;
    this.examArray = this.examArray.filter(
      (item: any) => item.questionId !== this.optionInstance.questionId
    );
    const selectOptionsIndex = this.indexBasedQuestions.options.findIndex(
      (item) => item.text === event.value
    );
    const selectedOptions = this.generateAlphabetChar(selectOptionsIndex);
    console.log('Selected options is : ' + selectedOptions);
    this.examInstance.selectedAnswer = selectedOptions;
    this.optionInstance.selectedAnswer = selectedOptions;
    if (correctOptions[0].text === event.value) {
      console.log('Selected answer is correct ');
      this.showExplanations = true;
      this.correctNews = true;
      this.incorrectNews = false;
      this.examInstance.isCorrectAnswer = 'YES';
      this.optionInstance.isCorrectAnswer = 'YES';
    } else {
      console.log('Selected answer is incorrect XXX');
      this.examInstance.isCorrectAnswer = 'NO';
      this.optionInstance.isCorrectAnswer = 'NO';
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

    this.examArray.push({ ...this.optionInstance });
    console.log(this.examArray);
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

  flagChanges() {
    this.optionInstance.questionId = this.indexBasedQuestions._id;
    console.log(this.flagChecked);
    if (this.flagChecked == true) {
      this.examInstance.flag = 'YES';
      this.examObject.flag = 'YES';
      this.optionInstance.flag = 'YES';
      this.optionInstance.isCorrectAnswer = '';
      this.optionInstance.selectedAnswer = '';
    } else {
      this.examInstance.flag = 'NO';
      this.examObject.flag = 'NO';
      this.optionInstance.flag = 'NO';
    }

    // if (this.examInstance.flag == 'YES') {
    //   this.examInstance.flag = 'NO';
    //   this.examObject.flag = 'NO';
    //   this.optionInstance.flag = 'NO';
    // } else {
    //   this.examInstance.flag = 'YES';
    //   this.examObject.flag = 'YES';
    //   this.optionInstance.flag = 'YES';
    // }
    setTimeout(() => {
      this.next();
      this.examArray.push({ ...this.optionInstance });
      console.log(this.examArray);
      this.optionInstance.flag='NO'
    }, 500);
  }

  addObjectToExamArray(data: any) {
    console.log(this.examArray);
    this.examArray.push(data);
    console.log(this.examArray);
  }

  submitExam() {
    this.examObject.questions = this.examArray;
    this.examService.examSubmit(this.examObject).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire('Exam finished', 'Have a look on performance board').then(
          (result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/eminence/student/build-test']);
            }
            this.router.navigate(['/eminence/student/build-test']);
          }
        );
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}
