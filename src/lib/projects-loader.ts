import type { ProjectProps } from '../types';
import { getCollection, type CollectionEntry } from 'astro:content';
import { imageImportMap } from './static-image-map';

// Carga y transforma los proyectos desde content collections
export async function getProjects(): Promise<ProjectProps[]> {
  const entries = await getCollection('projects');
  const typedEntries = entries as CollectionEntry<'projects'>[];
  const data: ProjectProps[] = typedEntries
    .map(entry => entry.data)
    .sort((a, b) => a.id - b.id)
    .map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      category: project.category,
      area: project.area,
      image: imageImportMap[project.imageCard] || project.imageCard,
      imageOriginal: project.imageOriginal ? (imageImportMap[project.imageOriginal] || project.imageOriginal) : undefined,
      // Resolver imágenes de galería a URLs seguras (strings)
      images: project.images?.map((src: string) => {
        const mapped = imageImportMap[src as keyof typeof imageImportMap] as any;
        if (mapped && typeof mapped === 'object' && 'src' in mapped) return (mapped as { src: string }).src;
        if (typeof mapped === 'string') return mapped;
        return src;
      }),
      details: project.details,
    }));
  return data;
}

export async function getProjectById(id: number): Promise<ProjectProps | undefined> {
  const projects = await getProjects();
  return projects.find(p => p.id === id);
}

export async function getProjectsByCategory(category: string): Promise<ProjectProps[]> {
  const projects = await getProjects();
  if (category === 'todos') return projects;
  return projects.filter(p => p.category.toLowerCase() === category.toLowerCase());
}
