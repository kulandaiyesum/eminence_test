import { Component, OnInit } from '@angular/core';
import { Askeminice } from '../../model/askeminice';
import { AskEmininceService } from '../../service/ask-eminince.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-askeminence',
  templateUrl: './askeminence.component.html',
  styleUrls: ['./askeminence.component.scss'],
})
export class AskeminenceComponent implements OnInit {
  public askEminence: Askeminice;
  loading = false;
  constructor(
    private askEmininveService: AskEmininceService,
    private spinner: NgxSpinnerService
  ) {}
  public prompts: string[] = [
    'Summarize the steps of an action potential into a neat table.',
    'List the adverse effects of each class of anti-arrhythmics drugs.',
    'Make a content outline for endocrine pathology.',
    'Create helpful mnemonics to remember the interleukins.',
  ];
  ngOnInit(): void {
    this.askEminence = new Askeminice();
  }

  bulid() {
    this.spinner.show();
    this.loading = true;
    this.askEmininveService
      .getAskeminice(this.askEminence)
      .subscribe((doc: any) => {
        this.loading = false;
        if (doc.result.length > 0) {
          this.spinner.hide();
          this.askEminence.result = doc.result;
        }
      });
  }
}
