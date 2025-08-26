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
