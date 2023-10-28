import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './components/questions/questions.component';
import { OpenItemsComponent } from './components/open-items/open-items.component';
import { EditorComponent } from '../faculty/components/editor/editor.component';
import { VettedHistoryComponent } from './components/vetted-history/vetted-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'open-items', pathMatch: 'full' },
  { path: 'open-items', component: OpenItemsComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'questions/:reqId', component: EditorComponent },
  { path: 'history', component: VettedHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VetterRoutingModule {}
