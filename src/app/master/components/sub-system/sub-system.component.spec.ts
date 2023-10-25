import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSystemComponent } from './sub-system.component';

describe('SubSystemComponent', () => {
  let component: SubSystemComponent;
  let fixture: ComponentFixture<SubSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubSystemComponent]
    });
    fixture = TestBed.createComponent(SubSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
