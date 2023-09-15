import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginLayoutComponent } from './pages/login-layout/login-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LoginLayoutComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
