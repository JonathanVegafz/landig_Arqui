import type { Service } from '../models/Project';
import { getServices } from '../models/data';

export class ServiceController {
  /* Obtiene todos los servicios */
  static getAllServices(): Service[] {
    return getServices();
  }

  /* Obtiene un servicio por ID */
  static getServiceById(id: number): Service | undefined {
    const services = this.getAllServices();
    return services.find(service => service.id === id);
  }

  /* Obtiene servicios por características específicas */
  static getServicesByFeature(feature: string): Service[] {
    const services = this.getAllServices();
    return services.filter(service => 
      service.features.some(f => 
        f.toLowerCase().includes(feature.toLowerCase())
      )
    );
  }

  /* Obtiene todas las características disponibles */
  static getAllFeatures(): string[] {
    const services = this.getAllServices();
    const features = services.flatMap(service => service.features);
    return [...new Set(features)];
  }
} 