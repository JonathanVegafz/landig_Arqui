import { describe, it, expect } from 'vitest';
import { formatPhone, sanitizeText, capitalizeWords, truncateText, formatDate } from './format';

describe('format utilities', () => {
  it('formatea teléfono chileno +56', () => {
    expect(formatPhone('+56945150212')).toBe('+56 94 515 0212');
  });
  it('devuelve input si no calza formato esperado', () => {
    expect(formatPhone('12345')).toBe('12345');
  });
  it('sanitiza caracteres especiales', () => {
    expect(sanitizeText('<script>alert("x")</script>&')).toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&amp;');
  });
  it('capitaliza palabras', () => {
    expect(capitalizeWords('hola MUNDO prueba')).toBe('Hola Mundo Prueba');
  });
  it('trunca texto agregando puntos suspensivos', () => {
    expect(truncateText('abcdefghij', 5)).toBe('abcde...');
  });
  it('no trunca si longitud menor', () => {
    expect(truncateText('abcd', 10)).toBe('abcd');
  });
  it('formatea fecha en es-CL', () => {
    const d = new Date('2024-03-15T00:00:00Z');
    const out = formatDate(d);
    expect(out.toLowerCase()).toContain('2024');
  });
});
