import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoicesComponent } from './view-invoices.component';

describe('ViewInvoicesComponent', () => {
  let component: ViewInvoicesComponent;
  let fixture: ComponentFixture<ViewInvoicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInvoicesComponent]
    });
    fixture = TestBed.createComponent(ViewInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
