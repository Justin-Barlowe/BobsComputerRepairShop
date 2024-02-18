import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourzerofourComponent } from './fourzerofour.component';

describe('FourzerofourComponent', () => {
  let component: FourzerofourComponent;
  let fixture: ComponentFixture<FourzerofourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourzerofourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FourzerofourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
