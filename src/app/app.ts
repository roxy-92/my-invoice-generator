
import { Component, computed, signal } from '@angular/core';

import { DEFAULT_INVOICE } from './data/default-data';
import { InvoiceCalculator } from './services/invoice-calculator';
import type { Invoice } from './models/invoice';

import { InvoiceForm } from './components/invoice-form/invoice-form';
import { InvoicePreview } from './components/invoice-preview/invoice-preview';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceForm, InvoicePreview],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  invoice = signal<Invoice>(structuredClone(DEFAULT_INVOICE));

  constructor(private calculator: InvoiceCalculator) {}

  totals = computed(() =>
    this.calculator.calculate(this.invoice())
  );

  dueDate = computed(() =>
    this.calculator.calculateDueDate(
      this.invoice().issueDate,
      this.invoice().dueDays
    )
  );

  taxNote = computed(() =>
    this.calculator.getTaxNote(this.invoice())
  );

  updateInvoice(updatedInvoice: Invoice): void {
    this.invoice.set(updatedInvoice);
  }
}
