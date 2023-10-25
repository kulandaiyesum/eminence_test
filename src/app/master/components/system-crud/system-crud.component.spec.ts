import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCrudComponent } from './system-crud.component';

describe('SystemCrudComponent', () => {
  let component: SystemCrudComponent;
  let fixture: ComponentFixture<SystemCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemCrudComponent]
    });
    fixture = TestBed.createComponent(SystemCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
