// Typewriter modular (plan 1.3)
import { onceVisible } from './observer';

export interface TypewriterOptions {
  texts: string[];
  typingSpeed?: number; // ms
  deletingSpeed?: number;
  delayBetween?: number;
  loop?: boolean;
}

export function initTypewriter(selector = '#typewriter-p', opts: TypewriterOptions) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  const { texts, typingSpeed = 50, deletingSpeed = 35, delayBetween = 1500, loop = true } = opts;
  let textIndex = 0; let charIndex = 0; let deleting = false;

  function tick() {
    const current = texts[textIndex] || '';
    if (!deleting) {
  if (!el) return; // guard
  el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, delayBetween);
        return;
      }
      setTimeout(tick, typingSpeed);
    } else {
  if (!el) return; // guard
  el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false; textIndex = (textIndex + 1) % texts.length;
        if (!loop && textIndex === 0) return;
      }
      setTimeout(tick, deletingSpeed);
    }
  }
  onceVisible(el, tick);
}
