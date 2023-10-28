import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VettedHistoryComponent } from './vetted-history.component';

describe('VettedHistoryComponent', () => {
  let component: VettedHistoryComponent;
  let fixture: ComponentFixture<VettedHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VettedHistoryComponent]
    });
    fixture = TestBed.createComponent(VettedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
