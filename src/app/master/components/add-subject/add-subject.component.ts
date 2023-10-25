import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from '../../model/subject.class';
import { NgForm } from '@angular/forms';
import { SubjectService } from '../../service/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent {
  subjects: Subject = new Subject();
  buttonVisibility: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<AddSubjectComponent>,
    private subjectService: SubjectService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data != null) {
      this.buttonVisibility = false;
      this.subjects._id = data._id;

      this.subjects.subject = data.subject;
      console.log(this.subjects._id);
    } else {
      this.subjects._id = '';
    }
  }

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      console.log(this.subjects);
      this.subjectService.saveSubjectMaster(this.subjects).subscribe(
        (response) => {
          console.log(response);
          this.closeDialog();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.subjectService.updateTopicMaster(this.subjects).subscribe(
        (response) => {
          console.log(response);
          this.closeDialog();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
