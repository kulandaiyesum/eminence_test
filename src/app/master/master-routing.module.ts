import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from './components/package/package.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { TopicComponent } from './components/topic/topic.component';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';

const routes: Routes = [
  { path: '', redirectTo: 'package', pathMatch: 'full' },
  { path: 'package', component: PackageComponent },
  { path: 'institution', component: InstitutionComponent },
  { path: 'topic', component: TopicComponent },
  { path: 'role', component: RoleComponent },
  { path: 'user', component: UserComponent },
  { path: 'subscriber', component: SubscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
