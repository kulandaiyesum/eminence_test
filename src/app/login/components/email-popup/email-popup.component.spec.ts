import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPopupComponent } from './email-popup.component';

describe('EmailPopupComponent', () => {
  let component: EmailPopupComponent;
  let fixture: ComponentFixture<EmailPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailPopupComponent]
    });
    fixture = TestBed.createComponent(EmailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
