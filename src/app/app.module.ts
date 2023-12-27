import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModule } from './login/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AuthHttpInterceptorService } from './shared/service/auth-http-interceptor..service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterModule } from './master/master.module';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,NgbCarouselModule,MatIconModule,MatPaginatorModule,MasterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true,
    },DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
