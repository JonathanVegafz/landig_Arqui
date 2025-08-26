// Datos estructurados para SEO
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'IG Construcciones',
  description: 'Arquitectura y construcción en la V Región de Chile. Diseño, obras nuevas y eficiencia energética.',
  url: 'https://www.igconstruccionesspa.cl/',
  telephone: '+56945150212',
  email: 'Y.ordenes.t@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Maitencillo',
    addressRegion: 'V Región',
    addressCountry: 'CL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-32.5',
    longitude: '-71.5',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$',
  serviceType: ['Arquitectura', 'Construcción', 'Diseño'],
  areaServed: 'V Región, Chile',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Construcción',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Diseño Arquitectónico Personalizado',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Construcción de Obras Nuevas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Eficiencia Energética y Climatización',
        },
      },
    ],
  },
};

// Función para insertar datos estructurados
export function injectStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// Auto-inyectar si el DOM está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStructuredData);
} else {
  injectStructuredData();
}
