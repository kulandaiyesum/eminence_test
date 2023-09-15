import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Register } from '../../model/register.model';
import { Login } from '../../model/login.model';
import { ToastrService } from 'ngx-toastr';

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
  public loginUser: Register = {
    firstName: '',
    lastName: '',
    role: '',
    id: '',
    token: '',
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
    private toastr: ToastrService
  ) {

  }
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
            response.result.user.role.role === 'FACULTY'
          ) {
            this.router.navigateByUrl('/faculty/qgen');
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
              response.result._id,
              this.secretKey
            );
            localStorage.setItem('1', response.result.token);
            localStorage.setItem('2', this.loginUser.role);
            localStorage.setItem('3', this.loginUser.firstName);
            localStorage.setItem('4', this.loginUser.lastName);
            localStorage.setItem('5', this.loginUser.id);
            this.toastr.success('Login success', '', {
              timeOut: 3000,
            });
          } else {
          }
        },
        (error) => {
          this.toastr.error('Invalid credentials', '', {
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
}
