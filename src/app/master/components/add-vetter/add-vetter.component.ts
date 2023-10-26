import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Attributes } from '../../model/attributes.class';
import { UserService } from '../../service/user.service';
import { QgenService } from 'src/app/faculty/service/qgen.service';

@Component({
  selector: 'app-add-vetter',
  templateUrl: './add-vetter.component.html',
  styleUrls: ['./add-vetter.component.scss'],
})
export class AddVetterComponent implements OnInit {
  public input;
  public attributes: Attributes;
  public vettorList = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddVetterComponent>,
    public userService: UserService,
    private qgenService: QgenService
  ) {
    console.log(data);
  }
  ngOnInit(): void {
    this.attributes = new Attributes();
    this.getAllvettors();
    this.input = this.data.keywords[0];
    this.attributes.input = this.input;
    this.attributes.qgenid = this.data._id;
  }
  getAllvettors() {
    this.userService.getAllVetter().subscribe((doc: any) => {
      this.vettorList = doc.result;
      console.log(this.vettorList, 'ppppppppp');
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  submitForm(row) {
    if (row.valid) {
      console.log(this.attributes);
      this.qgenService.addAttributes(this.attributes).subscribe(
        (response: any) => {
          console.log(response);
          this.closeDialog();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
  getDetails(row) {
    console.log(row);
    let data = this.vettorList.find((x) => x._id === row);
    console.log(data.firstName);
    this.attributes.vetterName = data.firstName;
  }
}
