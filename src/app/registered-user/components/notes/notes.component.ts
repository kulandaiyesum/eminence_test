import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExamDataService } from '../../service/exam-data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  textareaContent: string = '';
  constructor(
    public dialogRef: MatDialogRef<NotesComponent>,
    private examdataService: ExamDataService
  ) {}

  ngOnInit(): void {
    // Retrieve the text content when the component initializes
    this.restoreTextContent();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  restoreTextContent(): void {
    const savedContent = this.examdataService.getTextContent();
    this.textareaContent = savedContent;
  }

  saveTextContent(): void {
    this.examdataService.setTextContent(this.textareaContent);
    this.closeDialog();
  }
}
