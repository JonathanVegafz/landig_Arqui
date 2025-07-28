import type { ContactInfo, CompanyInfo } from '../models/Project';
import { getContactInfo, getCompanyInfo } from '../models/data';

export class ContactController {
  /* Obtiene la información de contacto */
  static getContactInfo(): ContactInfo {
    return getContactInfo();
  }

  /* Obtiene la información de la empresa */
  static getCompanyInfo(): CompanyInfo {
    return getCompanyInfo();
  }

  /* Valida un formulario de contacto */
  static validateContactForm(formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push('El nombre es requerido');
    }

    if (!formData.email.trim()) {
      errors.push('El email es requerido');
    } else if (!this.isValidEmail(formData.email)) {
      errors.push('El email no es válido');
    }

    if (!formData.phone.trim()) {
      errors.push('El teléfono es requerido');
    }

    if (!formData.message.trim()) {
      errors.push('El mensaje es requerido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /* Valida formato de email */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /* Formatea número de teléfono */
  static formatPhoneNumber(phone: string): string {
    // Eliminar todos los caracteres no numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Formatear 
    if (cleaned.length === 9) {
      return `+56 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
    }
    
    return phone;
  }
} 