import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { InstituteserviceService } from '../../service/instituteservice.service';
import { RoleService } from '../../service/role.service';
import { TopicService } from '../../service/topic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userObject: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: undefined,
    institutionId: undefined,
    subscriptionId: undefined,
    topicId: undefined,
  };
  constructor(
    private userService: UserService,
    private institutionService: InstituteserviceService,
    private roleService: RoleService,
    private topicService: TopicService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data, 'check data');
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      institutionId: new FormControl('', Validators.required),
      subscriptionId: new FormControl('', Validators.required),
      topicId: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.userObject = new User();
    if (this.data !== null) {
      this.userObject._id = this.data._id;
      this.userObject.createdBy = this.data.createdBy;
      this.userObject.createdOn = this.data.createdOn;
      this.userObject.email = this.data.email;
      this.userObject.firstName = this.data.firstName;
      this.userObject.lastName = this.data.lastName;
      this.userObject.password = this.data.password;
      this.userObject.role = this.data.role;
      this.userObject.subscriptionId = this.data.subscriptionId;
      this.userObject.topicId = this.data.topicId;
      this.userObject.institutionId = this.data.institutionId;
    }
  }
  saveUserMaster() {}
  updateUserMaster() {

  }f
  onNoClick(): void {
    this.dialogRef.close();
  }
}
