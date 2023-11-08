import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-examtimed-comfirmation',
  templateUrl: './examtimed-comfirmation.component.html',
  styleUrls: ['./examtimed-comfirmation.component.scss'],
})
export class ExamtimedComfirmationComponent {
  constructor(public dialogRef: MatDialogRef<ExamtimedComfirmationComponent>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
