import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalLayoutComponent } from './portal-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PortalLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalLayoutRoutingModule { }
