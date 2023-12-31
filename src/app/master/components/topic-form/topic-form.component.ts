import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Topic } from '../../model/topic';
import { TopicService } from '../../service/topic.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {
  public topic: Topic;
  public myForm: FormGroup;
  exampleForm: NgForm;
  public status1;
  public saveButton = true;
  decryptFirstName: string;
  secretKey = environment.secretKey;
  constructor(
    private topicMasterService: TopicService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<TopicFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.topic = new Topic();
    if (this.data === null) {
      this.topic = new Topic();
    } else {
      this.topic._id = this.data._id;
      this.topic.topic = this.data.topic;
      this.topic.status = this.data.status;
      this.topic.createdOn = this.data.createdOn;
    }
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      topic: new FormControl(this.data?.topic || '', [Validators.required]),
    });
    const storedFirstName = localStorage.getItem('3');
    this.decryptFirstName = this.decryptText(storedFirstName, this.secretKey);
  }
  saveCoreBoxMaster() {
    if (this.data === null) {
      this.topic.createdOn = this.decryptFirstName;
      this.topicMasterService.saveTopicMaster(this.topic).subscribe(
        (res: any) => {
          this.toastr.success(res.message, '', {
            timeOut: 3000,
          });
          this.dialogRef.close(res);
        },
        (err) => {
          this.toastr.error(err.error.message, '', {
            timeOut: 3000,
          });
          this.dialogRef.close(err);
        }
      );
    } else {
      this.topicMasterService.updateTopicMaster(this.topic).subscribe(
        (res: any) => {
          this.toastr.success(res.message, '', {
            timeOut: 3000,
          });
          this.dialogRef.close(res);
        },
        (err) => {
          this.toastr.error(err.error.message, '', {
            timeOut: 3000,
          });
          this.dialogRef.close(err);
        }
      );
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  decryptText(encryptedText: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
