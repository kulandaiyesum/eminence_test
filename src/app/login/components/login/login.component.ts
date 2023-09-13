import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Register } from '../../model/register.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  receivedData = '';
  loginForm!: FormGroup;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.receivedData = data;
    console.log(this.receivedData);
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
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      this.loginForm.controls[controlName].markAsTouched();
    });
    if (this.loginForm.valid) {
      this.loginService.loginAuthenticate(this.loginForm.value).subscribe(
        (response: any) => {
          this.loginUser.firstName = response.user.firstName;
          this.loginUser.lastName = response.user.lastName;
          this.loginUser.role = response.user.role.role;
          this.loginUser.id = response.user._id;
          this.loginUser.token = response.token;
          if (
            response.user.role.role === 'ADMIN' ||
            response.user.role.role === 'FACULTY'
          ) {
            this.router.navigateByUrl('/faculty/qgen');
            this.closeDialog();
            this.loginUser.role = this.encryptText(
              response.user.role.role,
              this.secretKey
            );
            this.loginUser.firstName = this.encryptText(
              response.user.firstName,
              this.secretKey
            );
            this.loginUser.lastName = this.encryptText(
              response.user.lastName,
              this.secretKey
            );
            this.loginUser.id = this.encryptText(
              response.user._id,
              this.secretKey
            );
            localStorage.setItem('token', this.loginUser.token);
            localStorage.setItem('role', this.loginUser.role);
            localStorage.setItem('firstname', this.loginUser.firstName);
            localStorage.setItem('lastname', this.loginUser.lastName);
            localStorage.setItem('id', this.loginUser.id);
          } else {
          }
        },
        (error) => {
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
