import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from './components/package/package.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { TopicComponent } from './components/topic/topic.component';
import { RoleComponent } from './components/role/role.component';
import { UserComponent } from './components/user/user.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { AddVetterComponent } from './components/add-vetter/add-vetter.component';
import { AddAttributesComponent } from './components/add-attributes/add-attributes.component';
import { SystemComponent } from './components/system/system.component';
import { SubjectComponent } from './components/subject/subject.component';
import { SubSystemComponent } from './components/sub-system/sub-system.component';


const routes: Routes = [
  { path: '', redirectTo: 'package', pathMatch: 'full' },
  { path: 'package', component: PackageComponent },
  { path: 'institution', component: InstitutionComponent },
  { path: 'topic', component: TopicComponent },
  { path: 'role', component: RoleComponent },
  { path: 'user', component: UserComponent },
  { path: 'subscriber', component: SubscriptionComponent },
  { path: 'addvetter', component: AddVetterComponent },
  { path: 'addattributes', component: AddAttributesComponent },
  { path: 'system', component: SystemComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'sub-system', component: SubSystemComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
