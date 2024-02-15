import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLandingComponent } from './employee-landing.component';

describe('EmployeeLandingComponent', () => {
  let component: EmployeeLandingComponent;
  let fixture: ComponentFixture<EmployeeLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeLandingComponent]
    });
    fixture = TestBed.createComponent(EmployeeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
