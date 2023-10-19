import { RsaService } from './../../../shared/service/rsa.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Qgen } from '../../model/qgen';
import { environment } from 'src/environments/environment';
import { QgenService } from '../../service/qgen.service';

@Component({
  selector: 'app-qgen',
  templateUrl: './qgen.component.html',
  styleUrls: ['./qgen.component.scss'],
})
export class QgenComponent implements OnInit {
  qGenObject: Qgen;
  gGenForm: FormGroup;
  userId: string = '';
  topicId: string = '';
  userFirstName: string = '';
  qgenObjectList: Qgen[];
  responsiveOptions: any[];
  secretKey: string = environment.secretKey;
  @ViewChild('qgenResponse') qgenResponse: ElementRef;
  constructor(
    private rsaService: RsaService,
    private gGenService: QgenService
  ) {}
  ngOnInit(): void {
    this.qGenObject = new Qgen();
    this.gGenForm = new FormGroup({
      keywords: new FormControl('', [Validators.required]),
      questionsCount: new FormControl('', [
        Validators.required,
        Validators.max(5),
        Validators.min(1),
      ]),
    });
    this.topicId = this.rsaService.decryptText(
      localStorage.getItem('6'),
      this.secretKey
    );
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );
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
    this.getPendingQuestions();
  }

  getPendingQuestions() {
    this.gGenService.getQGen(this.userId).subscribe(
      (res: any) => {
        // const tempHolder = res.result;
        console.log(res.result);
        this.qgenObjectList = res.result;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitQgen() {
    this.qGenObject.questionsCount = this.gGenForm.value.questionsCount;
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
