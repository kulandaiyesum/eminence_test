import { RsaService } from './../../../shared/service/rsa.service';
import { Component, OnInit } from '@angular/core';
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

  secretKey: string = environment.secretKey;
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
        Validators.max(10),
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
    this.getPendingQuestions();
  }

  getPendingQuestions() {
    this.gGenService.getQGen(this.userId).subscribe(
      (res: any) => {
        this.qgenObjectList = res.result;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitQgen() {
    // this.qGenObject.keywords = this.gGenForm.value.keywords;
    this.qGenObject.questionsCount = this.gGenForm.value.questionsCount;
    this.qGenObject.topic = this.topicId;
    this.qGenObject.userId = this.userId;
    this.qGenObject.createdBy = this.userFirstName;
    this.qGenObject.keywords = this.stringToArray(this.gGenForm.value.keywords);
    this.gGenService.submitQgen(this.qGenObject).subscribe(
      (response: any) => {
        this.getPendingQuestions();
      },
      (error: any) => {
      }
    );
    this.gGenForm.reset();
  }

  private stringToArray(inputKeyword: string) {
    return inputKeyword.split(',').map((item) => item.trim());
  }

  routeEditor(reqId: string) {
    console.log(reqId);
  }
}
