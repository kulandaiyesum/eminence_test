import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent {
  emailForgotPasswordForm: FormGroup;
  otpForgotPasswordForm: FormGroup;
  isSendingOTP = false;
  isOTP = true;
  public email;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.initFormForEmail();
    this.initFormForOtp();
  }

  initFormForEmail() {
    this.emailForgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  initFormForOtp() {
    this.otpForgotPasswordForm = this.formBuilder.group({
      otp: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^\d+$/),
        ],
      ],
    });
  }

  sendOTP() {
    if (this.emailForgotPasswordForm.valid) {
      this.isSendingOTP = true;
      let data = { email: this.email };
      this.loginService.resetPassword(data).subscribe((data: any) => {
        console.log(data);
      });
    }
  }

  verifyOTP() {
    if (this.otpForgotPasswordForm.valid) {
      console.log(this.otpForgotPasswordForm.value);
      this.router.navigate(['/forgotpassword/forgotpassword']);
    }
  }
}
