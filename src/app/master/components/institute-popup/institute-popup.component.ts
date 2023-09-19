import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Institution } from '../../model/institution.class';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstituteserviceService } from '../../service/instituteservice.service';

@Component({
  selector: 'app-institute-popup',
  templateUrl: './institute-popup.component.html',
  styleUrls: ['./institute-popup.component.scss'],
})
export class InstitutePopupComponent {
  instituteForm: FormGroup;
  hidePassword: boolean = true;
  secretKeyLength = 32;
  secretKey = environment.secretKey;
  visibleUpdate: boolean = false;

  public institutionModel: Institution = {
    name: '',
    email: '',
    _id: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private instituteService: InstituteserviceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InstitutePopupComponent>
  ) {
    if (data != null) {
      console.log(data);
      this.visibleUpdate = true;
      this.institutionModel.name = data.name;
      this.institutionModel.email = data.email;

      this.institutionModel._id = data._id;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.instituteForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      _id: [''],
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }
  closeDialog() {
    this.dialogRef.close();
  }

  onInstituteSubmit() {
    console.log('submitted');
    this.instituteForm.controls['email'].setValue(this.institutionModel.email);
    this.instituteForm.controls['name'].setValue(this.institutionModel.name);




    if (this.instituteForm.valid) {
      console.log(this.instituteForm.value);
      this.closeDialog();
      this.instituteService.createInstitute(this.instituteForm.value).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.error('Not data get', error);
        }
      );
    }
  }

  updateInstitute() {
    console.log('submitted');
    this.instituteForm.controls['email'].setValue(this.institutionModel.email);
    this.instituteForm.controls['name'].setValue(this.institutionModel.name);


    this.instituteForm.controls['_id'].setValue(this.institutionModel._id);
    
    if (this.instituteForm.valid) {
      console.log('form valid for update');
      console.log(this.instituteForm.value._id);

      this.instituteService
        .updateInstitution(this.instituteForm.value)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.closeDialog()
          },
          (error) => {
            console.error('Not data get', error);
          }
        );
    }
  }
}
