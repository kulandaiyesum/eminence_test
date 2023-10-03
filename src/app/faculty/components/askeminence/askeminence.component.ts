import { Component, OnInit } from '@angular/core';
import { Askeminice } from '../../model/askeminice';
import { AskEmininceService } from '../../service/ask-eminince.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-askeminence',
  templateUrl: './askeminence.component.html',
  styleUrls: ['./askeminence.component.scss'],
})
export class AskeminenceComponent implements OnInit {
  public askEminence: Askeminice;
  loading = false;
  isTextareaDisabled = true;
  isEditMode = true;
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
        if (doc.result.length > 0) {
          this.spinner.hide();
          this.loading = false;
          this.askEminence.result = doc.result;
        }
      });
  }

  editResult(){
    this.isEditMode=!this.isEditMode
    this.isTextareaDisabled=!this.isTextareaDisabled
  }

  saveIt(){
    Swal.fire({
      title: 'Are you sure  to save changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes", trigger the save method
        this.saveChanges();
      } else {
        // User clicked "No" or closed the dialog
        // Do nothing or handle as needed
      }
    });
  }
  saveChanges(){
    this.isEditMode=!this.isEditMode
    this.askEminence.question=''
    this.askEminence.result=''

  }

  deleteItem() {
    console.log('Item deleted');
  }

  showFileFormatDialog() {
    Swal.fire({
      title: 'Select file format',
      input: 'select',
      inputOptions: {
        'text': 'Text',
        'PDF': 'PDF'
      },
      inputPlaceholder: 'Select a format',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedFormat = result.value;
        if (selectedFormat === 'text') {
          this.textFormat();
        } else if (selectedFormat === 'PDF') {
          this.pdfFormat();
        }
      } else {
        // User clicked "Cancel" or closed the dialog
        // Do nothing or handle as needed
      }
    });
  }

  textFormat() {
    console.log('Text format selected');
  }

  pdfFormat() {
    console.log('PDF format selected');
  }
}
