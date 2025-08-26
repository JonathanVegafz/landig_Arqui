// Validation helpers (extraído de utils.ts)
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function isValidPhone(phone: string): boolean {
  // E.164 básico: opcional +, primer dígito 1-9, longitud total 8-15 dígitos
  return /^\+?[1-9]\d{7,14}$/.test(phone);
}
export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
