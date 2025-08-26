import { onceVisible } from './observer';
export function initProcessReveal(root: Document | ParentNode = document) {
  const steps = Array.from(root.querySelectorAll('.proceso-step')) as HTMLElement[];
  steps.forEach(step => onceVisible(step, () => step.classList.add('visible')));
}
