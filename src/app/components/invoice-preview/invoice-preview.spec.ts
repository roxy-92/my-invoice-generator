
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { InvoicePreview } from './invoice-preview';
import { DEFAULT_INVOICE } from '../../data/default-data';
import { InvoiceCalculator } from '../../services/invoice-calculator';

// Registrar los formatos españoles para las pruebas
registerLocaleData(localeEs, 'es-ES');

describe('InvoicePreview', () => {
  let component: InvoicePreview;
  let fixture: ComponentFixture<InvoicePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicePreview],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicePreview);
    component = fixture.componentInstance;

    const invoice = structuredClone(DEFAULT_INVOICE);
    const calculator = TestBed.inject(InvoiceCalculator);

    fixture.componentRef.setInput('invoice', invoice);

    fixture.componentRef.setInput(
      'dueDate',
      calculator.calculateDueDate(
        invoice.issueDate,
        invoice.dueDays
      )
    );

    fixture.componentRef.setInput(
      'totals',
      calculator.calculate(invoice)
    );

    fixture.componentRef.setInput(
      'taxNote',
      calculator.getTaxNote(invoice)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
