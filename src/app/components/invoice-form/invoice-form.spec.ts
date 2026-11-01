import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceForm } from './invoice-form';
import { DEFAULT_INVOICE } from '../../data/default-data';

describe('InvoiceForm', () => {
  let component: InvoiceForm;
  let fixture: ComponentFixture<InvoiceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceForm);
    component = fixture.componentInstance;

    fixture.componentRef.setInput(
      'invoice',
      structuredClone(DEFAULT_INVOICE)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
