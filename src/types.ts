export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ContactInfoProps {
  icon: string;
  title: string;
  content: string;
  link?: string;
  ariaLabel?: string;
  class?: string;
}

export interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  required?: boolean;
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
  image: string;
  imageOriginal?: string;
  images?: string[];
  details: ProjectDetails;
}
