/**
 * Funciones de validación para formularios y datos
 */

import { VALIDATION_RULES_WITH_REGEX as VALIDATION_RULES } from './constants-loader';

/**
 * Valida un campo de texto
 */
export function validateTextField(
  value: string, 
  minLength: number = VALIDATION_RULES.minNameLength, 
  maxLength: number = VALIDATION_RULES.maxNameLength
): { isValid: boolean; error?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Este campo es obligatorio' };
  }
  
  if (value.trim().length < minLength) {
    return { isValid: false, error: `Mínimo ${minLength} caracteres` };
  }
  
  if (value.length > maxLength) {
    return { isValid: false, error: `Máximo ${maxLength} caracteres` };
  }
  
  return { isValid: true };
}

/**
 * Valida un email
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'El email es obligatorio' };
  }
  
  if (!VALIDATION_RULES.email.test(email)) {
    return { isValid: false, error: 'Formato de email inválido' };
  }
  
  return { isValid: true };
}

/**
 * Valida un número de teléfono
 */
export function validatePhone(phone: string): { isValid: boolean; error?: string } {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'El teléfono es obligatorio' };
  }
  
  if (!VALIDATION_RULES.phone.test(phone)) {
    return { isValid: false, error: 'Formato de teléfono inválido' };
  }
  
  return { isValid: true };
}

/**
 * Valida un mensaje
 */
export function validateMessage(message: string): { isValid: boolean; error?: string } {
  if (!message || message.trim().length === 0) {
    return { isValid: false, error: 'El mensaje es obligatorio' };
  }
  
  if (message.trim().length < VALIDATION_RULES.minMessageLength) {
    return { isValid: false, error: `Mínimo ${VALIDATION_RULES.minMessageLength} caracteres` };
  }
  
  if (message.length > VALIDATION_RULES.maxMessageLength) {
    return { isValid: false, error: `Máximo ${VALIDATION_RULES.maxMessageLength} caracteres` };
  }
  
  return { isValid: true };
}

/**
 * Valida un formulario completo
 */
export interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: any;
}

export function validateForm(formData: FormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  // Validar nombre
  if (formData.name) {
    const nameValidation = validateTextField(formData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error!;
    }
  }
  
  // Validar email
  if (formData.email) {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!;
    }
  }
  
  // Validar teléfono
  if (formData.phone) {
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error!;
    }
  }
  
  // Validar mensaje
  if (formData.message) {
    const messageValidation = validateMessage(formData.message);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.error!;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Sanitiza datos de formulario
 */
export function sanitizeFormData(formData: FormData): FormData {
  const sanitized: FormData = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = value.trim();
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Valida una URL
 */
export function validateUrl(url: string): { isValid: boolean; error?: string } {
  if (!url || url.trim().length === 0) {
    return { isValid: false, error: 'La URL es obligatoria' };
  }
  
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Formato de URL inválido' };
  }
}

/**
 * Valida un número
 */
export function validateNumber(value: string, min?: number, max?: number): { isValid: boolean; error?: string } {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Debe ser un número válido' };
  }
  
  if (min !== undefined && num < min) {
    return { isValid: false, error: `Mínimo ${min}` };
  }
  
  if (max !== undefined && num > max) {
    return { isValid: false, error: `Máximo ${max}` };
  }
  
  return { isValid: true };
}
