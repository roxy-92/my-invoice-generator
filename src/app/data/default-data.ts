import type { Client, Issuer, Invoice } from '../models/invoice';

export const DEFAULT_ISSUER: Issuer = {
  name: 'Roxana Ardelean',
  taxId: '12345678Z',
  email: 'demo@example.com',
  address: 'Calle de las Estrellas Errantes, 7',
  postalCode: '00000',
  city: 'Villa Lunaria',
  province: 'Reino de las Nubes',
  country: 'España',
  logo: 'images/logo-placeholder.png'
};

export const DEFAULT_CLIENTS: Client[] = [
  {
    id: 'patreon', type: 'company', name: 'Patreon', taxId: 'EU372009942',
    address: '600 Townsend Street, Suite 500, San Francisco, CA', country: 'Estados Unidos'
  },
  {
    id: 'private', type: 'private', name: '', taxId: '', address: '', country: 'España'
  }
];

export const DEFAULT_INVOICE: Invoice = {
  number: 'F-2026-001',
  issueDate: '2026-10-30',
  dueDays: 30,
  issuer: DEFAULT_ISSUER,
  client: DEFAULT_CLIENTS[0],
  items: [{ id: 'item-1', description: 'Servicios de ilustración digital', quantity: 1, unitPrice: 260.36 }],
  paymentMethod: 'bank-transfer',
  taxTreatment: 'outside-scope',
  irpfRate: 0
};
