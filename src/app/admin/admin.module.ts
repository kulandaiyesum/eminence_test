import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MasterComponent } from './pages/master/master.component';

@NgModule({
  declarations: [MasterComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
