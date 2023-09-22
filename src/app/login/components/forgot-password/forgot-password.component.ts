import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { environment } from 'src/environments/environment';
import { Forgotpassword } from '../../model/forgotpassword.class';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  ForgotPasswordForm: FormGroup;
  firstName:string;
  email:string;
  userid:string;
  secretKey = environment.secretKey;
  public forgotPasswordModel: Forgotpassword={
    email: '',
    password: '',
    _id: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService:LoginService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    public dialog: MatDialog
  ){}

  ngOnInit() {
    const name=localStorage.getItem('2');
    const mail=localStorage.getItem('3');
    const id=localStorage.getItem('4');
    this.initForm();
    this.firstName=this.loginService.decryptText(name,this.secretKey)
    this.email=this.loginService.decryptText(mail,this.secretKey)
    this.userid=this.loginService.decryptText(id,this.secretKey)
  }

  initForm(){
    this.ForgotPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      conformpassword: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: this.passwordMatchValidator,
    }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(){
    this.ForgotPasswordForm.controls['email'].setValue(this.email);
    this.forgotPasswordModel._id=this.userid
    this.forgotPasswordModel.email=this.email
    this.forgotPasswordModel.password=this.ForgotPasswordForm.value.password
    if (this.ForgotPasswordForm.valid) {
      this.loginService.updatePassword(this.forgotPasswordModel).subscribe((response)=>{
        console.log(response);
        this.router.navigate(['']);
        this.closeDialog()
      },
      (error) => {
        console.error('Error updating resource:', error);
      }
      );
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
