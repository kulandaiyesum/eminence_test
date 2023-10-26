import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Attributes } from '../../model/attributes.class';
import { SubjectService } from '../../service/subject.service';
import { SystemService } from '../../service/system.service';
import { SubSystemService } from '../../service/sub-system.service';
import { QgenService } from 'src/app/faculty/service/qgen.service';

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
  public subsystemOptions: any[] = [];
  subsystemList: any[] = [];
  systemOptions: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddElementComponent>,
    private subjectService: SubjectService,
    private systemservice: SystemService,
    private subSystemServeice: SubSystemService,
    private qgenService: QgenService
  ) {
    console.log(data);
    this.input = data.keywords[0];
    this.attributes.input = this.input;
    this.attributes.qgenid = data._id;
  }

  ngOnInit(): void {
    this.getAllSubject();
    this.getAllSystem();
    this.getAllsubSystems();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  getAllSystem() {
    this.systemservice.getAllSystems().subscribe((doc: any) => {
      this.systemList = doc.result;
      console.log(this.systemList);
    });
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      console.log(this.attributes);
      this.qgenService.addAttributes(this.attributes).subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
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

  getAllsubSystems() {
    this.subSystemServeice.getAllsubSystems().subscribe(
      (data: any) => {
        this.subsystemList = data.result;
        console.log(this.subsystemList);
      },
      (err: any) => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  onSystemChange() {
    // When the system selection changes, reset the sub-system selection.

    console.log('System selected  ' + this.attributes.system);
    const matchingItems = this.subsystemList.filter(
      (item) => item.systemId._id === this.attributes.system
    );

    this.subsystemOptions = matchingItems;
    console.log(this.subsystemOptions);

    // Check if matchingItems were found and log them
    if (matchingItems.length > 0) {
      console.log(matchingItems);
    } else {
      console.log(`Data not found for ID:`);
    }
  }

  getSubSystemsBySystem(): any[] {
    // Implement a function to filter sub-systems based on the selected system.
    return this.subsystemList.filter(
      (subsystem) => subsystem.systemId.system === this.attributes.system
    );
  }
  // getSubSystemsBySystem(): string[] {
  //   // Implement a function to filter sub-systems based on the selected system.
  //   if (this.attributes.system === 'History') {
  //     return this.subsystemList
  //       .filter((subsystem) => subsystem.systemId.system === 'History')
  //       .map((subsystem) => subsystem.subSystem);
  //   } else if (this.attributes.system === 'Science') {
  //     return this.subsystemList
  //       .filter((subsystem) => subsystem.systemId.system === 'Science')
  //       .map((subsystem) => subsystem.subSystem);
  //   } else if (this.attributes.system === 'Maths') {
  //     return this.subsystemList
  //       .filter((subsystem) => subsystem.systemId.system === 'Maths')
  //       .map((subsystem) => subsystem.subSystem);
  //   } else {
  //     return []; // Return an empty array if no system is selected or not found.
  //   }
  // }
}
