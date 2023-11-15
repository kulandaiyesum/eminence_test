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
    email: '',
    otp: '',
  };
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
      console.log('Sending invite to:', this.sendCode);
      this.examService.sendExamCode(this.sendCode).subscribe(
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
