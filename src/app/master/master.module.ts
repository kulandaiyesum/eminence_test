import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { PackageComponent } from './components/package/package.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { RoleComponent } from './components/role/role.component';


@NgModule({
  declarations: [
    PackageComponent,
    InstitutionComponent,
    SubscriptionComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule
  ],
  exports: [RoleComponent,InstitutionComponent,SubscriptionComponent,PackageComponent],
})
export class MasterModule { }
