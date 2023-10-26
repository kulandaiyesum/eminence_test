import { System } from './../../model/system';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SubSystem } from '../../model/sub-system';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { SubSystemService } from '../../service/sub-system.service';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-sub-system-crud',
  templateUrl: './sub-system-crud.component.html',
  styleUrls: ['./sub-system-crud.component.scss'],
})
export class SubSystemCrudComponent implements OnInit {
  subSystemForm: FormGroup;
  subSystemObject: SubSystem;
  userFirstName: string;
  secretKey: string = environment.secretKey;
  initialFormValues: any;
  isFormValueChanged: boolean = false;
  systems: System[];
  constructor(
    private systemServeice: SystemService,
    private subSystemService: SubSystemService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SubSystemCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rsaService: RsaService
  ) {
    this.subSystemObject = new SubSystem();
    this.subSystemForm = new FormGroup({
      _id: new FormControl(data?._id || ''),
      subSystem: new FormControl(data?.subSystem || '', Validators.required),
      systemId: new FormControl(data?.systemId?._id || '', Validators.required),
    });
    this.getAllSystem();
  }
  ngOnInit(): void {
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );
    if (this.data !== null) {
      this.subSystemObject._id = this.data?._id;
      this.subSystemObject.subSystem = this.data?.subSystem;
      this.subSystemObject.createdBy = this.data?.createdBy;
      this.subSystemObject.createdOn = this.data?.createdOn;
      this.subSystemObject.systemId = this.data?.systemId?._id;
      this.subSystemObject.status = this.data?.status;
      this.initialFormValues = this.subSystemForm.value;
    }
    this.subSystemForm.valueChanges.subscribe(() => {
      const currentFormValues = this.subSystemForm.value;
      this.isFormValueChanged = !this.areFormValuesEqual(
        this.initialFormValues,
        currentFormValues
      );
    });
  }
  areFormValuesEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  getAllSystem() {
    this.systemServeice.getAllSystems().subscribe(
      (data: any) => {
        this.systems = data.result;
      },
      (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }
  saveSubSystem() {
    this.subSystemObject.createdBy = this.userFirstName;
    this.subSystemService.savesubSystem(this.subSystemObject).subscribe(
      (data: any) => {
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
  editSubSystem() {
    this.subSystemService.updatesubSystem(this.subSystemObject).subscribe(
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
