import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisteredUserRoutingModule } from './registered-user-routing.module';
import { BuildTestComponent } from './components/build-test/build-test.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { SavedComponent } from './components/saved/saved.component';
import { ExamRoomComponent } from './components/exam-room/exam-room.component';


@NgModule({
  declarations: [
    BuildTestComponent,
    PerformanceComponent,
    SavedComponent,
    ExamRoomComponent
  ],
  imports: [
    CommonModule,
    RegisteredUserRoutingModule
  ]
})
export class RegisteredUserModule { }
