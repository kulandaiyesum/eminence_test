import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskeminenceComponent } from './askeminence.component';

describe('AskeminenceComponent', () => {
  let component: AskeminenceComponent;
  let fixture: ComponentFixture<AskeminenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskeminenceComponent]
    });
    fixture = TestBed.createComponent(AskeminenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
