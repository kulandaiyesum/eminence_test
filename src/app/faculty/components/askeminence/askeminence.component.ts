import { Component } from '@angular/core';

@Component({
  selector: 'app-askeminence',
  templateUrl: './askeminence.component.html',
  styleUrls: ['./askeminence.component.scss'],
})
export class AskeminenceComponent {
  public prompts: string[] = [
    'Summarize the steps of an action potential into a neat table.',
    'List the adverse effects of each class of anti-arrhythmics drugs.',
    'Make a content outline for endocrine pathology.',
    'Create helpful mnemonics to remember the interleukins.',
  ];
}
