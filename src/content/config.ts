import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    area: z.string(),
    imageCard: z.string(),
    imageOriginal: z.string().optional(),
    details: z.object({
      ubicacion: z.string(),
      duracion: z.string(),
      superficie: z.string(),
      habitaciones: z.string(),
      baños: z.string(),
      caracteristicas: z.array(z.string()),
      descripcionCompleta: z.string()
    })
  })
});

export const collections = { projects };
