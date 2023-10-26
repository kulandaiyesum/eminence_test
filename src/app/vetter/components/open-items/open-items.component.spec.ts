import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenItemsComponent } from './open-items.component';

describe('ShowItemsComponent', () => {
  let component: OpenItemsComponent;
  let fixture: ComponentFixture<OpenItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenItemsComponent],
    });
    fixture = TestBed.createComponent(OpenItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
