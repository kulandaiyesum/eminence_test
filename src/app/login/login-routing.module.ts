import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmailComponent } from './components/email/email.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  // {
  //   path: 'forgotpassword',
  //   component: ForgotPasswordComponent,
  // },
  // {
  //   path: 'email',
  //   component: EmailComponent,
  // },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'verify-email/:id', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
