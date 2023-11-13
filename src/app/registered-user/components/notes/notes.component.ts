import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  dialogRef: any;
  constructor(private dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
