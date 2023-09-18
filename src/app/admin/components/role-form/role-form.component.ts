import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '../../model/role';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent implements OnInit {
  RoleForm: FormGroup;
  roles: Role;
  constructor(
    private roleService: RoleService,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data, 'value');
    this.RoleForm = new FormGroup({
      _id: new FormControl(data?._id || ''),
      role: new FormControl(data?.role || '', Validators.required),
      // status: new FormControl(),
    });
    console.log(this.RoleForm);
  }
  ngOnInit(): void {
    if (this.data === null) {
      this.roles = new Role();
    } else {
      console.log(this.data);
      this.roles.role = this.data.role;
      this.roles._id = this.data._id;
      this.roles.createdAt = this.data.createdAt;
      this.roles.createdOn = this.data.createdOn;
      this.roles.modifiedAt = this.data.modifiedAt;
      this.roles.modifiedOn = this.data.modifiedOn;
      this.roles.isDeleted = this.data.isDeleted;
      this.roles.status = this.data.status;
      console.log(this.roles, 'see');
    }
  }

  saveRole() {
    console.log('save role', this.roles);
    this.roleService.saveRole(this.roles.role).subscribe(
      (res: any) => {
        console.log(res);
        this.RoleForm.reset();
        this.dialogRef.close(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  editRole() {
    console.log('edit role', this.roles);
    this.roleService.editRole(this.RoleForm.value).subscribe((res: any) => {
      console.log(res);
      this.dialogRef.close(res);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
