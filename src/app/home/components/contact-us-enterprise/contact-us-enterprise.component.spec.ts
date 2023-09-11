import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsEnterpriseComponent } from './contact-us-enterprise.component';

describe('ContactUsEnterpriseComponent', () => {
  let component: ContactUsEnterpriseComponent;
  let fixture: ComponentFixture<ContactUsEnterpriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsEnterpriseComponent]
    });
    fixture = TestBed.createComponent(ContactUsEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
