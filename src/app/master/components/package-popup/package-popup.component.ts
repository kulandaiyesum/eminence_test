import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Package } from '../../model/package.class';
import { PackageService } from '../../service/package.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-package-popup',
  templateUrl: './package-popup.component.html',
  styleUrls: ['./package-popup.component.scss'],
})
export class PackagePopupComponent {
  packageForm: FormGroup;
  visibleUpdate: boolean = false;
  public package: Package;

  constructor(
    private dialogRef: MatDialogRef<PackagePopupComponent>,
    private packageService: PackageService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private cdr: ChangeDetectorRef
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.package = new Package();
    if (this.data !== null) {
      this.package._id = this.data._id;
      this.package.amount = this.data.amount; //
      this.package.durationType = this.data.durationType; //
      this.package.packageName = this.data.packageName; //
      this.package.questionsCount = this.data.questionsCount; //
      this.package.rate = this.data.rate; //
      this.package.type = this.data.type; //
      this.visibleUpdate = true;
    } else {
      this.package = new Package();
    }
    this.initForm();
    this.packageForm.get('type').valueChanges.subscribe((selectType) => {
      if (selectType === 'B2C') {
        this.packageForm.get('questionsCount').disable();
        this.packageForm.get('rate').disable();
        this.package.questionsCount = 0;
        this.package.rate = 0;
      } else {
        this.packageForm.get('questionsCount').enable();
        this.packageForm.get('rate').enable();
      }
      this.cdr.detectChanges();
    });
  }

  initForm() {
    this.packageForm = new FormGroup({
      packageName: new FormControl('', Validators.required),
      questionsCount: new FormControl(0, Validators.required),
      amount: new FormControl(0, Validators.required),
      rate: new FormControl(0, Validators.required),
      durationType: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // add
  onPackageSubmit() {
    console.log(this.package, 'add');
    this.packageService.createPackage(this.package).subscribe(
      (data: any) => {
        this.toastr.success(data.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(data);
      },
      (err: any) => {
        this.toastr.error(err.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  resetForm() {
    this.packageForm.reset();
  }

  // edit
  updatePackage() {
    console.log(this.package, 'edit');
    this.packageService.updatePackage(this.package).subscribe(
      (res: any) => {
        this.toastr.success(res.message, '', {
          timeOut: 3000,
        });
        this.dialogRef.close(res);
        this.visibleUpdate = true;
      },
      (err: any) => {
        this.toastr.error(err.message, '', {
          timeOut: 3000,
        });
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  restrictInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (/[^0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      event.preventDefault();
    }
}
}
