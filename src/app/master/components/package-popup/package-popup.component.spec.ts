import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePopupComponent } from './package-popup.component';

describe('PackagePopupComponent', () => {
  let component: PackagePopupComponent;
  let fixture: ComponentFixture<PackagePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagePopupComponent]
    });
    fixture = TestBed.createComponent(PackagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
