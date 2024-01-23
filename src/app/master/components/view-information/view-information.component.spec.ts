import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInformationComponent } from './view-information.component';

describe('ViewInformationComponent', () => {
  let component: ViewInformationComponent;
  let fixture: ComponentFixture<ViewInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInformationComponent]
    });
    fixture = TestBed.createComponent(ViewInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
