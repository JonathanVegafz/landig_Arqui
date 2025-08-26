interface Options { interval?: number; }
export function initTestimonialsCarousel(opts: Options = {}) {
  const { interval = 12000 } = opts;
  const slides = Array.from(document.querySelectorAll('.carousel-slide')) as HTMLElement[];
  const dots = Array.from(document.querySelectorAll('.carousel-dot')) as HTMLElement[];
  const prevBtn = document.querySelector('[data-carousel-prev]') as HTMLButtonElement | null;
  const nextBtn = document.querySelector('[data-carousel-next]') as HTMLButtonElement | null;
  const status = document.getElementById('carousel-status');
  if (!slides.length) return;
  let index = 0; let timer: number | undefined;
  function render() {
    slides.forEach((s, i) => {
      s.classList.remove('left','center','right');
      if (i === index) s.classList.add('center');
      else if (i === (index - 1 + slides.length) % slides.length) s.classList.add('left');
      else if (i === (index + 1) % slides.length) s.classList.add('right');
    });
    dots.forEach((d,i) => {
      d.classList.toggle('active', i===index);
      d.setAttribute('aria-selected', (i===index).toString());
    });
    if (status) status.textContent = `Reseña ${index + 1} de ${slides.length}`;
  }
  function next() { index = (index + 1) % slides.length; render(); restart(); }
  function prev() { index = (index - 1 + slides.length) % slides.length; render(); restart(); }
  function restart() { if (timer) clearTimeout(timer); timer = window.setTimeout(next, interval); }
  dots.forEach((d,i) => d.addEventListener('click', () => { index = i; render(); restart(); }));
  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);
  // Keyboard support for left/right arrows on focused carousel region
  (document.querySelector('.carousel-container') as HTMLElement | null)?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  });
  render(); restart();
}
