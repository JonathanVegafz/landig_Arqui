import projectsData from './projects.json';
import type { ProjectProps } from '../types';

// Importar las imágenes
import imagen1Card from '../assets/optimized/imagen1-card.webp';
import imagen1Original from '../assets/optimized/imagen1-original.webp';
import imagen2Card from '../assets/optimized/imagen2-card.webp';
import imagen2Original from '../assets/optimized/imagen2-original.webp';
import imagen3Card from '../assets/optimized/imagen3-card.webp';
import imagen3Original from '../assets/optimized/imagen3-original.webp';
import imagen4Card from '../assets/optimized/imagen4-card.webp';
import imagen4Original from '../assets/optimized/imagen4-original.webp';
import imagen5Card from '../assets/optimized/imagen5-card.webp';
import imagen5Original from '../assets/optimized/imagen5-original.webp';

// Mapeo de imágenes
const imageMap = {
  '/src/assets/optimized/imagen1-card.webp': imagen1Card,
  '/src/assets/optimized/imagen1-original.webp': imagen1Original,
  '/src/assets/optimized/imagen2-card.webp': imagen2Card,
  '/src/assets/optimized/imagen2-original.webp': imagen2Original,
  '/src/assets/optimized/imagen3-card.webp': imagen3Card,
  '/src/assets/optimized/imagen3-original.webp': imagen3Original,
  '/src/assets/optimized/imagen4-card.webp': imagen4Card,
  '/src/assets/optimized/imagen4-original.webp': imagen4Original,
  '/src/assets/optimized/imagen5-card.webp': imagen5Card,
  '/src/assets/optimized/imagen5-original.webp': imagen5Original,
};

export function getProjects(): ProjectProps[] {
  return projectsData.projects.map(project => ({
    ...project,
    image: imageMap[project.imageCard as keyof typeof imageMap],
    imageOriginal: imageMap[project.imageOriginal as keyof typeof imageMap],
  }));
}

export function getProjectById(id: number): ProjectProps | undefined {
  const projects = getProjects();
  return projects.find(project => project.id === id);
}

export function getProjectsByCategory(category: string): ProjectProps[] {
  const projects = getProjects();
  if (category === 'todos') {
    return projects;
  }
  return projects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  );
} 