import { Component, ViewChild, computed, signal } from '@angular/core';
import { DEFAULT_INVOICE } from './data/default-data';
import { InvoiceCalculator } from './services/invoice-calculator';
import { InvoicePdf } from './services/invoice-pdf';
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
  @ViewChild(InvoiceForm) private invoiceForm?: InvoiceForm;

  invoice = signal<Invoice>(structuredClone(DEFAULT_INVOICE));
  exportError = signal(false);

  constructor(
    private calculator: InvoiceCalculator,
    private invoicePdf: InvoicePdf
  ) {}

  totals = computed(() => this.calculator.calculate(this.invoice()));
  dueDate = computed(() => this.calculator.calculateDueDate(
    this.invoice().issueDate, this.invoice().dueDays
  ));
  taxNote = computed(() => this.calculator.getTaxNote(this.invoice()));

  updateInvoice(updatedInvoice: Invoice): void {
    this.invoice.set(updatedInvoice);
    this.exportError.set(false);
  }

  async exportPdf(): Promise<void> {
    if (!this.invoiceForm?.validateForExport()) {
      this.exportError.set(true);
      return;
    }
    this.exportError.set(false);
    await this.invoicePdf.export();
  }
}
