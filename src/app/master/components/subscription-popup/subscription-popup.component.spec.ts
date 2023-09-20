import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPopupComponent } from './subscription-popup.component';

describe('SubscriptionPopupComponent', () => {
  let component: SubscriptionPopupComponent;
  let fixture: ComponentFixture<SubscriptionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionPopupComponent]
    });
    fixture = TestBed.createComponent(SubscriptionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
