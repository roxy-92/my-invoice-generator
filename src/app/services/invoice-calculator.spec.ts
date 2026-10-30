import { TestBed } from '@angular/core/testing';
import { InvoiceCalculator } from './invoice-calculator';

describe('InvoiceCalculator', () => {
  let service: InvoiceCalculator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceCalculator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
