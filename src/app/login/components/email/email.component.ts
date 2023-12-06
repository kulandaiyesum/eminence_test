import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

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
  secretKey = environment.secretKey;
  public otp: string;
  public firstName: string;
  public userEmail: string;
  public userId: string;
  public originalOTP: string;
  public originalFirstName: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EmailComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initFormForEmail();
    this.initFormForOtp();
    localStorage.clear();
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
          Validators.minLength(6),
          Validators.pattern(/^\d+$/),
        ],
      ],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendOTP() {
    if (this.emailForgotPasswordForm.valid) {
      let data = { email: this.email };
      this.loginService.resetPassword(data).subscribe(
        (data: any) => {
          this.isSendingOTP = true;
          this.encryptionOTP(
            data.result.otp,
            data.result.user.firstName,
            data.result.user.email,
            data.result.user._id
          );
          this.toastr.success(data.message, '', {
            timeOut: 3000,
          });
        },
        (error) => {
          this.toastr.error('Provide registered email', '', {
            timeOut: 3000,
          });

        }
      );
    }
  }

  verifyOTP() {
    if (this.otpForgotPasswordForm.valid) {
      this.decrpytionOTP();
      if (this.otpForgotPasswordForm.value.otp == this.originalOTP) {
        this.toastr.success('otp verified successfully', '', {
          timeOut: 3000,
        });
        this.openForgotPasswordDialog();
      } else {
        this.isSendingOTP = !this.isSendingOTP;
        this.toastr.error('OTP is not correct', '', {
          timeOut: 1000,
        });
        this.closeDialog();
      }
    }
  }

  encryptionOTP(otp: string, firstName: string, email: string, id: string) {
    this.otp = this.loginService.encryptText(otp, this.secretKey);
    this.firstName = this.loginService.encryptText(firstName, this.secretKey);
    this.userEmail = this.loginService.encryptText(email, this.secretKey);
    this.userId = this.loginService.encryptText(id, this.secretKey);
    localStorage.setItem('1', this.otp);
    localStorage.setItem('2', this.firstName);
    localStorage.setItem('3', this.userEmail);
    localStorage.setItem('4', this.userId);
  }

  decrpytionOTP() {
    const encryptOTP = localStorage.getItem('1');
    this.originalOTP = this.loginService.decryptText(
      encryptOTP,
      this.secretKey
    );
  }

  openForgotPasswordDialog() {
    this.closeDialog();
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '400px',
      height: 'auto',
      data: null,

      // Other MatDialog options
    });
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: `);
    });
  }
}
