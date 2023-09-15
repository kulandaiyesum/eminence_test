import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsAboutUsComponent } from './contact-us-about-us.component';

describe('ContactUsAboutUsComponent', () => {
  let component: ContactUsAboutUsComponent;
  let fixture: ComponentFixture<ContactUsAboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsAboutUsComponent]
    });
    fixture = TestBed.createComponent(ContactUsAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
