// scrollFade: aplica clase 'visible' usando onceVisible a elementos .scroll-fade
import { onceVisible } from './observer';

export function initScrollFade(root: Document | ParentNode = document) {
  const els = Array.from(root.querySelectorAll('.scroll-fade')) as HTMLElement[];
  els.forEach(el => onceVisible(el, () => el.classList.add('visible')));
  // Aparición suave del header (equivalente al delay anterior)
  const header = document.getElementById('main-header');
  if (header) setTimeout(() => { header.style.opacity = '1'; }, 150);
}

// Autoinit en carga o cuando el bundle se ejecute
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initScrollFade());
  } else {
    initScrollFade();
  }
}
