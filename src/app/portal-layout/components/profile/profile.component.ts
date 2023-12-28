import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profile } from '../../model/profile.class';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/login/service/login.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/master/service/user.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/master/model/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChild('profileForm') profileForm: NgForm;

  public profileObject: User = {
    firstName: '',
    lastName: '',
    email: '',
    _id: '',
    password: '',
    role: undefined,
  };
  public endDate: string;
  public packageName: string;
  public topic: string;
  public role: string;

  secretKey = environment.secretKey;
  isInputDisabled = true;
  isEmailDisabled = true;

  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginService: LoginService,
    private userService: UserService,
    private toastr: ToastrService,
    private datapipe: DatePipe
  ) {}

  ngOnInit(): void {
    const mail = localStorage.getItem('10');
    const fname = localStorage.getItem('3');
    const lname = localStorage.getItem('4');
    const id = localStorage.getItem('5');
    const enddate = localStorage.getItem('12');
    const packagename = localStorage.getItem('13');
    const topics = localStorage.getItem('14');
    const roles = localStorage.getItem('2');
    this.role = this.loginService.decryptText(roles, this.secretKey);
    this.profileObject.email = this.loginService.decryptText(
      mail,
      this.secretKey
    );
    this.profileObject.firstName = this.loginService.decryptText(
      fname,
      this.secretKey
    );
    this.profileObject.lastName = this.loginService.decryptText(
      lname,
      this.secretKey
    );
    this.profileObject._id = this.loginService.decryptText(id, this.secretKey);
    if (this.role === 'STUDENT') {
      const enddate = localStorage.getItem('12');
      const packagename = localStorage.getItem('13');
      const topics = localStorage.getItem('14');
      this.endDate = this.loginService.decryptText(enddate, this.secretKey);
      this.endDate = this.datapipe.transform(this.endDate, 'MM-dd-yyyy');
      this.packageName = this.loginService.decryptText(
        packagename,
        this.secretKey
      );
      this.topic = this.loginService.decryptText(topics, this.secretKey);
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    // console.log(this.profileObject);
    this.userService.updateUserMaster(this.profileObject).subscribe(
      (response: any) => {
        // console.log(response);
        this.toastr.success('Details updated successfully', '', {
          timeOut: 3000,
        });
        // console.log(response.result.firstName);
        // console.log(response.result.lastName);
        // console.log(response.result.email);
        // console.log(response.result._id);

        this.enableEdit();
        const fName = this.encryptText(
          response.result.firstName,
          this.secretKey
        );
        const lName = this.encryptText(
          response.result.lastName,
          this.secretKey
        );
        const ids = this.encryptText(response.result._id, this.secretKey);
        const emails = this.encryptText(response.result.email, this.secretKey);
        this.profileObject._id = response.result._id;
        this.profileObject.email = response.result.email;
        this.profileObject.firstName = response.result.firstName;
        this.profileObject.lastName = response.result.lastName;
        localStorage.setItem('3', fName);
        localStorage.setItem('4', lName);
        localStorage.setItem('5', ids);
        localStorage.setItem('10', emails);
      },
      (error) => {
        console.error('Oops something went', error);
        this.toastr.error(error.error.message, 'Something went wrong', {
          timeOut: 3000,
        });
      }
    );
  }

  enableEdit() {
    this.isInputDisabled = !this.isInputDisabled;
  }

  encryptText(text: string, secretKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey);
    return encrypted.toString();
  }
}
