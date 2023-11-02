import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadEditorComponent } from './notepad-editor.component';

describe('NotepadEditorComponent', () => {
  let component: NotepadEditorComponent;
  let fixture: ComponentFixture<NotepadEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotepadEditorComponent]
    });
    fixture = TestBed.createComponent(NotepadEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
