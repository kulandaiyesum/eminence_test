import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogicalfuntionService } from 'src/app/shared/logicalfuntion.service';
import { PackageService } from '../../service/package.service';
import { Institution } from '../../model/institution.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../../service/subscription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss'],
})
export class AddSubscriptionComponent implements OnInit {
  addSubscriptionForm: FormGroup;

  public packageList;

  public unqiuePackage = [];
  isPackageSelected: boolean = true;
  public selectedDurationType: string;
  public calculatedEndDate: string;
  public selectedPackageOption;
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
  };
  public maxDate = new Date();

  public minDate: string = this.calculateMinDate();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddSubscriptionComponent>,
    public logicalService: LogicalfuntionService,
    public packageService: PackageService,
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService
  ) {
    if (data != null) {
      console.log(data);

      this.institutionModel.name = data.name;
      this.institutionModel.email = data.email;
      this.institutionModel._id = data._id;
      this.institutionModel.address = data.address;
      this.institutionModel.state = data.state;
      this.institutionModel.zip = data.zip;
      this.institutionModel.city = data.city;
      this.institutionModel.country = data.country;
      // this.institutionModel.packageName = data.packageNameId.packageName;
      // this.institutionModel.durationType = data.packageNameId.durationType;
      // this.institutionModel.startdate = data.packageNameId.startdate;
      // this.institutionModel.enddate = data.packageNameId.enddate;
    }
  }

  ngOnInit(): void {
    this.getPackageData();
    this.institutionModel.startdate = new Date();
    console.log(this.institutionModel.startdate);
    this.initForm();
  }

  initForm() {
    this.addSubscriptionForm = this.formBuilder.group({
      startdate: [this.institutionModel.startdate, Validators.required],
      enddate: [new Date(), Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private calculateMinDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  calculateEndDate() {
    console.log('end date');

    const startDate = new Date(this.institutionModel.startdate);
    let endDate: Date;
    this.selectedDurationType = this.selectedPackageOption.durationType;

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
      this.calculatedEndDate = `${month}/${day}/${year}`;
    } else {
      this.calculatedEndDate = '';
    }
  }

  getPackageData() {
    this.packageService.getAllPackages().subscribe((doc: any) => {
      this.packageList = doc.result.filter((item) => item.type === 'B2B');

      this.unqiuePackage = this.logicalService.filteredArrayWithJsonValue(
        this.packageList,
        'packageName'
      );
    });
  }

  getPackgeType(list) {
    this.isPackageSelected = false;
    let data = this.packageList.find((x) => x.packageName === list);
    this.institutionModel.questionsCount = data.questionsCount;
    this.institutionModel.packageNameId = data._id;
    this.institutionModel.durationType = data.durationType;
    this.selectedDurationType = this.institutionModel.durationType;
  }

  selectedPackage(event: Event) {
    this.institutionModel.startdate = new Date();
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue !== 'package') {
      // Find the selected package object based on the selected value
      const selectedPackage = this.packageList.find(
        (pkg) => pkg._id === selectedValue
      );
      this.institutionModel.startdate === new Date();
      if (selectedPackage) {
        this.isPackageSelected = false;
        this.selectedPackageOption = selectedPackage;
        console.log(this.selectedPackageOption);
        this.institutionModel.packageNameId = this.selectedPackageOption._id;
        this.institutionModel.packageName = this.selectedPackageOption.packageName;
        this.institutionModel.questionsCount = this.selectedPackageOption.questionsCount;
        this.institutionModel.durationType = this.selectedPackageOption.durationType;
        this.calculateEndDate();
      } else {
        console.log('No package selected');
      }
    }
  }

  onSubscriptionSubmit() {
    this.addSubscriptionForm.controls['startdate'].setValue(
      this.institutionModel.startdate
    );
    this.addSubscriptionForm.controls['enddate'].setValue(
      this.institutionModel.enddate
    );
    if (this.addSubscriptionForm.valid) {
      console.log(this.institutionModel);
      this.subscriptionService
        .createSubscription(this.institutionModel)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.toastr.success(response.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 1000,
            });
            this.closeDialog();
          },
          (error) => {
            this.toastr.error(error.error.message, '', {
              positionClass: 'toast-top-center',
              timeOut: 1000,
            });
            console.error('Not data get', error);
          }
        );
    }
  }
}
