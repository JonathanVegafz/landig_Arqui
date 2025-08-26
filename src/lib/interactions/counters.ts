// Contadores animados reutilizables (plan 1.3)
import { onceVisible } from './observer';

export function initCounters(root: ParentNode | Document = document) {
  const counters = root.querySelectorAll<HTMLElement>('[data-counter]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target || '0', 10);
    if (!target) return;
    const suffixEl = counter.querySelector(':scope > span[aria-hidden="true"]');
    const suffixHTML = suffixEl ? suffixEl.outerHTML : '';
    onceVisible(counter, () => {
      counter.parentElement?.classList.add('animate');
      animateCounter(counter, target, suffixHTML);
    });
  });
}

function animateCounter(el: HTMLElement, target: number, suffixHTML: string) {
  const duration = 1600;
  const start = performance.now();
  const startVal = 0;
  function frame(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = easeOutCubic(progress);
    const val = Math.floor(startVal + (target - startVal) * eased);
  el.innerHTML = val.toString() + suffixHTML; // preserva sufijo (+ o %)
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
