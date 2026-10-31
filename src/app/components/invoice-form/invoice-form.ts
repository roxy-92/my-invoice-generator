
import { Component, input, output, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import type {
  Invoice,
  PaymentMethod,
  TaxCategory
} from '../../models/invoice';

import { DEFAULT_CLIENTS } from '../../data/default-data';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.scss'
})
export class InvoiceForm implements OnInit {
  invoice = input.required<Invoice>();
  invoiceChange = output<Invoice>();

  private readonly fb = inject(FormBuilder);

  readonly clients = DEFAULT_CLIENTS;

  readonly paymentMethods: { value: PaymentMethod; label: string }[] = [
    { value: 'bank-transfer', label: 'Transferencia bancaria' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'stripe', label: 'Stripe' },
    { value: 'bizum', label: 'Bizum' }
  ];

  readonly taxCategories: { value: TaxCategory; label: string }[] = [
    { value: 'private', label: 'Particular (art. 20)' },
    { value: 'foreign-company', label: 'Empresa extranjera (art. 69)' },
    { value: 'spanish-exempt', label: 'Empresa España (art. 20)' },
    { value: 'spanish-standard', label: 'Empresa España (21 % IVA)' }
  ];

  form = this.fb.nonNullable.group({
    number: [''],
    issueDate: [''],
    dueDays: [30],
    clientId: ['patreon'],

    items: this.fb.array([
      this.fb.nonNullable.group({
        id: ['item-1'],
        description: [''],
        quantity: [1],
        unitPrice: [0]
      })
    ]),

    client: this.fb.nonNullable.group({
      name: [''],
      taxId: [''],
      address: [''],
      country: [''],
      taxCategory: this.fb.nonNullable.control<TaxCategory>('foreign-company')
    }),

    paymentMethod: ['bank-transfer' as PaymentMethod],

    issuer: this.fb.nonNullable.group({
      name: [''],
      taxId: [''],
      email: [''],
      address: [''],
      postalCode: [''],
      city: [''],
      province: [''],
      country: ['']
    })
  });

  get items(): FormArray {
    return this.form.controls.items;
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Selecciona una imagen PNG, JPG o WebP.');
      input.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('El logotipo no puede superar los 2 MB.');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const logo = reader.result;

      if (typeof logo !== 'string') return;

      this.invoiceChange.emit({
        ...this.invoice(),
        issuer: {
          ...this.invoice().issuer,
          logo
        }
      });
    };

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    const invoice = this.invoice();

    // Cargar los conceptos de la factura
    this.form.setControl(
      'items',
      this.fb.array(
        invoice.items.map(item =>
          this.fb.nonNullable.group({
            id: [item.id],
            description: [item.description],
            quantity: [item.quantity],
            unitPrice: [item.unitPrice]
          })
        )
      ),
      { emitEvent: false }
    );

    // Cargar los datos iniciales
    this.form.patchValue({
      number: invoice.number,
      issueDate: invoice.issueDate,
      dueDays: invoice.dueDays,
      clientId: invoice.client.id,
      paymentMethod: invoice.paymentMethod,

      issuer: {
        name: invoice.issuer.name,
        taxId: invoice.issuer.taxId,
        email: invoice.issuer.email,
        address: invoice.issuer.address,
        postalCode: invoice.issuer.postalCode,
        city: invoice.issuer.city,
        province: invoice.issuer.province,
        country: invoice.issuer.country
      },

      client: {
        name: invoice.client.name,
        taxId: invoice.client.taxId,
        address: invoice.client.address,
        country: invoice.client.country,
        taxCategory: invoice.client.taxCategory
      }
    }, { emitEvent: false });

    // Cambiar los datos al seleccionar otro cliente
    this.form.controls.clientId.valueChanges.subscribe(clientId => {
      const selectedClient = this.clients.find(
        client => client.id === clientId
      );

      if (!selectedClient) return;

      this.form.controls.client.patchValue({
        name: selectedClient.name,
        taxId: selectedClient.taxId,
        address: selectedClient.address,
        country: selectedClient.country,
        taxCategory: selectedClient.taxCategory
      }, { emitEvent: false });

      this.emitInvoice();
    });

    // Actualizar la factura cuando cambie cualquier campo
    this.form.valueChanges.subscribe(() => {
      this.emitInvoice();
    });
  }

  // Añadir un nuevo concepto a la factura
  addItem(): void {
    const newItem = this.fb.nonNullable.group({
      id: [crypto.randomUUID()],
      description: [''],
      quantity: [1],
      unitPrice: [0]
    });

    this.items.push(newItem);
  }

  
  removeItem(index: number): void {
    if (this.items.length <= 1) {
      return;
    }

    this.items.removeAt(index);
  }


  private emitInvoice(): void {
    const values = this.form.getRawValue();

    this.invoiceChange.emit({
      ...this.invoice(),
      number: values.number,
      issueDate: values.issueDate,
      dueDays: values.dueDays,
      paymentMethod: values.paymentMethod,
      items: values.items,

      issuer: {
        ...this.invoice().issuer,
        ...values.issuer
      },

      client: {
        id: values.clientId,
        ...values.client
      },

      taxCategory: values.client.taxCategory
    });
  }
}
