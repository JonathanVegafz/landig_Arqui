// Observer centralizado (plan 1.3)
// Uso: import { onceVisible } from '../lib/interactions/observer';

const callbacks = new Map<Element, () => void>();

let io: IntersectionObserver | null = null;

function getObserver() {
  if (io) return io;
  if ('IntersectionObserver' in globalThis) {
    io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const cb = callbacks.get(e.target);
            if (cb) {
              cb();
              callbacks.delete(e.target);
            }
          io?.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });
  }
  return io;
}

export function onceVisible(el: Element, cb: () => void) {
  const observer = getObserver();
  if (!observer) { // fallback inmediato
    cb();
    return;
  }
  callbacks.set(el, cb);
  observer.observe(el);
}

export function resetObserverForTests() {
  io?.disconnect();
  io = null;
  callbacks.clear();
}
