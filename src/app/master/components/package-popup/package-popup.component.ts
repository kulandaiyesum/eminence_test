import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
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
  public package: Package;

  @ViewChild('packageForm', { static: false }) packageFormDirective: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PackagePopupComponent>,
    private packageService: PackageService,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.packageData) {
      this.package = { ...this.data.packageData };
      this.visibleUpdate = true;
    } else {
      this.package = new Package();
    }
    this.initForm();
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

  typeChanged() {
    console.log('run');
  }

  onPackageSubmit() {
    console.log(this.package, 'dddddddddddddddddddddd');

    this.packageService.createPackage(this.package).subscribe((data: any) => {
      this.dialogRef.close();
      console.log(data);
      this.resetForm();
    });
  }

  resetForm() {
    this.packageForm.reset();
    this.packageFormDirective.resetForm();
  }

  updatePackage() {
    console.log('submitted');
    this.packageForm.controls['packageName'].setValue(this.package.packageName);
    this.packageForm.controls['questionsCount'].setValue(
      this.package.questionsCount
    );
    this.packageForm.controls['amount'].setValue(this.package.amount);
    this.packageForm.controls['rate'].setValue(this.package.rate);
    this.packageForm.controls['durationType'].setValue(
      this.package.durationType
    );
    this.packageForm.controls['durationCount'].setValue(
      this.package.durationCount
    );
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
  onNoClick(): void {
    this.dialogRef.close();
  }
}
