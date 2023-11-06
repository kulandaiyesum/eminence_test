import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildTestComponent } from './components/build-test/build-test.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { SavedComponent } from './components/saved/saved.component';
import { ExamRoomComponent } from './components/exam-room/exam-room.component';
import { ExamComponent } from './components/exam/exam.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ExamTimedComponent } from './components/exam-timed/exam-timed.component';

const routes: Routes = [
  { path: '', redirectTo: 'build-test', pathMatch: 'full' },
  { path: 'build-test', component: BuildTestComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: 'saved', component: SavedComponent },
  { path: 'exam-room', component: ExamRoomComponent },
  { path: 'exam/:id', component: ExamComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'exam-timed', component: ExamTimedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisteredUserRoutingModule {}
