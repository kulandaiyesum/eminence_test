import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSystemCrudComponent } from './sub-system-crud.component';

describe('SubSystemCrudComponent', () => {
  let component: SubSystemCrudComponent;
  let fixture: ComponentFixture<SubSystemCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubSystemCrudComponent]
    });
    fixture = TestBed.createComponent(SubSystemCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
