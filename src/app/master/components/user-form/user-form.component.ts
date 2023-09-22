import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import { InstituteserviceService } from '../../service/instituteservice.service';
import { RoleService } from '../../service/role.service';
import { TopicService } from '../../service/topic.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { passwordMatchValidator } from 'src/app/shared/validators/custom-validator';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../../model/role';
import { Topic } from '../../model/topic';
import { Institution } from '../../model/institution.class';

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

  roles: Role[] = [];
  topics: Topic[] = [];
  intitutions: Institution[] = [];
  passwordVisible: boolean = true;
  selectedRole: string = '';
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private institutionService: InstituteserviceService,
    private roleService: RoleService,
    private topicService: TopicService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
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
      this.passwordVisible = false;
      this.userForm.get('password').disable();
      this.userForm.get('confirmPassword').disable();
      this.selectedRole = this.data.role.role;
    }
    this.userForm.get('role').valueChanges.subscribe((selectedRole) => {
      const roleObj = this.roles.find((role) => role._id === selectedRole);
      if (
        roleObj === undefined &&
        this.data !== null &&
        this.selectedRole === 'FACULTY'
      ) {
      } else if (roleObj !== undefined) {
        this.selectedRole = roleObj?.role;
        this.userForm.get('institutionId').enable();
        console.log(this.userObject.institutionId, 'nan');
      } else {
        this.selectedRole = '';
        this.userForm.get('institutionId').disable();
        this.userObject.institutionId = undefined;
        console.log(this.userObject.institutionId);
      }
    });
  }
  saveUserMaster() {
    this.userService.saveUserMaster(this.userObject).subscribe(
      (res: any) => {
        this.userForm.reset();
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(res);
      },
      (err: any) => {
        this.toastr.error(err.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(err);
      }
    );
  }
  updateUserMaster() {
    this.userService.updateUserMaster(this.userObject).subscribe(
      (res: any) => {
        this.userForm.reset();
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(res);
      },
      (err: any) => {
        this.toastr.error(err.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(err);
      }
    );
  }
  getRole() {
    this.roleService.getRole().subscribe((res: any) => {
      this.roles = res.result;
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
