
import { Component, input, output, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import type {
  Invoice,
  PaymentMethod,
  TaxCategory
} from '../../models/invoice';

import { spanishTaxIdValidator } from '../../validators/spanish-tax-id.validator';

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
    number: ['', [Validators.required]],
    issueDate: ['', [Validators.required]],
    dueDays: [30, [Validators.required, Validators.min(0)]],

    items: this.fb.array([
      this.fb.nonNullable.group({
        id: ['item-1'],
        description: ['', [Validators.required]],
        quantity: [1, [Validators.required, Validators.min(1)]],
        unitPrice: [0, [Validators.required, Validators.min(0)]]
      })
    ]),

    client: this.fb.nonNullable.group({
      name: [''],
      taxId: [''],
      address: [''],
      country: [''],
      taxCategory: this.fb.nonNullable.control<TaxCategory>(
        'foreign-company'
      )
    }),

    paymentMethod: ['bank-transfer' as PaymentMethod],

    issuer: this.fb.nonNullable.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/.*\S.*/)
        ]
      ],
      taxId: [
        '',
        [
          Validators.required,
          spanishTaxIdValidator
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[a-zA-Z]{2,}$/
          )
        ]
      ],
      address: ['', [Validators.required]],
      postalCode: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(0[1-9]|[1-4][0-9]|5[0-2])[0-9]{3}$/
          )
        ]
      ],
      city: [''],
      province: [''],
      country: ['', [Validators.required]]
    })
  });

  get items(): FormArray {
    return this.form.controls.items;
  }

  get clientControls() {
    return this.form.controls.client.controls;
  }

  get isPrivateClient(): boolean {
    return this.clientControls.taxCategory.value === 'private';
  }

  get isSpanishCompany(): boolean {
    const category = this.clientControls.taxCategory.value;

    return category === 'spanish-exempt' ||
      category === 'spanish-standard';
  }

  // VALIDACIONES DINÁMICAS DEL CLIENTE
  private updateClientValidators(category: TaxCategory): void {
    const { name, taxId, address, country } = this.clientControls;

    if (category === 'private') {
      name.clearValidators();
      taxId.clearValidators();
      address.clearValidators();
      country.clearValidators();
    } else {
      const requiredText = [
        Validators.required,
        Validators.pattern(/.*\S.*/)
      ];

      name.setValidators(requiredText);
      address.setValidators(requiredText);
      country.setValidators(requiredText);

      if (
        category === 'spanish-exempt' ||
        category === 'spanish-standard'
      ) {
        taxId.setValidators([
          Validators.required,
          spanishTaxIdValidator
        ]);
      } else {
        taxId.setValidators(requiredText);
      }
    }

    name.updateValueAndValidity({ emitEvent: false });
    taxId.updateValueAndValidity({ emitEvent: false });
    address.updateValueAndValidity({ emitEvent: false });
    country.updateValueAndValidity({ emitEvent: false });

    this.form.controls.client.updateValueAndValidity({
      emitEvent: false
    });
  }

  // CARGAR LOGOTIPO
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

    // CARGAR LOS CONCEPTOS
    this.form.setControl(
      'items',
      this.fb.array(
        invoice.items.map(item =>
          this.fb.nonNullable.group({
            id: [item.id],
            description: [
              item.description,
              [Validators.required]
            ],
            quantity: [
              item.quantity,
              [Validators.required, Validators.min(1)]
            ],
            unitPrice: [
              item.unitPrice,
              [Validators.required, Validators.min(0)]
            ]
          })
        )
      ),
      { emitEvent: false }
    );

    // CARGAR LOS DATOS INICIALES
    this.form.patchValue({
      number: invoice.number,
      issueDate: invoice.issueDate,
      dueDays: invoice.dueDays,
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

    // APLICAR VALIDACIONES INICIALES
    this.updateClientValidators(
      this.clientControls.taxCategory.value
    );

    // ACTUALIZAR VALIDACIONES AL CAMBIAR EL ÁMBITO FISCAL
    this.clientControls.taxCategory.valueChanges.subscribe(category => {
      this.updateClientValidators(category);
    });

    // ACTUALIZAR LA FACTURA Y LA VISTA PREVIA
    this.form.valueChanges.subscribe(() => {
      this.emitInvoice();
    });
  }

  // AÑADIR CONCEPTO
  addItem(): void {
    const newItem = this.fb.nonNullable.group({
      id: [crypto.randomUUID()],
      description: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    });

    this.items.push(newItem);
  }

  // ELIMINAR CONCEPTO
  removeItem(index: number): void {
    if (this.items.length <= 1) return;

    this.items.removeAt(index);
  }

  // EMITIR FACTURA ACTUALIZADA
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
        ...this.invoice().client,
        id: 'manual-client',
        ...values.client
      },

      taxCategory: values.client.taxCategory
    });
  }
}
