import { Injectable } from '@angular/core';
import type { Invoice } from '../models/invoice';
import { TAX_RULES } from '../data/tax-rules';

export interface InvoiceTotals {
  subtotal: number;
  iva: number;
  irpf: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class InvoiceCalculator {
  calculate(invoice: Invoice): InvoiceTotals {
    const subtotal = this.round(invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice, 0
    ));
    const iva = this.round(subtotal * TAX_RULES[invoice.taxTreatment].iva);
    const irpf = this.round(subtotal * invoice.irpfRate / 100);
    return { subtotal, iva, irpf, total: this.round(subtotal + iva - irpf) };
  }

  calculateDueDate(issueDate: string, dueDays: number): string {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(issueDate)) return '';
    const [year, month, day] = issueDate.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (Number.isNaN(date.getTime())) return '';
    date.setUTCDate(date.getUTCDate() + dueDays);
    return date.toISOString().slice(0, 10);
  }

  getTaxNote(invoice: Invoice): string {
    return TAX_RULES[invoice.taxTreatment].note;
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
