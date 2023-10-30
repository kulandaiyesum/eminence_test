import { RsaService } from './../../../shared/service/rsa.service';
import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionService } from '../../service/subscription.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../../service/package.service';
import { LogicalfuntionService } from 'src/app/shared/logicalfuntion.service';
import { AddSubscriptionComponent } from '../add-subscription/add-subscription.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from '../../model/subscription.class';
import { environment } from 'src/environments/environment';

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
  subscriptionObject: Subscription;
  private secretKey: string = environment.secretKey;
  public packageList;
  public unqiuePackage = [];
  public Packageid = [];
  isPackageSelected: boolean = true;
  public selectedDurationType: string;
  public calculatedEndDate: string;
  public selectedPackageOption;
  public maxDate = new Date();
  public minDate: string = this.calculateMinDate();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddSubscriptionComponent>,
    public logicalService: LogicalfuntionService,
    public packageService: PackageService,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService,
    private rsaService: RsaService
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.subscriptionObject = new Subscription();
    this.getPackageData();
    this.initForm();
    this.subscriptionObject._id = this.data._id;
    this.subscriptionObject.institutionId = this.data.institutionId;
    this.subscriptionObject.packageId = this.data?.packageId?._id;
    this.subscriptionObject.startDate = new Date(this.data?.startDate);
    this.subscriptionObject.createdBy = this.data?.createdBy;
    this.subscriptionObject.questionsCountResetDate =
      this.data?.questionsCountResetDate;
    this.selectedPackageOption = this.data?.packageId;
    if (this.data?.endDate !== null) {
      this.subscriptionObject.endDate = new Date(this.data?.endDate);
    } else {
      this.calculateEndDate();
    }
  }

  initForm() {
    this.updateSubscriptionForm = new FormGroup({
      packageId: new FormControl(),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(),
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
    const modifierName = localStorage.getItem('3');
    this.subscriptionObject.modifiedBy = this.rsaService.decryptText(
      modifierName,
      this.secretKey
    );
    this.subscriptionService
      .updateSubscription(this.subscriptionObject)
      .subscribe(
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

  selectedPackage(event: Event) {
    this.subscriptionObject.startDate = new Date();
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue !== 'package') {
      const selectedPackage = this.packageList.find(
        (pkg) => pkg._id === selectedValue
      );
      this.subscriptionObject.startDate === new Date();
      if (selectedPackage) {
        this.selectedPackageOption = selectedPackage;
        this.subscriptionObject.packageId = this.selectedPackageOption._id;
        this.calculateEndDate();
      } else {
        console.log('No package selected');
      }
    }
  }

  calculateEndDate() {
    const startDate = this.subscriptionObject.startDate;
    if (startDate === '' || startDate === undefined) {
      return;
    }
    let endDate: Date;
    this.selectedDurationType = this.data?.packageId?.durationType;
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
    this.subscriptionObject.endDate = endDate;
  }
}
