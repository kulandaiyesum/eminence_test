import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { PackageComponent } from './components/package/package.component';
import { InstitutionComponent } from './components/institution/institution.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { RoleComponent } from './components/role/role.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InstitutePopupComponent } from './components/institute-popup/institute-popup.component';

import { TopicComponent } from './components/topic/topic.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { TopicFormComponent } from './components/topic-form/topic-form.component';
import { PackagePopupComponent } from './components/package-popup/package-popup.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SubscriptionPopupComponent } from './components/subscription-popup/subscription-popup.component';
import { AddSubscriptionComponent } from './components/add-subscription/add-subscription.component';
import { UpdateSubscriptionComponent } from './components/update-subscription/update-subscription.component';
import { AddVetterComponent } from './components/add-vetter/add-vetter.component';
import { AddAttributesComponent } from './components/add-attributes/add-attributes.component';
import { AddElementComponent } from './components/add-element/add-element.component';
import { SystemComponent } from './components/system/system.component';
import { SystemCrudComponent } from './components/system-crud/system-crud.component';
import { SubSystemComponent } from './components/sub-system/sub-system.component';
import { SubSystemCrudComponent } from './components/sub-system-crud/sub-system-crud.component';

@NgModule({
  declarations: [
    PackageComponent,
    PackagePopupComponent,
    InstitutionComponent,
    SubscriptionComponent,
    RoleComponent,
    InstitutePopupComponent,
    TopicComponent,
    RoleFormComponent,
    TopicFormComponent,
    UserComponent,
    UserFormComponent,
    SubscriptionPopupComponent,
    AddSubscriptionComponent,
    UpdateSubscriptionComponent,
    AddVetterComponent,
    AddAttributesComponent,
    AddElementComponent,
    SystemComponent,
    SystemCrudComponent,
    SubSystemComponent,
    SubSystemCrudComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [
    RoleComponent,
    InstitutionComponent,
    SubscriptionComponent,
    PackageComponent,
    TopicComponent,
    UserComponent,
  ],
})
export class MasterModule {}
