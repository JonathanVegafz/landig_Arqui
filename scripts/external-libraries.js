// Utilidad para cargar librerías externas de forma dinámica
export class ExternalLibraryLoader {
  static loadedLibraries = new Set();

  static async loadScrollReveal() {
    if (this.loadedLibraries.has('scrollreveal')) {
      return window.ScrollReveal;
    }

    return new Promise((resolve, reject) => {
      // Verificar si ya está cargado
      if (window.ScrollReveal) {
        this.loadedLibraries.add('scrollreveal');
        resolve(window.ScrollReveal);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        this.loadedLibraries.add('scrollreveal');
        
        // Configurar ScrollReveal con settings optimizados
        const sr = window.ScrollReveal({
          distance: '20px',
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          offset: 100,
        });
        
        resolve(sr);
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load ScrollReveal library'));
      };
      
      document.head.appendChild(script);
    });
  }

  static async loadGoogleFonts() {
    if (this.loadedLibraries.has('googlefonts')) {
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(fontLink);

    this.loadedLibraries.add('googlefonts');
  }
}

// Auto-cargar fuentes de Google
ExternalLibraryLoader.loadGoogleFonts();
