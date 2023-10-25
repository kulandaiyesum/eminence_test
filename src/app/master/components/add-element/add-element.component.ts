import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Attributes } from '../../model/attributes.class';
import { SubjectService } from '../../service/subject.service';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss'],
})
export class AddElementComponent {
  attributes: Attributes = new Attributes();
  input: string;
  public subjectsList;
  public systemList;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddElementComponent>,
    private subjectService: SubjectService,
    private systemservice: SystemService
  ) {
    this.input = data.keywords[0];
  }

  ngOnInit(): void {
    this.getAllSubject();
    this.getAllSystem();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  getAllSystem() {
    this.systemservice.getAllSystems().subscribe((doc: any) => {
      this.systemList = doc.result;
    });
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      console.log(this.attributes);
    }
  }

  getAllSubject() {
    this.subjectService.getAllTopicMaster().subscribe(
      (response: any) => {
        this.subjectsList = response.result;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
