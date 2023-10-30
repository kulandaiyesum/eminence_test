import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Attributes } from '../../model/attributes.class';
import { UserService } from '../../service/user.service';
import { QgenService } from 'src/app/faculty/service/qgen.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-vetter',
  templateUrl: './add-vetter.component.html',
  styleUrls: ['./add-vetter.component.scss'],
})
export class AddVetterComponent implements OnInit {
  public input;
  public attributes: Attributes;
  public vettorList = [];
  public updateValueMappingIDForVetter: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddVetterComponent>,
    public userService: UserService,
    private qgenService: QgenService,
    private toastr: ToastrService,
  ) {
    console.log(data);
    if(data.vetterId){
      console.log("Update pannu pa");
      this.updateValueMappingIDForVetter=data.vetterId
    }
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
      if (this.updateValueMappingIDForVetter) {
        console.log(this.updateValueMappingIDForVetter);
        const foundObject = this.vettorList.find(
          (item) => item._id === this.updateValueMappingIDForVetter
        );
        console.log(foundObject);
        if (foundObject) {
          this.attributes.vetterId=foundObject._id
        }
      }

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
          this.toastr.success('Vetter assigned', '', {
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
  getDetails(row) {
    console.log(row);
    let data = this.vettorList.find((x) => x._id === row);
    console.log(data.firstName);
    this.attributes.vetterName = data.firstName;
  }
}
