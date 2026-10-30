
export type TaxCategory =
  | 'private'
  | 'foreign-company'
  | 'spanish-exempt'
  | 'spanish-standard';

export type PaymentMethod =
  | 'bank-transfer'
  | 'paypal'
  | 'stripe'
  | 'bizum';

export interface Issuer {
  name: string;
  taxId: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  logo?: string;
}

export interface Client {
  id: string;
  name: string;
  taxId: string;
  address: string;
  country: string;
  taxCategory: TaxCategory;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  number: string;
  issueDate: string;
  dueDays: number;
  issuer: Issuer;
  client: Client;
  items: InvoiceItem[];
  paymentMethod: PaymentMethod;
  taxCategory: TaxCategory;
}
