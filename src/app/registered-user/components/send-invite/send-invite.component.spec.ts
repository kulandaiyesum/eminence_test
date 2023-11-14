import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInviteComponent } from './send-invite.component';

describe('SendInviteComponent', () => {
  let component: SendInviteComponent;
  let fixture: ComponentFixture<SendInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendInviteComponent]
    });
    fixture = TestBed.createComponent(SendInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
