import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  ForgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ){}

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.ForgotPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      conformpassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: this.passwordMatchValidator,
    }
    );
  }

  onSubmit(){
    if (this.ForgotPasswordForm.valid) {
      console.log(this.ForgotPasswordForm.value);
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const conformpassword = group.get('conformpassword')?.value;
    if (password !== conformpassword) {
      group.get('conformpassword')?.setErrors({ passwordMismatch: true });
    } else {
      group.get('conformpassword')?.setErrors(null);
    }
  }
}
