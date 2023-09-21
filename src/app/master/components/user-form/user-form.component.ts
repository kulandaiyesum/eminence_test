import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { InstituteserviceService } from '../../service/instituteservice.service';
import { RoleService } from '../../service/role.service';
import { TopicService } from '../../service/topic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { passwordMatchValidator } from 'src/app/shared/validators/custom-validator';
import { HttpErrorResponse } from '@angular/common/http';

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

  roles: any;
  topics: any;
  intitutions: any;
  passwordVisible: boolean = true;
  constructor(
    private userService: UserService,
    private institutionService: InstituteserviceService,
    private roleService: RoleService,
    private topicService: TopicService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('', Validators.required),
        institutionId: new FormControl('', Validators.required),
        topicId: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9@$!%*#?&]{8,16}'),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: passwordMatchValidator }
    );
  }
  ngOnInit(): void {
    this.userObject = new User();
    this.getInstitution();
    this.getRole();
    this.getTopic();
    if (this.data !== null) {
      this.userObject._id = this.data._id;
      this.userObject.createdBy = this.data.createdBy;
      this.userObject.createdOn = this.data.createdOn;
      this.userObject.email = this.data.email;
      this.userObject.firstName = this.data.firstName;
      this.userObject.lastName = this.data.lastName;
      this.userObject.password = this.data.password;
      this.userObject.role = this.data.role._id;
      this.userObject.topicId = this.data.topicId._id;
      this.userObject.institutionId = this.data.institutionId._id;
    }
    if (this.data !== null) {
      this.passwordVisible = false;
      this.userForm.get('password').disable();
      this.userForm.get('confirmPassword').disable();
    }
    this.userForm.get('role').valueChanges.subscribe((selectedRole) => {
      if (selectedRole === '65014b97f85f27c0258567af') {
        this.userForm.get('institutionId').enable();
      } else {
        this.userForm.get('institutionId').disable();
        this.userObject.institutionId = undefined;
      }
    });
  }
  saveUserMaster() {
    console.log(this.userObject, 'save');
    this.userService.saveUserMaster(this.userObject).subscribe(
      (res: any) => {
        console.log(res);
        this.userForm.reset();
        this.dialogRef.close(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  updateUserMaster() {
    console.log(this.userObject, 'update');

    this.userService.updateUserMaster(this.userObject).subscribe(
      (res: any) => {
        console.log(res);
        this.userForm.reset();
        this.dialogRef.close(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  getRole() {
    this.roleService.getRole().subscribe((res: any) => {
      this.roles = res.result;
      if (this.data !== null) {
        this.roles.forEach((element) => {});
      }
    });
  }
  getTopic() {
    this.topicService.getAllTopicMaster().subscribe((res: any) => {
      this.topics = res.result;
    });
  }
  getInstitution() {
    this.institutionService.getAllInstitute().subscribe((res: any) => {
      this.intitutions = res.result;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
