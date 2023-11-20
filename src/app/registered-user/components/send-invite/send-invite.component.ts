import { Component } from '@angular/core';
import { ExamService } from '../../service/exam.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Sendcode } from '../../model/sendcode.class';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.scss'],
})

export class SendInviteComponent {
  public uniqueCode;
  public sendCode: Sendcode = {
    otp: '',
    email: ''
  };

  public inviteObject: {
    email: any;
    otp: string;
  }={
    otp: '',
    email: undefined
  }
  constructor(
    private examService: ExamService,
    public dialogRef: MatDialogRef<SendInviteComponent>
  ) {}

  ngOnInit(): void {
    this.getRandomCodeForEmail();
    console.log(this.sendCode);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  closeDialogStartnoew(): void {
    this.dialogRef.close();
    localStorage.setItem('8', this.sendCode.otp);
  }

  getRandomCodeForEmail() {
    this.examService.getRandomCode().subscribe(
      (response: any) => {
        console.log(response);
        this.uniqueCode = response.result;
        this.sendCode.otp = response.result;
      },
      (error) => {
        console.error('Error fetching random code:', error);
      }
    );
  }

  isValidEmail(): boolean {
    return !!this.sendCode.email; // You can add more validation as needed
  }

  sendInvite(form: NgForm): void {
    if (form.valid) {
      // Your logic to send the invite using this.sendCode.email
      console.log(this.sendCode.email);
      let emailArrayNew = this.sendCode.email.split(',');
      // console.log(emailArrayNew);

      const emailArray = this.sendCode.email
      .split(',')
      .map((email) => ({ email: email.trim() }));
      // console.log(emailArray);
      this.inviteObject.email=emailArrayNew
      this.inviteObject.otp=this.sendCode.otp

      console.log('Sending invite to:', this.inviteObject);
      this.examService.sendExamCode(this.inviteObject).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.error('Error sending code :', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
