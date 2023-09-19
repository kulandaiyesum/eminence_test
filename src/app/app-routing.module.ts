import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((h) => h.HomeModule),
  },
  {
    path: 'Eminenceai',
    loadChildren: () =>
      import('./faculty/faculty.module').then((h) => h.FacultyModule),
  },
  {
    path: 'q',
    loadChildren: () =>
      import('./portal-layout/portal-layout.module').then(
        (h) => h.PortalLayoutModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((h) => h.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
