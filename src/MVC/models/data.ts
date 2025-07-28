import type { Project, Service, Testimonial, ContactInfo, CompanyInfo } from './Project';
import imagen1 from '../../assets/imagen1.webp';
import imagen2 from '../../assets/imagen2.webp';
import imagen3 from '../../assets/imagen3.webp';
import imagen4 from '../../assets/imagen4.webp';
import imagen5 from '../../assets/imagen5.webp';

/* Datos de la empresa (Modelo) */
export const companyInfo: CompanyInfo = {
  name: 'IG Construcciones',
  description: 'Arquitectura y construcción en la V Región de Chile. Diseño, obras nuevas y eficiencia energética.',
  experience: '20+',
  projects: '100+',
  satisfaction: '100%',
  location: 'Maitencillo, V Región, Chile',
  services: ['Diseño Arquitectónico', 'Construcción', 'Eficiencia Energética']
};

/* Información de contacto (Modelo) */
export const contactInfo: ContactInfo = {
  phone: '+56945150212',
  email: 'contacto@igconstrucciones.cl',
  address: 'Maitencillo, V Región, Chile',
  whatsapp: 'https://wa.me/56945150212'
};

/* Proyectos (Modelo) */
export const projects: Project[] = [
  {
    id: 1,
    title: "Casa Moderna en Maitencillo",
    description: "Diseño arquitectónico contemporáneo con eficiencia energética",
    image: imagen1.src,
    category: "Residencial",
    area: "180m²"
  },
  {
    id: 2,
    title: "Oficinas Corporativas",
    description: "Espacios de trabajo optimizados con tecnología moderna",
    image: imagen2.src,
    category: "Comercial",
    area: "250m²"
  },
  {
    id: 3,
    title: "Casa de Playa",
    description: "Integración perfecta con el entorno costero",
    image: imagen3.src,
    category: "Residencial",
    area: "200m²"
  },
  {
    id: 4,
    title: "Centro Comercial",
    description: "Diseño funcional y atractivo para el comercio",
    image: imagen4.src,
    category: "Comercial",
    area: "500m²"
  },
  {
    id: 5,
    title: "Casa Sustentable",
    description: "Construcción eco-friendly con paneles solares",
    image: imagen5.src,
    category: "Residencial",
    area: "150m²"
  },
  {
    id: 6,
    title: "Edificio Residencial",
    description: "Complejo habitacional con amenities modernos",
    image: imagen1.src,
    category: "Residencial",
    area: "800m²"
  }
];

/* Servicios (Modelo) */
export const services: Service[] = [
  {
    id: 1,
    title: "Diseño Arquitectónico Personalizado",
    description: "Soluciones creativas y funcionales para cada proyecto",
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
    features: ["Planos detallados y renders 3D", "Optimización de espacios", "Integración con el entorno"]
  },
  {
    id: 2,
    title: "Construcción de Obras Nuevas",
    description: "Ejecución profesional con materiales de alta calidad",
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    features: ["Materiales de alta calidad", "Tecnologías modernas", "Supervisión profesional"]
  },
  {
    id: 3,
    title: "Eficiencia Energética y Climatización",
    description: "Soluciones sustentables para el futuro",
    icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M2 12h20"/><path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z"/></svg>',
    features: ["Aislamiento térmico", "Sistemas de climatización", "Energías renovables"]
  }
];

/* Testimonios (Modelo) */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'María López',
    description: 'Excelente servicio y atención personalizada. Desde el primer contacto, el equipo mostró una gran disposición para entender mis necesidades y plasmar mis ideas en el proyecto. El resultado final superó mis expectativas y sin duda volvería a contratarlos para futuros trabajos. Muy recomendados.',
    rating: 5
  },
  {
    id: 2,
    name: 'Carlos Pérez',
    description: 'El proyecto se entregó a tiempo y con una calidad excepcional. Me mantuvieron informado durante todo el proceso y resolvieron cada una de mis dudas con paciencia y profesionalismo. La atención al detalle fue evidente en cada etapa. ¡Gracias por su dedicación!',
    rating: 5
  },
  {
    id: 3,
    name: 'Ana Torres',
    description: 'Profesionales y atentos a cada detalle. Me sorprendió gratamente la creatividad de las soluciones propuestas y la eficiencia con la que ejecutaron la obra. El acompañamiento fue constante y siempre estuvieron abiertos a sugerencias y cambios.',
    rating: 5
  },
  {
    id: 4,
    name: 'Javier Ramírez',
    description: 'Contratar a este equipo fue la mejor decisión para mi remodelación. Cumplieron con los plazos, el presupuesto y la calidad prometida. Además, el trato humano y la comunicación fueron excelentes, lo que hizo todo el proceso mucho más sencillo y agradable.',
    rating: 5
  },
  {
    id: 5,
    name: 'Lucía Fernández',
    description: 'Estoy muy satisfecha con el trabajo realizado. Desde la planificación hasta la entrega final, demostraron compromiso, responsabilidad y pasión por lo que hacen. El resultado fue un espacio funcional, moderno y acogedor que superó mis expectativas.',
    rating: 5
  }
];

/* Funciones del modelo para obtener datos */
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'todos') return projects;
  return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
};

export const getServices = (): Service[] => {
  return services;
};

export const getTestimonials = (): Testimonial[] => {
  return testimonials;
};

export const getCompanyInfo = (): CompanyInfo => {
  return companyInfo;
};

export const getContactInfo = (): ContactInfo => {
  return contactInfo;
}; 