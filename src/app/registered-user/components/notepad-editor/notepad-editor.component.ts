import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';



@Component({
  selector: 'app-notepad-editor',
  templateUrl: './notepad-editor.component.html',
  styleUrls: ['./notepad-editor.component.scss'],
})
export class AppNotepadEditorComponent {
  @ViewChild('quillEditor') quillEditor: QuillEditorComponent;

  note: string = '';
  editor: Quill;
  minimized: boolean = false;


  constructor(private router: Router) {}

  onEditorCreated(event: Quill) {
    this.editor = event;
  }

  saveNote() {
    if (this.editor) {
      this.note = this.editor.root.innerHTML;
      console.log('Note saved:', this.note);
    }
  }
  toggleMinimize() {
    this.minimized = !this.minimized;
  }


  closeNotepad() {
    this.router.navigate(['/']);
  }
}
