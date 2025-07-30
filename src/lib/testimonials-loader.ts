import testimonialsData from './testimonials.json';

export interface Testimonial {
  id: number;
  nombre: string;
  descripcion: string;
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData.testimonials;
}

export function getTestimonialById(id: number): Testimonial | undefined {
  const testimonials = getTestimonials();
  return testimonials.find(testimonial => testimonial.id === id);
} 