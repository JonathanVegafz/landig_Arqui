// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://JonathanVegafz.github.io',
  base: 'landig_Arqui',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['aos']
          }
        }
      },
      assetsInlineLimit: 4096
    },
    css: {
      devSourcemap: false
    },
    optimizeDeps: {
      include: ['aos']
    }
  },

});