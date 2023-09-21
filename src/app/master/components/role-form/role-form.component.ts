import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Role } from '../../model/role';
import { RoleService } from '../../service/role.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.RoleForm = new FormGroup({
      _id: new FormControl(data?._id || ''),
      role: new FormControl(data?.role || '', Validators.required),
    });
  }
  ngOnInit(): void {
    this.roles = new Role();
    if (this.data === null) {
      this.roles = new Role();
    } else {
      this.roles.role = this.data.role;
      this.roles._id = this.data._id;
      this.roles.createdAt = this.data.createdAt;
      this.roles.createdOn = this.data.createdOn;
      this.roles.modifiedAt = this.data.modifiedAt;
      this.roles.modifiedOn = this.data.modifiedOn;
      this.roles.isDeleted = this.data.isDeleted;
      this.roles.status = this.data.status;
    }
  }

  saveRole() {
    this.roleService.saveRole(this.roles.role).subscribe(
      (res: any) => {
        this.RoleForm.reset();
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(res);
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(err);
      }
    );
  }
  editRole() {
    this.roleService.editRole(this.roles).subscribe(
      (res: any) => {
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
  onNoClick(): void {
    this.dialogRef.close();
  }
}
