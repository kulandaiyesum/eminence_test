import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QgenReceivedComponent } from './qgen-received.component';

describe('QgenReceivedComponent', () => {
  let component: QgenReceivedComponent;
  let fixture: ComponentFixture<QgenReceivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QgenReceivedComponent]
    });
    fixture = TestBed.createComponent(QgenReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
