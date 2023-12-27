import { Subscription } from 'rxjs';
import { Question, TempQuestion } from '../../model/question';
import { QgenService } from './../../service/qgen.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { QuerstionService } from '../../service/querstion.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  public questLength: number; // to how many questions generated
  public title = ''; // topic that searched for
  public optionsAttributes = [];
  questions: Question[];
  tempQuestion: TempQuestion;
  reqId: string;
  status: string;
  reasons: string[] = [
    "Simply didn't need it",
    'Inaccuracy in question/answer choices',
    'Inaccuracy in explanation',
    'Question was too easy',
    'Others',
  ];
  showDiv = false;
  userRole = '';
  selectedAnswer: string = '';
  isEditMode: boolean = false;
  selectedOptionExplanation: string = '';
  questionId: string = '';
  questionNo: number = 0;
  currentQuestionStatus: any;
  shouldShowButton: boolean = false;
  private pathSubcriber: Subscription;
  pathMatch: boolean = false;
  secretKey: string = environment.secretKey;
  @ViewChild('editableDiv') editableDiv: ElementRef;
  @ViewChild('whyDeleteDiv') whyDeleteDiv: ElementRef;
  LastQuestionNotReviewed: Question;
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
    this.userRole = this.rsaService.decryptText(
      localStorage.getItem('2'),
      this.secretKey
    );
    this.status = this.userRole === 'VETTER' ? 'VREVIEWED' : 'FREVIEWED';

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

  /**
   * Close why-delete div when clicking outside
   * @param event
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: any): void {
    if (event.target?.innerHTML === 'delete') {
      return;
    }
    if (
      this.showDiv &&
      !this.whyDeleteDiv.nativeElement.contains(event.target)
    ) {
      this.showDiv = false;
    }
  }

  /**
   * This function is used to check where there the function is reviewed or not
   * (check mark icon will show if the question is reviewed)
   * @param question
   * @returns true or false
   */
  isReviewed(question: Question): boolean {
    if (this.userRole === 'VETTER') {
      return question.status === 'VREVIEWED';
    } else {
      return question.status === 'FREVIEWED';
    }
  }

  getAllQuestions(reqId: string) {
    this.questionService.getAllQuestions({ reqId }).subscribe((doc: any) => {
      this.questLength = doc.result.questions.length;
      this.questions = doc.result.questions;
      this.title = doc.result.request.keywords[0];
      this.getQuestion(this.questionId, this.questionNo);
    });
  }

  /**
   * This function helps to change/upodate view question in UI(html)
   * @param question_id
   * @param index
   */
  getQuestion(question_id: string, index: number) {
    let findQuestion: Question;
    if (question_id === '') {
      findQuestion = this.questions[0];
    } else {
      findQuestion = this.questions.find((q) => q._id === question_id);
    }
    this.tempQuestion = {
      index: index,
      question: findQuestion,
    };
    this.editableDiv.nativeElement.textContent =
      this.tempQuestion.question.title;

    let pendingCount = 0;
    this.questions.forEach((q: Question) => {
      if (q.isDeleted) {
        pendingCount++;
      } else if (q.status === this.status) {
        pendingCount++;
      } else {
      }
    });
    if (pendingCount === this.questions.length - 1) {
      this.shouldShowButton = true;
      this.LastQuestionNotReviewed = this.questions.find(
        (q) => q.status === 'RECEIVED'
      );
    }
  }

  showReviewAlert(
    clickedQuestionId: string,
    clickedQuestionIndex: number,
    clickedQuestion: Question
  ) {
    if (clickedQuestionId === this.tempQuestion.question._id) {
      return;
    }
    this.currentQuestionStatus = this.tempQuestion.question.status;
    if (
      this.currentQuestionStatus === 'FREVIEWED' ||
      this.currentQuestionStatus === 'VREVIEWED' ||
      this.tempQuestion.question.isDeleted ||
      clickedQuestion.status === this.status
    ) {
      this.getQuestion(clickedQuestionId, clickedQuestionIndex);
    } else {
      if (clickedQuestion.isDeleted || clickedQuestion.status === this.status) {
        this.getQuestion(clickedQuestionId, clickedQuestionIndex);
      } else {
        Swal.fire({
          title: 'Are you sure?',
          html: 'Reviewed question no: ' + (this.tempQuestion.index + 1),
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, reviewed',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            this.changeStatusOfQuestion(
              clickedQuestionId,
              clickedQuestionIndex
            );
          } else {
          }
        });
      }
    }
  }

  changeStatusOfQuestion(questionId?: string, index?: number) {
    let tempId = '';
    if (questionId === undefined && index === undefined) {
      tempId = this.LastQuestionNotReviewed._id;
    } else {
      tempId = this.tempQuestion.question._id;
    }
    const data = {
      questionId: tempId,
      status: this.status,
    };
    this.questionService.updateStatusOfQuestion(data).subscribe(
      (response) => {
        this.cdr.detectChanges();
        if (questionId === undefined && index === undefined) {
          this.questionId = this.tempQuestion.question._id;
          this.questionNo = this.tempQuestion.index;
        } else {
          this.questionId = questionId;
          this.questionNo = index;
        }

        this.getAllQuestions(this.reqId);
      },
      (error) => {
        console.error('Error updating resource:', error);
      }
    );
  }

  saveChange() {
    Swal.fire({
      title: 'Save Changes',
      text: 'Are you sure you want to Save ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed === true) {
        this.isEditMode = false;
        this.cdr.detectChanges();

        this.tempQuestion.question.options.forEach((option) => {
          if (option._id === this.selectedAnswer) {
            option.correctAnswer = 'true';
            option.explanation = this.selectedOptionExplanation;
          } else {
            option.correctAnswer = 'false';
            option.explanation = null;
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
            this.questionId = this.tempQuestion.question._id;
            this.questionNo = this.tempQuestion.index;
            this.getAllQuestions(this.reqId);
          });
      } else {
        this.toastr.warning('Not Saved', '', {
          timeOut: 3000,
        });
      }
    });
  }
  toggleDivSection() {
    this.showDiv = !this.showDiv;
  }

  editQuestion(question: Question) {
    this.isEditMode = true;
    const selectedOption = this.tempQuestion.question.options.find(
      (option) => option.correctAnswer === 'true'
    );
    if (selectedOption) {
      this.selectedAnswer = selectedOption._id;
      console.log(this.selectedAnswer);
      this.selectedOptionExplanation = selectedOption.explanation;
    }
  }

  cancelEdit() {
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
    const payload = {
      _id: this.tempQuestion.question.coreQuestionId,
      reqId: this.tempQuestion.question.reqId,
      reason,
      status: this.status,
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
            this.toastr.success(response.message, '', {
              timeOut: 3000,
            });
            this.questionId = this.tempQuestion.question._id;
            this.questionNo = this.tempQuestion.index;
            this.getAllQuestions(this.reqId);
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

  completeReview() {
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
      }
    });
  }

  reviewAll() {
    Swal.fire({
      title: 'You reviewed all questions',
      icon: 'success',
    }).then((result) => {
      let data1 = { reqId: this.reqId, status: this.status };
      let data = { questions: this.questions };
      this.qgenService.reviewQuestionSet(data1).subscribe((doc: any) => {
        if (this.userRole === 'VETTER') {
          this.router.navigate(['/eminence/vetter/open-items']);
        } else {
          this.router.navigate(['/eminence/faculty/history']);
        }
        this.questionService.coreUpdate(data).subscribe(
          (response) => {},
          (error) => {
            console.error('HTTP PUT request failed', error);
          }
        );
      });
    });
    // }
  }
}
