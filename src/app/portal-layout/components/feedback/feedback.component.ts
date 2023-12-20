import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/service/login.service';
import { UserService } from 'src/app/master/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  comment: string;
  @ViewChild('commentForm') commentForm: NgForm;
  userMail: string;
  userRole: string;
  secretKey = environment.secretKey;

  constructor(
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const mail = localStorage.getItem('10');
    const role = localStorage.getItem('2');
    this.userMail = this.loginService.decryptText(mail, this.secretKey);
    this.userRole = this.loginService.decryptText(role, this.secretKey);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    const data = {
      email: this.userMail,
      role: this.userRole,
      comment: this.comment,
    };
    this.userService.userComment(data).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success('Thanks for your feedback', '', {
          timeOut: 3000,
        });
      },
      (error) => {
        console.error('Oops something went', error);
        this.toastr.error(error.error.message, 'Something went wrong', {
          timeOut: 3000,
        });
      }
    );
  }
}
