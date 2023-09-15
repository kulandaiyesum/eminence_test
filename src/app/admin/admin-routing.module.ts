import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './pages/master/master.component';

const routes: Routes = [
  { path: '', redirectTo: 'master', pathMatch: 'full' },
  { path: 'master', component: MasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
