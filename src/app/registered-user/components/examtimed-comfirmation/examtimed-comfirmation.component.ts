import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-examtimed-comfirmation',
  templateUrl: './examtimed-comfirmation.component.html',
  styleUrls: ['./examtimed-comfirmation.component.scss'],
})
export class ExamtimedComfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ExamtimedComfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) {
    console.log(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
