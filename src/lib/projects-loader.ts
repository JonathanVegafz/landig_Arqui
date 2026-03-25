import type { ProjectProps } from '../types';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

type ImportedAsset = ImageMetadata | string;

const assetModules = import.meta.glob('../assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
}) as Record<string, ImportedAsset>;

function resolveAssetPath(contentPath: string): ImportedAsset | string {
  const key = contentPath.replace('../../assets/', '../assets/');
  return assetModules[key] ?? contentPath;
}

function toPublicSrc(asset: ImportedAsset | string): string {
  if (asset && typeof asset === 'object' && 'src' in asset) {
    return asset.src;
  }
  return asset;
}

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
      image: resolveAssetPath(project.imageCard),
      ...(project.imageOriginal
        ? { imageOriginal: toPublicSrc(resolveAssetPath(project.imageOriginal)) }
        : {}),
      // Resolver imágenes de galería a URLs públicas aptas para <img>
      ...(project.images
        ? { images: project.images.map((src: string) => toPublicSrc(resolveAssetPath(src))) }
        : {}),
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
