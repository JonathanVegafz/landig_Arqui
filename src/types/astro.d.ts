declare module '*.astro' {
  const Component: unknown;
  export default Component;
}

declare module 'astro:assets' {
  export const Image: unknown;
  export const Picture: unknown;
  export const getImage: unknown;
}

declare module 'astro:content' {
  export const getCollection: unknown;
  export const getEntry: unknown;
  export const getEntries: unknown;
}
