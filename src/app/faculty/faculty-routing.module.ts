import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { QgenComponent } from './components/qgen/qgen.component';
import { AskeminenceComponent } from './components/askeminence/askeminence.component';
import { EditorComponent } from './components/editor/editor.component';
import { HistoryComponent } from './components/history/history.component';
import { QgenReceivedComponent } from './components/qgen-received/qgen-received.component';

const routes: Routes = [
  { path: '', redirectTo: 'qgen', pathMatch: 'full' },
  { path: 'qgen', component: QgenComponent },
  { path: 'reviewQ', component: QgenReceivedComponent },
  { path: 'askeminence', component: AskeminenceComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'editor/:reqId', component: EditorComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultyRoutingModule {}
