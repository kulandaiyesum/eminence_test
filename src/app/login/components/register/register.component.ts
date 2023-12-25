import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../service/register.service';
import { Register } from '../../model/register.model';
import { LoginComponent } from '../login/login.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PackageService } from 'src/app/master/service/package.service';
import { HttpClient } from '@angular/common/http';
import { StripeService } from '../../service/stripe.service';
import { Router } from '@angular/router';

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
    pacakageId: '',
  };
  public failure = false;
  public success = false;

  b2cPackages: any[] = [];
  packageType: string = '';
  priceOption: string = '';
  paymentHeader: any = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private stripeService: StripeService,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private packageService: PackageService,
    private dialog: MatDialog,
    private registrationService: RegisterService
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
    this.getStripe();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  fetchB2CPackages() {
    this.packageService
      .getPackagesforRegistration()
      .subscribe((response: any) => {
        if (response.success) {
          this.b2cPackages = response.result;
          console.log(this.b2cPackages);
        } else {
          console.error(response.message);
        }
      });
  }

  openLoginPopUp() {
    this.closeDialog();
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: 'auto',
      data: 'Message from header',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const stripeScript = window.document.createElement('script');
      stripeScript.id = 'stripe-script';
      stripeScript.type = 'text/javascript';
      stripeScript.src = 'https://checkout.stripe.com/checkout.js';

      stripeScript.onload = () => {
        // Configuring Stripe Checkout after the script has loaded
        const StripeCheckout = (<any>window).StripeCheckout;
        this.paymentHeader = StripeCheckout.configure({
          key: 'pk_test_51NxjaWSHSMOSeQFKsEGE4q6dF1x9Z5wusXRuJgjSs6RKcbqA0PguiQd3MKeP6dzyhJA6AYnkchEJhkHnRgfEdEYS00xTm0qwc6',
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(stripeScript);
    }
  }
  onRegistrationSubmit() {
    console.log(this.registerModel);
    let data = this.b2cPackages.find(
      (x) => x._id === this.registerModel.pacakageId
    );
    const amount = 0.1;
    console.log(amount);
    const paymentHeader = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NxjaWSHSMOSeQFKsEGE4q6dF1x9Z5wusXRuJgjSs6RKcbqA0PguiQd3MKeP6dzyhJA6AYnkchEJhkHnRgfEdEYS00xTm0qwc6',
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken);
        paymentStripe(stripeToken);
      },
    });
    const paymentStripe = (stripeToken) => {
      this.stripeService.makePayment(stripeToken).subscribe((data) => {
        console.log(data);
        // if (data === 'Success') {
        console.log(':ffffffffff');

        // this.success = true;
        this.registrationService.registerUser(this.registerModel).subscribe(
          (response) => {
            this.toastr.success('Registration successful!', 'Success');
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error(error, 'Error');
            this.toastr.error('Registration failed!', 'Error');
          }
        );
        // } else {
        //   console.log('ppppppppppppp', data === 'Success');

        //   this.failure = true;
        //   this.toastr.error('Registration failed!', 'Error');
        // }
      });
    };
    paymentHeader.open({
      name: 'Payment Details',
      description: 'Your Order total Amount is ' + amount,
      amount: amount,
    });

    // const userData = {
    //   firstName: this.registerModel.firstName,
    //   lastName: this.registerModel.lastName,
    //   email: this.registerModel.email,
    //   password: this.registerModel.password,
    //   institutionName: this.registerModel.institutionName,
    //   role: 'student',
    // };
    // this.registerService.registerUser(userData).subscribe(
    //   (response) => {
    //     this.toastr.success('Registration successful!', 'Success');
    //   },
    //   (error) => {
    //     console.error(error, 'Error');
    //     this.toastr.error('Registration failed!', 'Error');
    //   }
    // );
  }
}
