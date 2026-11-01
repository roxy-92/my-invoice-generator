
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvoicePdf {
  async export(): Promise<void> {
    window.print();
  }
}
