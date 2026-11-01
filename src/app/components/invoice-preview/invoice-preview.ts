import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import type { Invoice } from '../../models/invoice';
import type { InvoiceTotals } from '../../services/invoice-calculator';
import { TAX_RULES } from '../../data/tax-rules';

@Component({
  selector: 'app-invoice-preview',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './invoice-preview.html',
  styleUrl: './invoice-preview.scss'
})
export class InvoicePreview {
  invoice = input.required<Invoice>();
  totals = input.required<InvoiceTotals>();
  dueDate = input.required<string>();
  taxNote = input.required<string>();

  get ivaRate(): number {
    return TAX_RULES[this.invoice().taxTreatment].iva * 100;
  }

  get irpfRate(): number {
    return this.invoice().irpfRate;
  }
}
