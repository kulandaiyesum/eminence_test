import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {

  constructor(public dialogRef: MatDialogRef<NotesComponent>) {}

  closeDialog() {
      this.dialogRef.close();
  }
}
