import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../service/register.service';
import { Register } from '../../model/register.model';
import { LoginComponent } from '../login/login.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PackageService } from 'src/app/master/service/package.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  institutionName: string = '';
  registerModel: Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    token: '',
    id: '',
    institutionName: '',
  };

  dialog: any;
  b2cPackages: any[] = [];
  packageType: string = '';
  priceOption: string = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private registerService: RegisterService,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private packageService: PackageService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      role: ['student'],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      institutionName: ['', Validators.required],
    });
    this.fetchB2CPackages();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  fetchB2CPackages() {
    this.packageService.getB2CPackages().subscribe((packages: any) => {
      this.b2cPackages = packages.result;
      if (this.b2cPackages.length > 0) {
        this.packageType = this.b2cPackages[0].packageName;
        this.priceOption = `$${this.b2cPackages[0].rate}/quarter`;
      }
    });
  }

  openLoginPopUp() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: 'auto',
      data: 'Message from header',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onRegistrationSubmit() {
    const userData = {
      firstName: this.registerModel.firstName,
      lastName: this.registerModel.lastName,
      email: this.registerModel.email,
      password: this.registerModel.password,
      institutionName: this.registerModel.institutionName,
      role: 'student',
    };
    this.registerService.registerUser(userData).subscribe(
      (response) => {
        this.toastr.success('Registration successful!', 'Success');
      },
      (error) => {
        console.error(error, 'Error');
        this.toastr.error('Registration failed!', 'Error');
      }
    );
  }
}
