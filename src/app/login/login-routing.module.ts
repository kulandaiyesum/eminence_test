import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmailComponent } from './components/email/email.component';

const routes: Routes = [
  // {
  //   path: 'forgotpassword',
  //   component: ForgotPasswordComponent,
  // },
  // {
  //   path: 'email',
  //   component: EmailComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
