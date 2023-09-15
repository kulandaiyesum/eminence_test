import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { EnterpriseComponent } from './pages/enterprise/enterprise.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsEnterpriseComponent } from './components/contact-us-enterprise/contact-us-enterprise.component';
import { ContactUsAboutUsComponent } from './components/contact-us-about-us/contact-us-about-us.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BannerComponent } from './components/banner/banner.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeLayoutComponent,
    HomeComponent,
    EnterpriseComponent,
    AboutUsComponent,
    ContactUsEnterpriseComponent,
    ContactUsAboutUsComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
