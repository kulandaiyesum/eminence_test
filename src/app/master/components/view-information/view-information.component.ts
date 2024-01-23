import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Institution } from '../../model/institution.class';

@Component({
  selector: 'app-view-information',
  templateUrl: './view-information.component.html',
  styleUrls: ['./view-information.component.scss'],
})
export class ViewInformationComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Institution
  ) {
    console.log(data);
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
