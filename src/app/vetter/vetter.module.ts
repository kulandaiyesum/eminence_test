import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VetterRoutingModule } from './vetter-routing.module';
import { QuestionsComponent } from './components/questions/questions.component';


@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    VetterRoutingModule
  ]
})
export class VetterModule { }
