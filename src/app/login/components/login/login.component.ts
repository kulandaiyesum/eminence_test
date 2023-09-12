import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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
      userName: ['', [Validators.required, Validators.email]], // Using built-in email validator
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
      console.log(this.loginForm.value);
    }
  }
}
