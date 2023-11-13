import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Askeminice } from '../../model/askeminice';
import { AskEmininceService } from '../../service/ask-eminince.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import Scrollbar from 'smooth-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { Qgen } from '../../model/qgen';
import { environment } from 'src/environments/environment';
import { RsaService } from 'src/app/shared/service/rsa.service';
import { QgenService } from '../../service/qgen.service';

@Component({
  selector: 'app-askeminence',
  templateUrl: './askeminence.component.html',
  styleUrls: ['./askeminence.component.scss'],
})
export class AskeminenceComponent implements OnInit {
  public askEminence: Askeminice;
  secretKey: string = environment.secretKey;
  userId: string = '';
  userFirstName: string = '';
  loading = false;
  isTextareaDisabled = true;
  isEditMode = true;
  resultObject = {
    _id: '',
    keyword: '',
    answer: '',
  };
  resultObjectForEmail = {
    _id: '',
    keyword: '',
    answer: '',
    type: '',
  };
  isEditing: boolean = false;
  sampleData: any;
  editIconVisibility: boolean = true;
  saveIconVisibility: boolean = false;
  @ViewChild('resultTextarea') resultTextarea: ElementRef;
  constructor(
    private askEmininveService: AskEmininceService,
    private rsaService: RsaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  public prompts: string[] = [
    'Summarize the steps of an action potential into a neat table.',
    'List the adverse effects of each class of anti-arrhythmics drugs.',
    'Make a content outline for endocrine pathology.',
    'Create helpful mnemonics to remember the interleukins.',
  ];
  ngOnInit(): void {
    this.askEminence = new Askeminice();
    this.userId = this.rsaService.decryptText(
      localStorage.getItem('5'),
      this.secretKey
    );
    this.userFirstName = this.rsaService.decryptText(
      localStorage.getItem('3'),
      this.secretKey
    );

    this.askEmininveService.sampleResponse().subscribe((data: any) => {
      this.sampleData = data;
    });
  }

  ngAfterViewInit() {
    const textarea = this.resultTextarea?.nativeElement;
    if (textarea) {
      Scrollbar.init(textarea, { damping: 0.1 });
    }
  }

  bulid() {
    this.spinner.show();
    this.loading = true;
    this.askEminence.userId = this.userId;
    this.askEminence.type = 'AskEminence';
    this.askEminence.createdBy = this.userFirstName;
    this.askEmininveService.getAskeminice(this.askEminence).subscribe(
      (doc: any) => {
        this.spinner.hide();
        this.loading = false;
        const tempObj = doc.result;
        if (tempObj) {
          this.askEminence.result = tempObj.saveAskEminence.answer;
          this.resultObject.answer = this.askEminence.result;
          this.resultObject.keyword = tempObj.saveAskEminence.keyword;
          this.resultObject._id = tempObj.saveAskEminence._id;
        }
      },
      (error) => {
        this.spinner.hide();
        this.loading = false;
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
        console.error('Not data get', error);
        // setTimeout(() => {
        //   this.loading = false;
        //   // window.location.reload();
        // }, 2000);
      }
    );
  }

  editResult() {
    if (
      this.askEminence.result !== undefined &&
      this.askEminence.result !== ''
    ) {
      this.isTextareaDisabled = !this.isTextareaDisabled;
      this.saveIconVisibility = true;
      this.editIconVisibility = false;
      // this.isEditing = !this.isEditing;
    }
  }

  editAction() {
    console.log('Edit it');
  }

  saveIt() {
    Swal.fire({
      title: 'Are you sure to save changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes", trigger the save method
        this.saveChanges();
      } else {
      }
    });
  }
  saveChanges() {
    this.resultObject.answer = this.askEminence.result;
    this.resultObjectForEmail.answer = this.askEminence.result;
    console.log(this.resultObject);
    this.askEminence.question = '';
    this.askEminence.result = '';
    this.askEmininveService.askEminenceUpdate(this.resultObject).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Data saved successfully', '', {
          timeOut: 3000,
        });
        this.isTextareaDisabled = !this.isTextareaDisabled;
      },
      (error) => {
        this.toastr.success('Something went wrong', '', {
          timeOut: 3000,
        });
        console.error('Error updating data:', error);
      }
    );
  }

  deleteItem() {
    Swal.fire({
      title: 'Are you sure you want to delete this content?',
      text: 'The content should not be retrieved again.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, trigger the delete method
        this.deleteData();
      }
    });
  }

  deleteData() {
    this.askEminence.question = '';
    this.askEminence.result = '';
    this.askEmininveService.askEminencedelete(this.resultObject).subscribe(
      (response) => {
        console.log('Data deleted successfully:', response);
        this.toastr.success('Data deleted successfully', '', {
          timeOut: 3000,
        });
        this.isTextareaDisabled = !this.isTextareaDisabled;
      },
      (error) => {
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
        console.error('Error deleting data:', error);
      }
    );
  }

  showFileFormatDialog() {
    Swal.fire({
      title: 'Select file format',
      input: 'select',
      inputOptions: {
        text: 'Text',
        PDF: 'PDF',
      },
      inputPlaceholder: 'Select a format',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedFormat = result.value;
        this.resultObjectForEmail.type = result.value;
        this.emailSending();
      } else {
        // User clicked "Cancel" or closed the dialog
        // Do nothing or handle as needed
      }
    });
  }

  emailSending() {
    console.log('email http call');
    this.resultObjectForEmail.answer = this.askEminence.result;
    this.askEminence.question = '';
    this.askEminence.result = '';
    console.log(this.resultObjectForEmail);
    this.askEmininveService
      .askEminenceEmail(this.resultObjectForEmail)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success('Email sent successfully', '', {
            timeOut: 3000,
          });
          this.isTextareaDisabled = !this.isTextareaDisabled;
        },
        (error) => {
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
          console.error('Error deleting data:', error);
        }
      );
  }
}
