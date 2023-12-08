import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Register } from '../../model/register.model';
import { Login } from '../../model/login.model';
import { ToastrService } from 'ngx-toastr';
import { EmailComponent } from '../email/email.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  secretKeyLength = 32;
  secretKey = environment.secretKey;
  public user;
  public errorMessage: string = '';

  public loginUser: Register = {
    firstName: '',
    lastName: '',
    role: '',
    id: '',
    token: '',
    email: '',
    password: '',
    institutionName: '',
    pacakageId: '',
  };
  public loginModel: Login = {
    email: '',
    password: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onLoginSubmit() {
    this.loginForm.controls['email'].setValue(this.loginModel.email);
    this.loginForm.controls['password'].setValue(this.loginModel.password);
    if (this.loginForm.valid) {
      this.loginService.loginAuthenticate(this.loginForm.value).subscribe(
        (response: any) => {
          if (
            response.result.user.role.role === 'ADMIN' ||
            response.result.user.role.role === 'FACULTY' ||
            response.result.user.role.role === 'VETTER' ||
            response.result.user.role.role === 'STUDENT'
          ) {
            if (response.result.user.role.role === 'ADMIN') {
              this.router.navigateByUrl('/eminence/admin');
            }
            if (response.result.user.role.role === 'FACULTY') {
              const topicId = this.encryptText(
                response.result.user?.topicId.topic,
                this.secretKey
              );
              const institutionId = this.encryptText(
                response.result.user?.institutionId._id,
                this.secretKey
              );
              if (topicId) {
                localStorage.setItem('6', topicId);
              }
              if (institutionId) {
                localStorage.setItem('7', institutionId);
              }
              this.router.navigateByUrl('/eminence/faculty');
            }
            if (response.result.user.role.role === 'VETTER') {
              this.router.navigateByUrl('/eminence/vetter');
            }
            if (response.result.user.role.role === 'STUDENT') {
              this.router.navigateByUrl('/eminence/student');
            }
            const role = response.result.user.role.role.toLowerCase();
            // this.router.navigateByUrl(`/eminenceai/${role}`);
            this.closeDialog();
            this.loginUser.role = this.encryptText(
              response.result.user.role.role,
              this.secretKey
            );
            this.loginUser.firstName = this.encryptText(
              response.result.user.firstName,
              this.secretKey
            );
            this.loginUser.lastName = this.encryptText(
              response.result.user.lastName,
              this.secretKey
            );
            this.loginUser.id = this.encryptText(
              response.result.user._id,
              this.secretKey
            );
            this.loginUser.email = this.encryptText(
              response.result.user.email,
              this.secretKey
            );
            localStorage.setItem('1', response.result.token);
            localStorage.setItem('2', this.loginUser.role);
            localStorage.setItem('3', this.loginUser.firstName);
            localStorage.setItem('4', this.loginUser.lastName);
            localStorage.setItem('5', this.loginUser.id);
            localStorage.setItem('10', this.loginUser.email);
          } else {
          }
        },
        (error) => {
          this.toastr.error('You are not a registered member', '', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
          });
          console.log('Error : ', error);
        }
      );
    }
  }
  encryptText(text: string, secretKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey);
    return encrypted.toString();
  }
  decryptText(encryptedText: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  registerPop() {
    this.closeDialog();
    const registerOptions = {
      width: '600px',
      margin: '0 auto',
      height: '600px',
      data: null,
    };
    const dialogRef = this.dialog.open(RegisterComponent, registerOptions);
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: `);
      this.router.navigate(['/home']);
    });
  }
  forgotPassword() {
    this.closeDialog();
    const dialogRef = this.dialog.open(EmailComponent, {
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
