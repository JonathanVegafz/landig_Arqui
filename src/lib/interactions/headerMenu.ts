/**
 * Inicializa el menú hamburguesa y scroll suave.
 */
export function initHeaderMenu() {
  const menuToggle = document.querySelector<HTMLButtonElement>('.header__menu-toggle');
  const navMobile = document.querySelector<HTMLElement>('.header__nav-mobile');
  const body = document.body;

  function smoothScrollTo(targetId: string) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerElement = document.querySelector<HTMLElement>('.header');
      const headerHeight = headerElement ? headerElement.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }

  const allNavLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link, .mobile-nav-link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.includes('#')) {
        e.preventDefault();
        const hashIndex = href.indexOf('#');
        const hash = href.substring(hashIndex);
        
        // Actualizar la URL con el hash
        history.pushState(null, '', hash);
        
        smoothScrollTo(hash);
      }
    });
  });

  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !isExpanded;
      menuToggle.setAttribute('aria-expanded', String(nextExpanded));
      menuToggle.setAttribute('aria-label', nextExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      menuToggle.classList.toggle('active');
      navMobile.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    const mobileLinks = navMobile.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      });
    });
  }
}
