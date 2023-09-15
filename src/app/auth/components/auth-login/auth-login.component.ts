import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthloginserviceService } from '../../service/authloginservice.service';
import { Register } from '../../model/register.model';
import { Login } from '../../model/login.model';



@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {

  receivedData = '';
  loginForm: FormGroup;
  hidePassword: boolean = true;
  secretKeyLength = 32;
  secretKey = environment.secretKey;
  public user;

  public loginUser: Register = {
    firstName: '',
    lastName: '',
    role: '',
    id: '',
    token: '',
  };
  public loginModel: Login = {
    email: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: AuthloginserviceService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onLoginSubmit() {
    this.loginForm.controls['email'].setValue(this.loginModel.email);
    this.loginForm.controls['password'].setValue(this.loginModel.password);
    if (this.loginForm.valid) {
      this.loginService.loginAuthenticate(this.loginForm.value).subscribe(
        (response: any) => {
          this.loginUser.firstName = response.user.firstName;
          this.loginUser.lastName = response.user.lastName;
          this.loginUser.role = response.user.role.role;
          this.loginUser.id = response.user._id;
          this.loginUser.token = response.token;
          if (
            response.user.role.role === 'ADMIN' ||
            response.user.role.role === 'FACULTY'
          ) {
            this.router.navigateByUrl('/faculty/qgen');
            
            this.loginUser.role = this.encryptText(
              response.user.role.role,
              this.secretKey
            );
            this.loginUser.firstName = this.encryptText(
              response.user.firstName,
              this.secretKey
            );
            this.loginUser.lastName = this.encryptText(
              response.user.lastName,
              this.secretKey
            );
            this.loginUser.id = this.encryptText(
              response.user._id,
              this.secretKey
            );
            localStorage.setItem('1', this.loginUser.token);
            localStorage.setItem('2', this.loginUser.role);
            localStorage.setItem('3', this.loginUser.firstName);
            localStorage.setItem('4', this.loginUser.lastName);
            localStorage.setItem('5', this.loginUser.id);
            this.toastr.success('Login success', '', {
              timeOut: 3000,
            });
          } else {
          }
        },
        (error) => {
          this.toastr.error('Invalid credentials', '', {
            timeOut: 3000,
          });
          console.log('Error : ', error);
        }
      );
    }
  }

  encryptText(text: string, secretKey: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, secretKey);
    return encrypted.toString();
  }
  decryptText(encryptedText: string, secretKey: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
