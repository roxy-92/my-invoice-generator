
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const NIF_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
const CIF_CONTROL_LETTERS = 'JABCDEFGHI';

export const spanishTaxIdValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = String(control.value ?? '')
    .trim()
    .toUpperCase()
    .replace(/[\s.-]/g, '');

  if (!value) {
    return null;
  }

  // DNI: 8 números y letra de control
  if (/^\d{8}[A-Z]$/.test(value)) {
    const number = Number(value.slice(0, 8));
    const expected = NIF_LETTERS[number % 23];

    return value[8] === expected
      ? null
      : { spanishTaxId: true };
  }

  // NIE: X, Y o Z, 7 números y letra de control
  if (/^[XYZ]\d{7}[A-Z]$/.test(value)) {
    const prefix: Record<string, string> = {
      X: '0',
      Y: '1',
      Z: '2'
    };

    const number = Number(prefix[value[0]] + value.slice(1, 8));
    const expected = NIF_LETTERS[number % 23];

    return value[8] === expected
      ? null
      : { spanishTaxId: true };
  }

  // CIF: letra inicial, 7 números y control
  if (/^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/.test(value)) {
    const initial = value[0];
    const digits = value.slice(1, 8);
    const control = value[8];

    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
      const digit = Number(digits[i]);

      if (i % 2 === 0) {
        const doubled = digit * 2;
        sum += Math.floor(doubled / 10) + (doubled % 10);
      } else {
        sum += digit;
      }
    }

    const controlDigit = (10 - (sum % 10)) % 10;
    const controlLetter = CIF_CONTROL_LETTERS[controlDigit];

    const letterOnly = 'PQRSNW'.includes(initial);
    const digitOnly = 'ABEH'.includes(initial);

    const valid = letterOnly
      ? control === controlLetter
      : digitOnly
        ? control === String(controlDigit)
        : control === String(controlDigit) || control === controlLetter;

    return valid ? null : { spanishTaxId: true };
  }

  return { spanishTaxId: true };
};
