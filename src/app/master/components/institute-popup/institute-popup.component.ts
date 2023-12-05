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
  isPackageSelected: boolean = true;
  public selectedDurationType: string;
  public calculatedEndDate: string;

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
    enddate: new Date(),
    durationType: '',
    country: '',
    questionsCountResetDate: new Date(),
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
      this.visibleUpdate = true;
      this.institutionModel.name = data.name || data.institutionName;
      this.institutionModel.email = data.email;
      this.institutionModel._id = data._id;
      this.institutionModel.address = data.address;
      this.institutionModel.state = data.state;
      this.institutionModel.zip = data.zip;
      this.institutionModel.city = data.city;
      this.institutionModel.country = data.country;
      this.institutionModel.phoneNo = data.phoneNo;
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
      country: ['', Validators.required],
      startdate: [new Date(), Validators.required],
      enddate: [new Date(), Validators.required],
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
      this.packageList = doc.result.filter((item) => item.type === 'B2B');
      console.log(this.packageList);
      this.unqiuePackage = this.logicalService.filteredArrayWithJsonValue(
        this.packageList,
        'packageName'
      );
    });
  }

  calculateEndDate() {
    const startDate = new Date(this.institutionModel.startdate);
    let endDate: Date;

    switch (this.selectedDurationType) {
      case 'monthly':
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 29);
        break;
      case 'quarterly':
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 89);
        break;
      case 'half-yearly':
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 179);
        break;
      case 'annually':
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 364);
        break;
      default:
        endDate = null;
    }
    this.institutionModel.enddate = new Date(
      endDate ? endDate.toISOString().substring(0, 10) : ''
    );

    if (endDate) {
      const year = endDate.getFullYear();
      const month = String(endDate.getMonth() + 1).padStart(2, '0');
      const day = String(endDate.getDate()).padStart(2, '0');
      this.calculatedEndDate = `${day}/${month}/${year}`;
    } else {
      this.calculatedEndDate = '';
    }
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  getPackgeType(list) {
    this.isPackageSelected = false;
    let data = this.packageList.find((x) => x.packageName === list);
    this.institutionModel.questionsCount = data.questionsCount;
    this.institutionModel.packageNameId = data._id;
    this.institutionModel.durationType = data.durationType;
    this.selectedDurationType = this.institutionModel.durationType;
  }

  onInstituteSubmit() {
    this.instituteForm.controls['email'].setValue(this.institutionModel.email);
    this.instituteForm.controls['name'].setValue(this.institutionModel.name);
    this.instituteForm.controls['address'].setValue(
      this.institutionModel.address
    );
    this.instituteForm.controls['state'].setValue(this.institutionModel.state);
    this.instituteForm.controls['zip'].setValue(this.institutionModel.zip);
    this.instituteForm.controls['city'].setValue(this.institutionModel.city);
    this.instituteForm.controls['country'].setValue(
      this.institutionModel.country
    );
    this.instituteForm.controls['startdate'].setValue(
      this.institutionModel.startdate
    );
    this.instituteForm.controls['enddate'].setValue(
      this.institutionModel.enddate
    );

    if (this.instituteForm.valid) {
      this.closeDialog();
      console.log(this.institutionModel);
      return;
      this.instituteService.createInstitute(this.institutionModel).subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success(response.message, '', {
            timeOut: 3000,
          });
        },
        (error) => {
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
          console.error('Not data get', error);
        }
      );
    }
  }

  updateInstitute() {
    this.instituteForm.controls['email'].setValue(this.institutionModel.email);
    this.instituteForm.controls['name'].setValue(this.institutionModel.name);
    this.instituteForm.controls['address'].setValue(
      this.institutionModel.address
    );
    this.instituteForm.controls['state'].setValue(this.institutionModel.state);
    this.instituteForm.controls['zip'].setValue(this.institutionModel.zip);
    this.instituteForm.controls['city'].setValue(this.institutionModel.city);
    this.instituteForm.controls['country'].setValue(
      this.institutionModel.country
    );
    this.instituteForm.controls['startdate'].setValue(
      this.institutionModel.startdate
    );
    this.instituteForm.controls['enddate'].setValue(
      this.institutionModel.enddate
    );
    this.instituteForm.controls['_id'].setValue(this.institutionModel._id);

    if (this.instituteForm.valid) {
      this.instituteService.updateInstitution(this.institutionModel).subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success(response.message, '', {
            timeOut: 3000,
          });
          this.closeDialog();
        },
        (error) => {
          this.toastr.error(error.error.message, '', {
            timeOut: 3000,
          });
          console.error('Not data get', error);
        }
      );
    }
  }

  verifyEmail() {
    let data = { email: this.institutionModel.email };
    this.instituteService.sendVerificationCode(data).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
