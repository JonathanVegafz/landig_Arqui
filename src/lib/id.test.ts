import { describe, it, expect } from 'vitest';
import { generateId } from './validation';

describe('generateId', () => {
  it('genera ids únicos con longitud suficiente', () => {
    const a = generateId();
    const b = generateId();
    expect(a).not.toBe(b);
    expect(a.length).toBeGreaterThan(8);
  });
});
