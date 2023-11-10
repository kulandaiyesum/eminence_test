import { Subject, Subscription } from 'rxjs';
import { Question, TempQuestion } from '../../model/question';
import { QgenService } from './../../service/qgen.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { QuerstionService } from '../../service/querstion.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  public questLength: number;
  public title;
  public optionsAttributes = [];

  questions: Question[];
  tempQuestion: TempQuestion;
  reqId: string;
  public status;
  reasons: string[] = [
    "Simply didn't need it",
    'Inaccuracy in question/answer choices',
    'Inaccuracy in explanation',
    'Question was too easy',
  ];
  showDiv = false;
  public user;
  selectedAnswer: string = '';
  isEditMode: boolean = false;
  selectedOptionExplanation: string = '';
  editIconVisibility: boolean = true;
  questionId: string;
  questionNo: number;
  currentQuestionStatus: any;
  isAllQuestions: boolean = false;
  shouldShowButton: boolean = false;
  nextButtonQuestionId: string;
  nextButtonQuestionIndex: number;
  private pathSubcriber: Subscription;
  pathMatch: boolean = false;
  secretKey: string = environment.secretKey;
  @ViewChild('editableDiv') editableDiv: ElementRef;
  constructor(
    private qgenService: QgenService,
    private rsaService: RsaService,
    private questionService: QuerstionService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.pathSubcriber.unsubscribe();
  }
  ngOnInit(): void {
    this.user = this.rsaService.decryptText(
      localStorage.getItem('2'),
      this.secretKey
    );
    console.log(this.user);
    if (this.user === 'VETTER') {
      this.status = 'VREVIEWED';
    } else {
      this.status = 'FREVIEWED';
    }

    this.reqId = this.activatedRoute.snapshot.params['reqId'];
    if (this.reqId) {
      this.getAllQuestions(this.reqId);
    }

    this.pathSubcriber = this.router.events.subscribe((event: any) => {
      if (event?.routerEvent?.url.match(/\/eminence\/vetter\/questions\//)) {
        this.pathMatch = true;
      } else {
        this.pathMatch = false;
      }
    });
  }

  // Helper method to convert to string safely
  getStatusAsString(question: Question): string {
    return String(question.status);
  }

  // Add a method to check if the question is reviewed
  isReviewed(question: Question): boolean {
    if (this.user === 'VETTER') {
      return this.getStatusAsString(question) === 'VREVIEWED';
    } else {
      return this.getStatusAsString(question) === 'FREVIEWED';
    }
  }

  getAllQuestions(reqId: string) {
    let data = { reqId };
    console.log(reqId);
    this.questionService.getAllQuestions(data).subscribe((doc: any) => {
      this.questLength = doc.result.questions.length;
      this.questions = doc.result.questions;
      console.log(this.questions);
      this.title = doc.result.request.keywords[0];
      this.getQuestion(this.questions[0]._id, 0);
      const pendingCount = this.questions.filter(
        (item: any) => item.status === 'Pending'
      ).length;
      console.log(pendingCount, 'ffffffff');

      if (pendingCount === 1) {
        this.shouldShowButton = true;
        const pendingData = this.questions.filter(
          (item: any) => item.status === 'Pending'
        );
        console.log(pendingData);
        console.log(pendingData[0]._id);
        this.questionId = pendingData[0]._id;
      }
    });
  }

  showReviewAlert(question_id: string, index: number, question: any) {
    this.nextButtonQuestionId = question_id;
    this.nextButtonQuestionIndex = index;
    this.questionNo = this.tempQuestion.index + 1;
    console.log(this.questionNo);
    this.questionId = this.tempQuestion.question._id;
    this.currentQuestionStatus = this.tempQuestion.question.status;
    console.log(this.tempQuestion.question);
    console.log(' nav butt id ' + question_id);
    console.log(this.questionId);

    if (
      this.currentQuestionStatus === 'FREVIEWED' ||
      this.currentQuestionStatus === 'RREVIEWED' ||
      this.questionId == question_id
    ) {
      this.getQuestion(question_id, index);
    } else {
      Swal.fire({
        title: 'Are you sure?',
        html: 'Reviewed question no: ' + this.questionNo,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, reviewed',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.changeStatusOfQuestion();
          this.getQuestion(question_id, index);
        } else {
          // Handle the "No" case (close the popup or perform any other action)
        }
      });
    }
  }

  getQuestion(question_id: string, index: number) {
    const findQuestion = this.questions.find((q) => q._id === question_id);
    this.editIconVisibility = !findQuestion.isEdited;
    this.tempQuestion = {
      index: index,
      question: findQuestion,
    };
    this.editableDiv.nativeElement.textContent =
      this.tempQuestion.question.title;
    this.reviewAll();
  }

  changeStatusOfQuestion() {
    let data = { questionId: this.questionId, status: this.status };
    console.log(this.questionId);
    this.questionService.updateStatusOfQuestion(data).subscribe(
      (response) => {
        console.log(response);
        this.cdr.detectChanges();
        this.getAllQuestions(this.reqId);
        setTimeout(() => {
          console.log('Navigate acha ?');
          this.getQuestion(
            this.nextButtonQuestionId,
            this.nextButtonQuestionIndex
          );
        }, 500);
        const pendingCount = this.questions.filter(
          (item: any) => item.status === 'PENDING'
        ).length;
        if (pendingCount === 1) {
          this.shouldShowButton = true;
          const pendingData = this.questions.filter(
            (item: any) => item.status === 'PENDING'
          );
          console.log(pendingData[0]._id);
          this.questionId = pendingData[0]._id;
        }
      },
      (error) => {
        console.error('Error updating resource:', error);
      }
    );
  }

  completeReview() {
    console.log(this.questionId);
    Swal.fire({
      title: 'Are you sure?',
      html: 'Do you want complete your review',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, reviewed',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeStatusOfQuestion();
        this.reviewAll();
      } else {
        // Handle the "No" case (close the popup or perform any other action)
      }
    });
  }

  saveChange() {
    this.isEditMode = false;
    this.editIconVisibility = true;
    this.cdr.detectChanges();

    this.tempQuestion.question.options.forEach((option) => {
      if (option._id === this.selectedAnswer) {
        option.correctAnswer = 'true';
        option.explanation = this.selectedOptionExplanation;
      } else {
        option.correctAnswer = 'false';
        option.explanation = '';
      }
    });
    this.tempQuestion.question.options.forEach((res) => {
      this.optionsAttributes.push({
        id: res.coreOptionId,
        text: res.text,
        explanation: res.explanation,
        correct_answer: res.correctAnswer,
      });
    });
    this.tempQuestion.question.title =
      this.editableDiv.nativeElement.textContent;
    let data = {
      selectAnswer: this.selectedAnswer,
      option: this.selectedOptionExplanation,
      temp: this.tempQuestion,
      Option: this.optionsAttributes,
    };
    this.questionService
      .UpdateOption(this.reqId, data)
      .subscribe((doc: any) => {
        this.toastr.success(doc.message, '', {
          timeOut: 3000,
        });
        this.getAllQuestions(this.reqId);
        this.reviewAll();
      });
  }
  toggleDivSection() {
    this.showDiv = !this.showDiv;
  }

  editQuestion(question: Question) {
    this.isEditMode = true;
    this.editIconVisibility = false;
    const selectedOption = this.tempQuestion.question.options.find(
      (option) => option.correctAnswer === 'true'
    );
    console.log(selectedOption);
    if (selectedOption) {
      this.selectedAnswer = selectedOption._id;
      console.log(this.selectedAnswer);
      this.selectedOptionExplanation = selectedOption.explanation;
    }
  }

  cancelEdit() {
    this.editIconVisibility = true;
    this.isEditMode = false;
  }

  selectAnswer(answerId: string) {
    this.selectedAnswer = answerId;
  }

  updateExplanation(optionid: string) {
    const correctAnswer = this.tempQuestion.question?.options.find(
      (option) => option._id === optionid
    );
    if (correctAnswer) {
      this.selectedAnswer = correctAnswer._id;
      this.selectedOptionExplanation = correctAnswer.explanation;
    }
  }
  deleteQuestion(reason: string) {
    console.log(this.tempQuestion.question.coreQuestionId);

    const payload = {
      _id: this.tempQuestion.question.coreQuestionId,
      reqId: this.tempQuestion.question.reqId,
      reason,
    };
    this.showDiv = false;
    Swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to Delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.daleteQuestion(payload).subscribe(
          (response: any) => {
            console.log(response);
            this.toastr.success(response.message, '', {
              timeOut: 3000,
            });
            this.getAllQuestions(this.reqId);
            this.reviewAll();
          },
          (err) => {
            console.log(err);
            this.toastr.error(err.error.message, '', {
              timeOut: 3000,
            });
          }
        );
      }
    });
  }

  reviewAll() {
    const allReviewed = this.questions.every((item: any) => {
      if (this.user === 'VETTER') {
        item.status === 'RREVIEWED';
      } else {
        item.status === 'FREVIEWED';
      }
    });

    console.log(allReviewed);
    const hasPendingStatus = this.questions.some((item:any) => item.status === "Pending");
    console.log(hasPendingStatus);
    if (!hasPendingStatus) {
      this.isAllQuestions = true;
    }

    if (this.isAllQuestions) {
      Swal.fire({
        title: 'You reviewed all questions',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the review service to make the HTTP PUT request
          let data = { reqId: this.reqId, status: this.status };
          this.qgenService.reviewQuestionSet(data).subscribe(
            (response) => {
              console.log(response);
              if (this.user === 'VETTER') {
                this.router.navigate(['/eminence/vetter/history']);
              }else {
                this.router.navigate(['/eminence/faculty/history']);
              }
            },
            (error) => {
              // Handle the error response
              console.error('HTTP PUT request failed', error);
            }
          );
        } else {
          this.isAllQuestions = false;
        }
      });
    }
  }
}
