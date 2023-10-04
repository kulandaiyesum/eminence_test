import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../service/register.service';
import { Register } from '../../model/register.model';
import { LoginComponent } from '../login/login.component';

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

  public registerModel: Register = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    token: '',
    id: '',
    institutionName: ''
  };
  dialog: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  openLoginPopUp() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: 'auto',
      data: 'Message from header',
      // Other MatDialog options
    });
    // You can handle dialog events here if needed
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onRegistrationSubmit() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      institutionName: this.institutionName
    };





    console.log(this.registerModel);

    this.registrationForm.controls['email'].setValue(this.registerModel.email);
    this.registrationForm.controls['lastName'].setValue(this.registerModel.lastName);
    this.registrationForm.controls['firstName'].setValue(this.registerModel.firstName);
    this.registrationForm.controls['password'].setValue(this.registerModel.password);
    this.registerService.registerUser(this.registrationForm.value).subscribe(
      (response) => {
        console.log(response, 'User Data');
        this.toastr.success('Registration successful!', 'Success');
      },
      (error) => {
        console.error(error, 'Error');
        this.toastr.error('Registration failed!', 'Error');
      }
    );
  }
}
