declare module '*.astro' {
  const Component: unknown;
  export default Component;
}

// Declaraciones simples para importar imágenes optimizadas en frontmatter (.astro) y .ts.
declare module '*.webp' { const src: string; export default src; }
declare module '*.png' { const src: string; export default src; }
declare module '*.jpg' { const src: string; export default src; }

// Declaración para el módulo virtual astro:assets
declare module 'astro:assets' {
  export interface ImageFunction {
    (props: any): any;
  }
  
  export const Image: ImageFunction;
  export const Picture: ImageFunction;
  export function getImage(options: any): Promise<any>;
}

// Archivo de extensión de tipos custom. No se redefinen módulos virtuales de Astro para evitar conflictos.
