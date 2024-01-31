import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Institution } from '../../model/institution.class';

@Component({
  selector: 'app-view-institution',
  templateUrl: './view-institution.component.html',
  styleUrls: ['./view-institution.component.scss'],
})
export class ViewInstitutionComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewInstitutionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Institution
  ) {
    console.log(data);
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
