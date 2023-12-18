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
  updateValueMappingIDForSubsystem: string;
  updateValueMappingIDForSubject: string;

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
    this.input = data.keywords[0];
    this.attributes.input = this.input;
    this.attributes.qgenid = data._id;
    if (data.subSystemId) {
      this.updateValueMappingIDForSubsystem = data.subSystemId;
      // console.log(this.updateValueMappingIDForSubsystem);
    }
    if (data.subjectId) {
      this.updateValueMappingIDForSubject = data.subjectId;
    }
  }

  ngOnInit(): void {
    this.getAllSubject();
    this.getAllSystem();
    this.getAllsubSystems();
    console.log(this.data);
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
      this.qgenService.addAttributes(this.attributes).subscribe(
        (response: any) => {
          this.toastr.success('Attributes assigned', '', {
            timeOut: 3000,
          });
          this.closeDialog();
        },
        (error) => {
          console.error('Error:', error);
          this.toastr.error('Something went wrong', '', {
            timeOut: 3000,
          });
        }
      );
    }
  }

  getAllSubject() {
    this.subjectService.getAllTopicMaster().subscribe(
      (response: any) => {
        this.subjectsList = response.result;
        if (this.updateValueMappingIDForSubject) {
          const foundObject = this.subjectsList.find(
            (item) => item._id === this.updateValueMappingIDForSubject
          );
          // console.log(foundObject.subject);
          if (foundObject) {
            this.attributes.subjectId = foundObject._id; // Set the subject ID
          }
        }
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
        if (this.updateValueMappingIDForSubsystem) {
          const foundObject = this.subsystemList.find(
            (item) => item._id === this.updateValueMappingIDForSubsystem
          );
          console.log(foundObject, 'pppppppppppp');

          // console.log(foundObject);
          // console.log(foundObject.subSystem);
          // console.log(foundObject.systemId.system);
          if (foundObject.systemId._id) {
            this.attributes.system = foundObject.systemId._id;
            this.onSystemChange();
          }
          if (foundObject._id) {
            this.attributes.subSystemId = foundObject._id;
          }
        }
      },
      (err: any) => {
        this.toastr.error(err.error.message, '', {
          timeOut: 3000,
        });
      }
    );
  }

  onSystemChange() {
    const matchingItems = this.subsystemList.filter(
      (item) => item.systemId._id === this.attributes.system
    );
    this.subsystemOptions = matchingItems;
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
}
