/**
 * Este archivo define las constantes y configuraciones
 * 
 */

export const MVC_CONFIG = {
  // Configuración de la empresa
  COMPANY: {
    NAME: 'IG Construcciones',
    DESCRIPTION: 'Arquitectura y construcción en la V Región de Chile',
    LOCATION: 'Maitencillo, V Región, Chile',
    PHONE: '+56945150212',
    EMAIL: 'contacto@igconstrucciones.cl',
    WHATSAPP: 'https://wa.me/56945150212'
  },

  // Configuración de SEO
  SEO: {
    DEFAULT_TITLE: 'IG Construcciones - Arquitectura y Construcción en la V Región',
    DEFAULT_DESCRIPTION: 'IG Construcciones: Arquitectura y construcción en la V Región. Diseño, obras nuevas y eficiencia energética.',
    CANONICAL_URL: 'https://igconstrucciones.cl/',
    LOCALE: 'es_CL',
    TYPE: 'website'
  },

  // Configuración de categorías
  CATEGORIES: {
    RESIDENTIAL: 'Residencial',
    COMMERCIAL: 'Comercial',
    ALL: 'todos'
  },

  // Configuración de servicios
  SERVICES: {
    ARCHITECTURAL_DESIGN: 'Diseño Arquitectónico Personalizado',
    CONSTRUCTION: 'Construcción de Obras Nuevas',
    ENERGY_EFFICIENCY: 'Eficiencia Energética y Climatización'
  },

  // Configuración de validación
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    MIN_MESSAGE_LENGTH: 10,
    MAX_MESSAGE_LENGTH: 1000
  },

  // Configuración de animaciones
  ANIMATIONS: {
    DURATION: 800,
    EASING: 'ease-in-out',
    OFFSET: 100
  }
};

/**
 * Tipos de datos para el patrón MVC
 */
export interface MVCModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MVCController {
  getAll(): any[];
  getById(id: number): any | undefined;
  create(data: any): any;
  update(id: number, data: any): any;
  delete(id: number): boolean;
}

export interface MVCView {
  render(data: any): string;
  update(data: any): void;
} 