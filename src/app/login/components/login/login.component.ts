import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  receivedData = '';
  loginForm!: FormGroup;
  hidePassword: boolean = true;

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
      email: ['', [Validators.required, Validators.email]], // Using built-in email validator
      password: ['', [Validators.required, Validators.minLength(8)]], // Custom validator for minimum length of 8 characters
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
          console.log("Response from back end "+response);
        },
        (error) => {
          console.log('Error : ', error);
        }
      );
    }
  }
}
