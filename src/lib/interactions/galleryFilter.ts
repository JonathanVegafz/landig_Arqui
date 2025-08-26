export function initProjectFilters(root: Document | ParentNode = document) {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('.filter-button'));
  const cards = Array.from(root.querySelectorAll<HTMLElement>('.proyecto-card'));
  let active = 'todos';
  buttons.forEach(btn => btn.addEventListener('click', () => {
    active = btn.dataset.categoria || 'todos';
    buttons.forEach(b => {
      const isActive = b === btn;
      b.classList.toggle('is-active', isActive);
      b.setAttribute('aria-pressed', isActive.toString());
    });
    cards.forEach(card => {
      const visible = active === 'todos' || card.dataset.categoria === active;
      if (visible) {
        card.style.display = 'block';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  }));
  cards.forEach(card => { card.style.transition = 'opacity .3s ease, transform .3s ease'; });
}
