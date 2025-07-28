/**
 * Interfaces y tipos de datos para el proyecto IG Construcciones
 * 
 * Este archivo define todas las estructuras de datos utilizadas
 * en el patrón MVC del proyecto
 */

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'Residencial' | 'Comercial';
  area: string;
  features?: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  description: string;
  rating?: number;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
}

export interface CompanyInfo {
  name: string;
  description: string;
  experience: string;
  projects: string;
  satisfaction: string;
  location: string;
  services: string[];
}
