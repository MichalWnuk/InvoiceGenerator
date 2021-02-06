import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSettingsComponent } from './invoiceSettings.component';

describe('InvoiceSettingsComponent', () => {
  let component: InvoiceSettingsComponent;
  let fixture: ComponentFixture<InvoiceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
