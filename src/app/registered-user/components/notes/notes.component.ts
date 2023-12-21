import { Component, EventEmitter, Output } from '@angular/core';
import { ExamDataService } from '../../service/exam-data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  @Output() closeNotepad = new EventEmitter<any>();
  textareaContent: string = '';
  constructor(private examdataService: ExamDataService) {}

  ngOnInit(): void {
    // Retrieve the text content when the component initializes
    this.restoreTextContent();
  }

  closeDialog() {
    this.closeNotepad.emit('close notepad');
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
