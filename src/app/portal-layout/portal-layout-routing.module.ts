import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalLayoutComponent } from './portal-layout.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PortalLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('../master/master.module').then((m) => m.MasterModule),
      },
      {
        path: 'faculty',
        loadChildren: () =>
          import('../faculty/faculty.module').then((m) => m.FacultyModule),
      },
      {
        path: 'vetter',
        loadChildren: () =>
          import('../vetter/vetter.module').then((m) => m.VetterModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalLayoutRoutingModule {}
