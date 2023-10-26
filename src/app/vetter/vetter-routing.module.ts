import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './components/questions/questions.component';
import { OpenItemsComponent } from './components/open-items/open-items.component';

const routes: Routes = [
  { path: '', redirectTo: 'open-items', pathMatch: 'full' },
  { path: 'open-items', component: OpenItemsComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'questions/:reqId', component: QuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetterRoutingModule {}
