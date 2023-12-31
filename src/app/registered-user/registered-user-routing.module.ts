import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildTestComponent } from './components/build-test/build-test.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { SavedComponent } from './components/saved/saved.component';
import { ExamRoomComponent } from './components/exam-room/exam-room.component';

const routes: Routes = [
  { path: '', redirectTo: 'build-test', pathMatch: 'full' },
  { path: 'build-test', component: BuildTestComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'saved', component: SavedComponent },
  { path: 'exam-room', component: ExamRoomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisteredUserRoutingModule {}
