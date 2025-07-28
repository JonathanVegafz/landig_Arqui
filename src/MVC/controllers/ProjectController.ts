import type { Project } from '../models/Project';
import { getProjectsByCategory } from '../models/data';

export class ProjectController {
  /* Obtiene todos los proyectos */
  static getAllProjects(): Project[] {
    return getProjectsByCategory('todos');
  }

  /* Obtiene proyectos por categoría */
  static getProjectsByCategory(category: string): Project[] {
    return getProjectsByCategory(category);
  }

  /* Obtiene un proyecto por ID */
  static getProjectById(id: number): Project | undefined {
    const projects = this.getAllProjects();
    return projects.find(project => project.id === id);
  }

  /* Obtiene las categorías disponibles */
  static getCategories(): string[] {
    const projects = this.getAllProjects();
    const categories = [...new Set(projects.map(project => project.category))];
    return ['todos', ...categories.map(cat => cat.toLowerCase())];
  }

  /* Filtra proyectos por múltiples criterios */
  static filterProjects(filters: {
    category?: string;
    minArea?: number;
    maxArea?: number;
  }): Project[] {
    let projects = this.getAllProjects();

    if (filters.category && filters.category !== 'todos') {
      projects = projects.filter(project => 
        project.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.minArea) {
      projects = projects.filter(project => {
        const area = parseInt(project.area.replace('m²', ''));
        return area >= filters.minArea!;
      });
    }

    if (filters.maxArea) {
      projects = projects.filter(project => {
        const area = parseInt(project.area.replace('m²', ''));
        return area <= filters.maxArea!;
      });
    }

    return projects;
  }
} 