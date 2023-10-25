import { SystemService } from './../../service/system.service';
import { System } from './../../model/system';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../service/role.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-system-crud',
  templateUrl: './system-crud.component.html',
  styleUrls: ['./system-crud.component.scss'],
})
export class SystemCrudComponent implements OnInit {
  systemForm: FormGroup;
  systemObject: System;
  userFirstName: string;
  secretKey: string = environment.secretKey;
  constructor(
    private systemService: SystemService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SystemCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rsaService: RsaService
  ) {
    this.systemObject = new System();
    this.systemForm = new FormGroup({
      _id: new FormControl(data?._id || ''),
      system: new FormControl(data?.system || '', Validators.required),
    });
  }
  ngOnInit(): void {
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );
    if (this.data !== null) {
      this.systemObject._id = this.data?._id;
      this.systemObject.system = this.data?.system;
      this.systemObject.createdBy = this.data?.createdBy;
      this.systemObject.createdOn = this.data?.createdOn;
      this.systemObject.status = this.data?.status;
    }
  }
  saveSystem() {
    this.systemObject.createdBy = this.userFirstName;
    console.log(this.systemObject);
    this.systemService.saveSystem(this.systemObject).subscribe(
      (data: any) => {
        console.log(data);
        this.toastr.success(data.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(data);
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }
  editSystem() {
    this.systemService.updateSystem(this.systemObject).subscribe(
      (res: any) => {
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(res);
      },
      (err: any) => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
