import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPhone } from './validation';

describe('validation utils', () => {
  it('valida emails correctos', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });
  it('rechaza emails inválidos', () => {
    expect(isValidEmail('test@@example..com')).toBe(false);
  });
  it('valida teléfonos chilenos correctos', () => {
    expect(isValidPhone('+56945150212')).toBe(true);
  });
  it('rechaza teléfonos inválidos', () => {
    expect(isValidPhone('12345')).toBe(false);
  });
});
