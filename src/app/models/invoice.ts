export type ClientType = 'private' | 'company';
export type TaxTreatment = 'standard' | 'exempt' | 'reverse-charge' | 'outside-scope';
export type PaymentMethod = 'bank-transfer' | 'paypal' | 'stripe' | 'bizum';

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
  type: ClientType;
  name: string;
  taxId: string;
  address: string;
  country: string;
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
  taxTreatment: TaxTreatment;
  irpfRate: number; // Porcentaje, por ejemplo 15 = 15 %
}
