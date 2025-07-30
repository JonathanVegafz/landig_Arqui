// Tipos para componentes de Astro

export interface BaseProps {
  class?: string;
  id?: string;
}

export interface ImageProps extends BaseProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

export interface ContactInfoProps extends BaseProps {
  icon: string;
  title: string;
  content: string;
  link?: string;
  ariaLabel?: string;
}

export interface FormFieldProps extends BaseProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  icon?: string;
  errorId?: string;
}

export interface SectionHeaderProps extends BaseProps {
  subtitle: string;
  title: string;
  description?: string;
}

export interface ServiceCardProps extends BaseProps {
  icon: string;
  title: string;
  features: string[];
}

export interface TestimonialProps extends BaseProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export interface ProcessStepProps extends BaseProps {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceProps {
  id: number;
  title: string;
  icon: string;
  features: string[];
}

export interface ProjectDetails {
  ubicacion: string;
  duracion: string;
  superficie: string;
  habitaciones: string;
  baños: string;
  caracteristicas: string[];
  descripcionCompleta: string;
}

export interface ProjectProps {
  id: number;
  title: string;
  description: string;
  category: string;
  area: string;
  image: unknown; // Astro Image object
  imageOriginal?: unknown; // Astro Image object
  details: ProjectDetails;
}
