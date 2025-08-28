/**
 * Navegación suave para enlaces con hash
 * Maneja tanto navegación interna como externa con animaciones fluidas
 */

interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  easing?: (t: number) => number;
}

// Función de easing ease-in-out-cubic
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

/**
 * Realiza scroll suave a un elemento
 */
export function smoothScrollTo(target: Element, options: SmoothScrollOptions = {}): Promise<void> {
  const {
    duration = 800,
    offset = 0,
    easing = easeInOutCubic
  } = options;

  return new Promise((resolve) => {
    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = easing(progress);
      window.scrollTo(0, startPosition + (distance * ease));
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    }
    
    requestAnimationFrame(animation);
  });
}

/**
 * Maneja los clicks en enlaces con hash
 */
function handleHashNavigation(event: Event) {
  const link = event.target as HTMLAnchorElement;
  if (!link || link.tagName !== 'A') return;

  const href = link.getAttribute('href');
  if (!href || !href.includes('#')) return;

  const [pathname, hash] = href.split('#');
  
  // Si es un enlace a la misma página
  if (!pathname || pathname === window.location.pathname) {
    event.preventDefault();
    
    if (hash) {
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        // Offset para header fijo
        const headerOffset = 80;
        smoothScrollTo(targetElement, { offset: headerOffset });
        
        // Actualizar URL sin salto brusco
        history.pushState(null, '', `#${hash}`);
      }
    }
    return;
  }

  // Si es un enlace a otra página con hash (como /#galeria desde /proyecto/[id])
  if (pathname && pathname !== window.location.pathname) {
    // No prevenir el comportamiento por defecto, pero agregar una clase para transición
    document.body.classList.add('page-transitioning');
    
    // Opcional: agregar un pequeño delay para efecto visual
    setTimeout(() => {
      window.location.href = href;
    }, 100);
  }
}

/**
 * Maneja el scroll suave al cargar la página con hash
 */
function handlePageLoadHash() {
  const hash = window.location.hash;
  if (hash) {
    // Detectar si viene de otra página usando múltiples métodos
    const fromProject = sessionStorage.getItem('smoothScrollFromProject') === 'true';
    const isExternalNavigation = document.referrer && 
      !document.referrer.includes(window.location.origin + window.location.pathname);
    
    // Limpiar el flag del sessionStorage
    if (fromProject) {
      sessionStorage.removeItem('smoothScrollFromProject');
    }
    
    if (isExternalNavigation || fromProject) {
      // Si viene de otra página, hacer scroll suave desde el top
      setTimeout(() => {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          // Primero asegurar que estamos en el top
          window.scrollTo(0, 0);
          
          // Agregar efecto visual de carga
          document.body.classList.add('page-loading-with-hash');
          
          // Delay para mostrar el hero antes de hacer scroll
          setTimeout(() => {
            const headerOffset = 80;
            
            // Agregar clase visual para el elemento target
            targetElement.classList.add('hash-target');
            
            // Scroll suave desde el hero hasta el elemento
            smoothScrollTo(targetElement, { 
              offset: headerOffset,
              duration: 1400, // Duración más larga para la transición entre páginas
              easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // Easing más suave
            }).then(() => {
              // Remover clases después de la animación
              setTimeout(() => {
                targetElement.classList.remove('hash-target');
                document.body.classList.remove('page-loading-with-hash');
              }, 600);
            });
          }, 600); // Mostrar el hero por 600ms antes de hacer scroll
        }
      }, 100);
    } else {
      // Navegación interna normal (más rápida)
      setTimeout(() => {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          const headerOffset = 80;
          
          targetElement.classList.add('hash-target');
          
          smoothScrollTo(targetElement, { offset: headerOffset }).then(() => {
            setTimeout(() => {
              targetElement.classList.remove('hash-target');
            }, 600);
          });
        }
      }, 100);
    }
  }
}

/**
 * Inicializa la navegación suave
 */
export function initSmoothScroll() {
  // Detectar si viene de otra página con hash al cargar
  const hash = window.location.hash;
  const fromProject = sessionStorage.getItem('smoothScrollFromProject') === 'true';
  const isExternalNavigation = document.referrer && 
    !document.referrer.includes(window.location.origin + window.location.pathname);
  
  if (hash && (isExternalNavigation || fromProject)) {
    document.body.classList.add('page-loading-with-hash');
  }
  
  // Manejar clicks en enlaces
  document.addEventListener('click', handleHashNavigation);
  
  // Manejar carga inicial con hash
  handlePageLoadHash();
  
  // Manejar cambios en el hash (botón atrás/adelante)
  window.addEventListener('hashchange', handlePageLoadHash);
  
  // Remover clase de transición cuando se complete la carga
  window.addEventListener('load', () => {
    document.body.classList.remove('page-transitioning');
  });
}

// Auto-inicializar si estamos en el navegador
if (typeof window !== 'undefined') {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }
}