
import { Component, input } from '@angular/core';
import type { Invoice } from '../../models/invoice';
import type { InvoiceTotals } from '../../services/invoice-calculator';

@Component({
  selector: 'app-invoice-preview',
  standalone: true,
  imports: [],
  templateUrl: './invoice-preview.html',
  styleUrl: './invoice-preview.scss'
})
export class InvoicePreview {
  invoice = input.required<Invoice>();
  totals = input.required<InvoiceTotals>();
  dueDate = input.required<string>();
  taxNote = input.required<string>();
}
