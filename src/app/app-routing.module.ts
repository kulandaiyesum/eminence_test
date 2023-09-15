import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(h => h.HomeModule)},
  { path: 'faculty', loadChildren: () => import('./faculty/faculty.module').then(h => h.FacultyModule)},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(h => h.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
