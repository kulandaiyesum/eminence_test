import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Package } from '../../model/package.class';
import { PackageService } from '../../service/package.service';


@Component({
  selector: 'app-package-popup',
  templateUrl: './package-popup.component.html',
  styleUrls: ['./package-popup.component.scss'],
})
export class PackagePopupComponent {
  packageForm: FormGroup;
  visibleUpdate: boolean = false;

  public package : Package



  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PackagePopupComponent>,
    private packageService: PackageService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    // if (data != null) {
    //   this.visibleUpdate = true;
    //   this.packageModel._id = data._id;
    //   this.packageModel.packageName = data.packageName;
    //   this.packageModel.questionsCount = data.questionsCount;
    //   this.packageModel.amount = data.amount;
    //   this.packageModel.rate = data.rate;

    //   this.packageModel.durationType = data.durationType;
    //   this.packageModel.durationCount = data.durationCount;
    // }
  }

  ngOnInit(): void {
    if (this.data && this.data.packageData) {
      this.package = { ...this.data.packageData };
      this.visibleUpdate = true;
    } else {
      this.package = new Package();
    }
  }


  initForm() {
    this.packageForm = this.formBuilder.group({

      packageName: ['', Validators.required],
      questionsCount: [0, Validators.required],
      amount: [0, Validators.required],
      rate: [0, Validators.required],
      durationType: ['', Validators.required],
      durationCount: [0, Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onPackageSubmit() {
    // console.log(this.package);

    // this.packageForm.controls['questionsCount'].setValue(this.package.questionsCount);
    // this.packageForm.controls['packageName'].setValue(this.packageModel.packageName);
    // this.packageForm.controls['amount'].setValue(
    //   this.package.amount
    // );
    // this.packageForm.controls['rate'].setValue(this.packageModel.rate);


    // this.packageForm.controls['durationType'].setValue(
    //   this.packageModel.durationType
    // );
    // this.packageForm.controls['durationCount'].setValue(
    //   this.packageModel.durationCount
    // );

    // if (this.packageForm.valid) {
    //   console.log("submiited");

    //   const packageData: Package = this.packageForm.value;
    //   console.log(packageData);
    //   this.closeDialog();

    //   // Send packageData to the backend using your package service
    //   this.packageService.createPackage(packageData).subscribe(
    //     (response: any) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.error('Failed to create package', error);
    //     }
    //   );
    // }
    console.log(this.package,"dddddddddddddddddddddd");

    this.packageService.createPackage(this.package).subscribe((data:any)=>{
      console.log(data);

    })


  }

  updatePackage() {
    console.log('submitted');
    // Set form values from package data
    this.packageForm.controls['packageName'].setValue(this.package.packageName);
    this.packageForm.controls['questionsCount'].setValue(this.package.questionsCount);
    this.packageForm.controls['amount'].setValue(this.package.amount);
    this.packageForm.controls['rate'].setValue(this.package.rate);
    this.packageForm.controls['durationType'].setValue(this.package.durationType);
    this.packageForm.controls['durationCount'].setValue(this.package.durationCount);
    this.packageForm.controls['_id'].setValue(this.package._id);

    if (this.packageForm.valid) {
      console.log('form valid for update');
      console.log(this.packageForm.value._id);

      this.packageService.updatePackage(this.packageForm.value).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.error('Failed to update package', error);
        }
      );
    }
  }


}
