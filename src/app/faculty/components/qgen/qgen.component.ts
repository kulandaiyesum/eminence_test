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
  }

  submitQgen() {
    this.qGenObject.keywords = this.gGenForm.value.keywords;
    this.qGenObject.questionsCount = this.gGenForm.value.questionsCount;
    this.qGenObject.topicId = this.topicId;
    this.qGenObject.userId = this.userId;
    this.qGenObject.createdBy = this.userFirstName;

    this.gGenService.submitQgen(this.qGenObject);
    // .subscribe(
    //   (response: any) => {
    //     console.log(response);
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
    this.gGenForm.reset();
  }
}
