import { RsaService } from './../../../shared/service/rsa.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Qgen } from '../../model/qgen';
import { environment } from 'src/environments/environment';
import { QgenService } from '../../service/qgen.service';
import { SubscriptionService } from 'src/app/master/service/subscription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-qgen',
  templateUrl: './qgen.component.html',
  styleUrls: ['./qgen.component.scss'],
})
export class QgenComponent implements OnInit {
  qGenObject: Qgen;
  public user;
  gGenForm: FormGroup;
  userId: string = '';
  topicId: string = '';
  insititutionId: string = '';
  userFirstName: string = '';
  qgenObjectList: Qgen[];
  responsiveOptions: any[];
  secretKey: string = environment.secretKey;
  @ViewChild('qgenResponse') qgenResponse: ElementRef;
  public checkValidity;
  constructor(
    private rsaService: RsaService,
    private gGenService: QgenService,
    private toastr: ToastrService,
    private subscriptionService: SubscriptionService
  ) {
    this.checkValidity = {
      insititutionId: '', // Corrected property name
      userID: '', // Corrected property name
    };
  }
  ngOnInit(): void {
    this.qGenObject = new Qgen();
    // this.gGenForm = new FormGroup({
    //   keywords: new FormControl('', [Validators.required]),
    //   questionsCount: new FormControl(
    //     {
    //       value: '',
    //       disabled: this.inputValidity // Set the 'disabled' property during creation
    //     },
    //     [
    //     Validators.required,
    //     Validators.max(5),
    //     Validators.min(1),
    //   ]),
    // });
    this.user = this.rsaService.decryptText(
      localStorage.getItem('2'),
      this.secretKey
    );

    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.checkValidity.userID = this.userId;
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );

    if (this.user === 'FACULTY') {
      this.topicId = this.rsaService.decryptText(
        localStorage.getItem('6'),
        this.secretKey
      );
      this.insititutionId = this.rsaService.decryptText(
        localStorage.getItem('7'),
        this.secretKey
      );
      this.checkValidity.insititutionId = this.insititutionId;
    } else {
      this.topicId = 'USMLE';
    }
    this.responsiveOptions = [
      {
        breakpoint: '1660px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1370px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    if (this.user === 'FACULTY') {
      this.subscriptionService
        .checkValidityOfInsititution(this.checkValidity)
        .subscribe(
          (response: any) => {
            this.getPendingQuestions();
          },
          (err) => {
            this.toastr.warning(err.error.message, '', {
              timeOut: 3000,
            });
          }
        );
    } else {
      this.getPendingQuestions();
    }
  }

  ngAfterContentChecked() {
    // this.initForm();
  }

  initForm() {
    // this.gGenForm = new FormGroup({
    //   keywords: new FormControl(
    //     {
    //       value: '',
    //       disabled: this.inputValidity, // Set the 'disabled' property during creation
    //     },
    //     [Validators.required]
    //   ),
    //   questionsCount: new FormControl(
    //     {
    //       value: '',
    //       disabled: this.inputValidity, // Set the 'disabled' property during creation
    //     },
    //     [Validators.required, Validators.max(5), Validators.min(1)]
    //   ),
    // });
  }

  getPendingQuestions() {
    this.gGenService.getQGen(this.userId).subscribe(
      (res: any) => {
        const tempHolder = res.result;
        if (this.user === 'ADMIN') {
          this.qgenObjectList = tempHolder.filter(
            (pendingItem) => pendingItem.status === 'Pending'
          );
        } else {
          this.qgenObjectList = res.result;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitQgen() {
    // this.qGenObject.questionsCount = this.gGenForm.value.questionsCount;
    this.qGenObject.topic = this.topicId;
    this.qGenObject.userId = this.userId;
    this.qGenObject.type = 'Qgen';
    this.qGenObject.createdBy = this.userFirstName;
    this.qGenObject.keywords = this.stringToArray(this.gGenForm.value.keywords);
    this.gGenService.submitQgen(this.qGenObject).subscribe(
      (response: any) => {
        const statusCode = response.statusCode;
        if (statusCode === 200) {
          this.getPendingQuestions();
          setTimeout(() => {
            this.getPendingQuestions();
          }, 120000);
        }
      },
      (error: any) => {}
    );
    this.gGenForm.reset();
  }

  private stringToArray(inputKeyword: string) {
    return inputKeyword.split(',').map((item) => item.trim());
  }

  routeEditor(reqId: string) {
    console.log(reqId);
  }

  /**
   * function to prevent enterinf period and letters for input field
   * @param event
   */
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '').replace(/^0+/, '');
    if (sanitizedValue !== '') {
      inputElement.value = sanitizedValue;
    }
  }

  /**
   * function to scroll the Qgen response element
   * @param direction
   */
  scroll(direction: number) {
    const scrollAmount = direction * 320;
    this.qgenResponse.nativeElement.scrollBy({
      top: 0,
      left: scrollAmount,
      behavior: 'smooth',
    });
  }
}
