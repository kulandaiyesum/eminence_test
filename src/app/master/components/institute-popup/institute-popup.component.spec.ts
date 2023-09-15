import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutePopupComponent } from './institute-popup.component';

describe('InstitutePopupComponent', () => {
  let component: InstitutePopupComponent;
  let fixture: ComponentFixture<InstitutePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutePopupComponent]
    });
    fixture = TestBed.createComponent(InstitutePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
