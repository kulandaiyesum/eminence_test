import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Institution } from '../../model/institution.class';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstituteserviceService } from '../../service/instituteservice.service';
import { PackageService } from '../../service/package.service';
import { LogicalfuntionService } from 'src/app/shared/logicalfuntion.service';

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
  public items;
  public packageList;
  public unqiuePackage = [];

  public institutionModel: Institution = {
    name: '',
    email: '',
    _id: '',
    address: '',
    state: '',
    zip: '',
    packageName: '',
    questionsCount: '',
    packageNameId: '',
    city: '',
    startdate: new Date(),
    enddate: new Date()
  };
  public minDate: string = this.calculateMinDate();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private instituteService: InstituteserviceService,
    public packageService: PackageService,
    public logicalService: LogicalfuntionService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<InstitutePopupComponent>
  ) {
    this.items = data;
    if (data != null) {
      console.log(data);
      this.visibleUpdate = true;
      this.institutionModel.name = data.name;
      this.institutionModel.email = data.email;
      this.institutionModel._id = data._id;
      this.institutionModel.address = data.address;
      this.institutionModel.state = data.state;
      this.institutionModel.zip = data.zip;
      this.institutionModel.city = data.city;
      this.institutionModel.packageName = data.packageNameId.packageName;
      this.institutionModel.startdate = data.packageNameId.startdate;
      this.institutionModel.enddate = data.packageNameId.enddate;
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.getPackageData();
  }

  initForm() {
    this.instituteForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      _id: [''],
      address: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      startdate: [new Date(), Validators.required],
    });
  }
  private calculateMinDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getPackageData() {
    this.packageService.getAllPackages().subscribe((doc: any) => {
      this.packageList = doc.result;
      this.unqiuePackage = this.logicalService.filteredArrayWithJsonValue(
        this.packageList,
        'packageName'
      );
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  getPackgeType(list) {
    let data = this.packageList.find((x) => x.packageName === list);
    this.institutionModel.questionsCount = data.questionsCount;
    this.institutionModel.packageNameId = data._id;
  }
  onInstituteSubmit() {
    console.log('submitted');
    console.log(this.institutionModel);

    this.instituteForm.controls['email'].setValue(this.institutionModel.email);
    this.instituteForm.controls['name'].setValue(this.institutionModel.name);
    this.instituteForm.controls['address'].setValue(
      this.institutionModel.address
    );
    this.instituteForm.controls['state'].setValue(this.institutionModel.state);
    this.instituteForm.controls['zip'].setValue(this.institutionModel.zip);
    this.instituteForm.controls['city'].setValue(this.institutionModel.city);
    this.instituteForm.controls['startdate'].setValue(this.institutionModel.startdate);


    if (this.instituteForm.valid) {
      console.log(this.instituteForm.value);
      this.closeDialog();
      this.instituteService.createInstitute(this.institutionModel).subscribe(
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
    this.instituteForm.controls['address'].setValue(
      this.institutionModel.address
    );
    this.instituteForm.controls['state'].setValue(this.institutionModel.state);
    this.instituteForm.controls['zip'].setValue(this.institutionModel.zip);
    this.instituteForm.controls['city'].setValue(this.institutionModel.city);
    this.instituteForm.controls['_id'].setValue(this.institutionModel._id);
    console.log(this.instituteForm.value);
    if (this.instituteForm.valid) {
      console.log('form valid for update');
      console.log(this.instituteForm.value._id);

      this.instituteService
        .updateInstitution(this.instituteForm.value)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.closeDialog();
          },
          (error) => {
            console.error('Not data get', error);
          }
        );
    }
  }
}
