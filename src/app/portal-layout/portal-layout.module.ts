import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalLayoutRoutingModule } from './portal-layout-routing.module';
import { PortalLayoutComponent } from './portal-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [PortalLayoutComponent, FeedbackComponent, ProfileComponent],
  imports: [
    CommonModule,
    PortalLayoutRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,FormsModule,ReactiveFormsModule,MatMenuModule
  ],
})
export class PortalLayoutModule {}
