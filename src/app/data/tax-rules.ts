
import type { TaxCategory } from '../models/invoice';

export interface TaxRule {
  iva: number;
  irpf: number;
  note: string;
}

export const TAX_RULES: Record<TaxCategory, TaxRule> = {
  private: {
    iva: 0,
    irpf: 0,
    note: 'Prestación de servicios EXENTA, según artículo 20.1.26º de la Ley del IVA.'
  },

  'foreign-company': {
    iva: 0,
    irpf: 0,
    note: 'Operación no sujeta al IVA conforme al artículo 69 de la Ley 37/1992 del IVA.'
  },

  'spanish-exempt': {
    iva: 0,
    irpf: 0.15,
    note: 'Prestación de servicios EXENTA, según artículo 20.1.26º de la Ley del IVA.'
  },

  'spanish-standard': {
    iva: 0.21,
    irpf: 0.15,
    note: ''
  }
};
