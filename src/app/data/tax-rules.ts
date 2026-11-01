import type { TaxTreatment } from '../models/invoice';

export interface TaxRule { iva: number; note: string; }

// Reglas didácticas simplificadas. No determinan automáticamente la situación tributaria.
export const TAX_RULES: Record<TaxTreatment, TaxRule> = {
  standard: { iva: 0.21, note: '' },
  exempt: { iva: 0, note: 'Operación indicada como exenta de IVA. Verificar el fundamento legal aplicable.' },
  'reverse-charge': { iva: 0, note: 'Operación indicada con inversión del sujeto pasivo. Verificar requisitos y mención legal aplicable.' },
  'outside-scope': { iva: 0, note: 'Operación indicada como no sujeta a IVA español. Verificar localización y normativa aplicable.' }
};
