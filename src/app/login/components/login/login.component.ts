import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

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
  encryptRole!: string;
  encryptFirstName!: string;
  encryptLastName!: string;
  encryptID!: string;

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
          if (
            response.user.role.role === 'ADMIN' ||
            response.user.role.role === 'FACULTY'
          ) {
            this.router.navigateByUrl('/faculty/qgen');
            this.closeDialog();
            this.encryptRole = this.encryptText(
              response.user.role.role,
              this.secretKey
            );
            this.encryptFirstName = this.encryptText(
              response.user.firstName,
              this.secretKey
            );
            this.encryptLastName = this.encryptText(
              response.user.lastName,
              this.secretKey
            );
            this.encryptID = this.encryptText(
              response.user._id,
              this.secretKey
            );
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', this.encryptRole);
            localStorage.setItem('firstname', this.encryptFirstName);
            localStorage.setItem('lastname', this.encryptLastName);
            localStorage.setItem('id', this.encryptID);
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
