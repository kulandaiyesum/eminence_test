import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent {
  RoleForm: FormGroup;
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

  submitRoleForm() {
    console.log(this.RoleForm.value);
    this.roleService.saveRole(this.RoleForm.value.role).subscribe(
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
    this.roleService.editRole(this.RoleForm.value).subscribe((res: any) => {
      console.log(res);
      this.dialogRef.close(res);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
