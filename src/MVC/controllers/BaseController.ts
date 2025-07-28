import type { MVCModel, MVCController } from '../../config/mvc';

/* Controlador base que implementa operaciones CRUD básicas */
export abstract class BaseController<T extends MVCModel> implements MVCController {
  protected data: T[] = [];

  constructor(initialData: T[] = []) {
    this.data = initialData;
  }

  /* Obtiene todos los elementos   */
  getAll(): T[] {
    return [...this.data];
  }

  /* Obtiene un elemento por ID   */
  getById(id: number): T | undefined {
    return this.data.find(item => item.id === id);
  }

  /* Crea un nuevo elemento */
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const newItem: T = {
      ...data,
      id: this.getNextId(),
      createdAt: new Date(),
      updatedAt: new Date()
    } as T;
    
    this.data.push(newItem);
    return newItem;
  }

  /* Actualiza un elemento existente */
  update(id: number, data: Partial<Omit<T, 'id' | 'createdAt'>>): T | undefined {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return undefined;

    const updatedItem: T = {
      ...this.data[index],
      ...data,
      updatedAt: new Date()
    } as T;

    this.data[index] = updatedItem;
    return updatedItem;
  }

  /* Elimina un elemento */
  delete(id: number): boolean {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    return true;
  }

  /* Filtra elementos por criterios */
  filter(criteria: Partial<T>): T[] {
    return this.data.filter(item => {
      return Object.entries(criteria).every(([key, value]) => {
        return item[key as keyof T] === value;
      });
    });
  }

  /* Ordena elementos por una propiedad */
  sort(property: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...this.data].sort((a, b) => {
      const aValue = a[property];
      const bValue = b[property];
      
      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  /* Obtiene el siguiente ID disponible */
  private getNextId(): number {
    const maxId = Math.max(...this.data.map(item => item.id), 0);
    return maxId + 1;
  }

  /* Obtiene el número total de elementos */
  getCount(): number {
    return this.data.length;
  }

  /* Verifica si existe un elemento con el ID especificado */
  exists(id: number): boolean {
    return this.data.some(item => item.id === id);
  }
} 