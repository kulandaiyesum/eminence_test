import { Component, Inject } from '@angular/core';
import { Institution } from '../../model/institution.class';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService } from '../../service/subscription.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../../service/package.service';
import { LogicalfuntionService } from 'src/app/shared/logicalfuntion.service';
import { AddSubscriptionComponent } from '../add-subscription/add-subscription.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface MyObject {
  _id: string;
  institutionId: string;
  packageNameId: string;
  startdate: Date;
}

@Component({
  selector: 'app-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.scss'],
})
export class UpdateSubscriptionComponent {
  updateSubscriptionForm: FormGroup;

  public packageList;

  public unqiuePackage = [];
  public Packageid = [];
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
    questionsCountResetDate: new Date(),
  };
  public maxDate = new Date();

  public minDate: string = this.calculateMinDate();
  public myObject: MyObject;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddSubscriptionComponent>,
    public logicalService: LogicalfuntionService,
    public packageService: PackageService,
    private formBuilder: FormBuilder,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService
  ) {
    console.log(data);
    this.myObject = {
      _id: '', // Initialize with your desired values
      institutionId: '', // Initialize with your desired values
      packageNameId: '',
      startdate: new Date(), // Initialize with the current date or your desired date
    };
    this.myObject.institutionId = data.institutionId._id;
    this.myObject._id = data._id;
  }

  ngOnInit(): void {
    this.getPackageData();
    this.institutionModel.startdate = new Date();
    this.initForm();
  }

  initForm() {
    this.updateSubscriptionForm = this.formBuilder.group({
      startdate: [this.institutionModel.startdate, Validators.required],
    });
  }

  private calculateMinDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubscriptionUpdate() {
    this.myObject.startdate = this.institutionModel.startdate;
    this.subscriptionService.updateSubscription(this.myObject).subscribe(
      (response: any) => {
        this.toastr.success(response.message, '', {
          timeOut: 3000,
        });
        this.closeDialog();
      },
      (error) => {
        this.toastr.error(error.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
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
        this.myObject.packageNameId = this.selectedPackageOption._id;
        this.institutionModel.packageNameId = this.selectedPackageOption._id;
        this.institutionModel.packageName =
          this.selectedPackageOption.packageName;
        this.institutionModel.questionsCount =
          this.selectedPackageOption.questionsCount;
        this.institutionModel.durationType =
          this.selectedPackageOption.durationType;
        this.calculateEndDate();
        this.subscriptionService
          .createSubscriptionAuto(this.institutionModel)
          .subscribe(
            (response: any) => {
              console.log(response);
              this.institutionModel.startdate = new Date(
                response.result.startDate
              );
              this.institutionModel.enddate = new Date(response.result.endDate);
              // this.institutionModel.questionsCountResetDate = '';
              console.log(this.institutionModel.enddate);
              const inputDate = this.institutionModel.enddate;
              const day = String(inputDate.getDate()).padStart(2, '0'); // Add leading zero if needed
              const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
              const year = inputDate.getFullYear();
              this.calculatedEndDate = `${day}/${month}/${year}`;
            },
            (error) => {
              console.error('Not data get', error);
            }
          );
      } else {
        console.log('No package selected');
      }
    }
  }

  calculateEndDate() {
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
}
