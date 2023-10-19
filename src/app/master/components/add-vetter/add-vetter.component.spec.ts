import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVetterComponent } from './add-vetter.component';

describe('AddVetterComponent', () => {
  let component: AddVetterComponent;
  let fixture: ComponentFixture<AddVetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVetterComponent]
    });
    fixture = TestBed.createComponent(AddVetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
