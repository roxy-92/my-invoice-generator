
import { Component, input, output } from '@angular/core';
import type { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss'
})
export class InvoiceForm {
  invoice = input.required<Invoice>();

  invoiceChange = output<Invoice>();

  
changeInvoiceNumber(): void {
  this.updateInvoice({
    ...this.invoice(),
    number: 'F-2026-002'
  });
}

  updateInvoice(updatedInvoice: Invoice): void {
    this.invoiceChange.emit(updatedInvoice);
  }
}
