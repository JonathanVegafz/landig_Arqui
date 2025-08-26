# Auditoría Astro del Proyecto

Fecha: 2025-08-26
Repositorio: landig_Arqui

## Resumen Ejecutivo
El proyecto presenta una base sólida visualmente, pero exhibe varias oportunidades de optimización relacionadas con: duplicación de CSS, scripts inline repetitivos, semántica mejorable, exceso de meta tags poco útiles, falta de componentización de patrones interactivos y ausencia de Content Collections. A continuación se detallan hallazgos categorizados.

---
## 1. CSS: Duplicación, Código Innecesario y Reorganización

### 1.1 Duplicación / Solapamiento
- `.card-base`, `.card-hover`, `.card-top-border` definidos tanto en `global.css` como en `styles/modules/cards.css`. Mantener solo una fuente (preferentemente módulo o global centralizado). 
- Estilos de botones `.btn`, `.btn-primary`, `.btn-secondary` en `global.css` y otro set de variantes en `Button.astro` (`.btn--primary`, etc.). Convención inconsistente (guion vs modificadores BEM). Propuesta: unificar en componente `Button` + utilidades globales mínimas. 
- `.feature-list` / `.feature-item` presentes globalmente y redefinidos (animaciones) en secciones (Hero). Evitar redefinir opacidad/animación en múltiples sitios.

### 1.2 Código potencialmente innecesario o incompleto
- Bloques abreviados con `{…}` en media queries y keyframes en `global.css` (placeholders incompletos) → deben eliminarse o completarse; actualmente agregan peso y confusión.
- `@keyframes fadeInUp`, `fadeIn`, `blink`, `slideInLeft`, `slideInRight` con cuerpos truncados (`to {…}`) → invalid CSS; limpiar o implementar correctamente.
- Clases timeline (`.timeline-*`) y typewriter (`.typewriter`) definidas en `global.css` pero la funcionalidad de timeline no se usa en secciones actuales (se usa un proceso zigzag distinto). Confirmar necesidad; si no, eliminar.
- Variantes de overlay `.image-overlay--light`, `--dark` definidas; algunas instancias usan overlay inline diferente (e.g. `Galeria.astro` usa `figcaption.image-overlay` con gradient vacío `background: linear-gradient();` dentro de `global.css` -> gradient incompleto en `.proyecto-card__overlay`.

### 1.3 Estilos que pueden moverse a `global.css`
- Estilos repetidamente recreados en secciones:
  - Margen/padding base de secciones (`padding: var(--spacing-2xl) 0;`). Crear utilidad `.section`.
  - Tipografía y márgenes para títulos en componentes de secciones (ej. `.proceso-card__title`, `.servicio-card__title`, `.section-title` similares). Consolidar escala tipográfica.
  - Botones de navegación de proyecto (`.nav-btn`) comparten patrón con `.btn` global; se pueden mapear a variante existente.
- Animaciones de aparición (`opacity + translateY`) replicadas (Hero, About stats, Proceso steps) → crear utilidad `.animate-fade-up[data-state='hidden'|'visible']` o usar una sola clase + data attributes.

### 1.4 Oportunidad Tailwind (si se adopta)
- Alto número de utilidades artesanales (`.mb-*`, `.mt-*`, `.p-*`, `.flex`, `.grid-*`) replican cobertura nativa de Tailwind. Reemplazables para reducir CSS propio.

---
## 2. Semántica y Accesibilidad

### 2.1 Roles redundantes
- `<header class="header" role="banner">` → `role` redundante.
- `<nav ... role="navigation">` en elementos `<nav>` (intrínseco).
- `<footer class="footer" role="contentinfo">` redundante.
- `<ul role="list">` innecesario salvo que se redefina list-style; ya hay `list-style: none;` en algunos casos, evaluar mantener sin role.

### 2.2 Estructura de headings
- Varias secciones usan `h2` correctamente, pero `Hero` usa `h1` dentro de la sección y la página principal solo tiene ese `h1` (correcto). Verificar que en páginas dinámicas `[id].astro` el `h1` exista (sí, `.proyecto-header__titulo`). Ok.

### 2.3 ARIA / Atributos
- Botones de filtro en Galería usan `role="tab"` pero el contenedor no implementa patrón completo de tabs (no hay `aria-orientation`, `tab` vs `tabpanel` con manejo de teclado). Mejor usar botones simples con `aria-pressed` o data attributes. 
- `aria-live="polite"` en typewriter sin fallback de contenido inicial → potencial anuncio vacío; establecer texto inicial o remover.
- En formulario: mensajes de error se muestran visualmente pero no se marcan con `role="alert"` o `aria-live`. Añadir `aria-live="polite"` a contenedor de errores para accesibilidad.

### 2.4 Otros
- Preloader introduce retardo y oculta contenido (FOUC) → reconsiderar (afecta LCP). 

---
## 3. Organización de Archivos

### 3.1 Observaciones
- `components/sections` vs `components/ui` consistente, pero `SEO.astro` está vacío: o se implementa o se elimina.
- Datos en JSON dentro de `lib/` (`projects.json`, `testimonials.json`, `constants.json`) deberían migrarse a `src/content/` con content collections.
- `styles/modules/cards.css` se solapa con definiciones en `global.css`; considerar `modules/` solo si se code-splitea o se refactoriza a Tailwind.
- Falta carpeta `content/` y configuración `content/config.ts`.

### 3.2 Nomenclatura
- Mezcla de español/inglés en clases (`.header__content`, `.servicio-card__title`) aceptable pero decidir convención (todo español o BEM en un idioma) para consistencia futura.

---
## 4. Uso de JavaScript / Interactividad

### 4.1 Scripts inline duplicados / centralizables
- Múltiples listeners `DOMContentLoaded` en cada sección (Hero, Header, About stats, Galería, Proceso, Resenas, Cotiza). Se puede consolidar: un módulo `interactions.ts` con inicializadores registrados por data attributes.
- Counters (`About`), observers (`Proceso`, scroll-fade en Layout), filtrado galería, carrusel reseñas, typewriter → todos usan su propio set de selectores y timers. Un sólo `IntersectionObserver` reutilizable + funciones modulares reduciría JS enviado.

### 4.2 Carga no diferida
- Todos los scripts inline se ejecutan tras `DOMContentLoaded`; muchos podrían esperar a `idle` o `visible`.
- No se utiliza ninguna directiva `client:*` porque son scripts en HTML estático (lo cual reduce JS importado por Astro, pero dificulta mantenimiento). 

### 4.3 Librerías externas
- AOS cargado condicionalmente en Layout aunque se cuenta con animaciones personalizadas → posible eliminación para reducir peticiones externas (~20KB+).

### 4.4 Oportunidades
- Convertir cada bloque interactivo en componente hidratable con directiva: 
  - Typewriter → `<Typewriter client:visible />`
  - Carousel → `<TestimonialsCarousel client:idle />`
  - Filtered gallery → `<ProjectsFilter client:visible />`

Esto facilita tree-shaking y encapsula estado.

---
## 5. SEO / Metadatos
- Exceso de meta tags (Dublin Core, geolocalización) posiblemente no aporta valor real y agrega peso al head.
- Falta un componente `<SEO>` que centralice lógica y reciba props (actualmente repetido solo en Layout, pero dinámicas en `[id].astro` podrían extenderse).
- `og:image` condicional no siempre presente; considerar imagen por defecto.
- Google Fonts cargadas con `preload` pero no se auto-hospedan; oportunidad de mejorar privacidad y performance (reduce bloqueo inicial DNS/TLS).

---
## 6. Rendimiento
- Preloader artificial retrasa LCP + añade animación innecesaria.
- Varias animaciones transform/opacity aceptables pero redundantes; consolidar reduce CSS.
- Observers múltiples y timers (counters, carousel, typewriter) ejecutan lógica aislada; modularizar.
- Falta `sizes` en algunas imágenes (hero sí especifica width/height, pero se puede añadir `sizes="100vw"` si siempre cubre ancho).
- Carrusel reseñas monta todas las reseñas simultáneamente; aceptable por volumen pequeño, pero se puede considerar virtualizar si crece.

---
## 7. Accesibilidad Específica
- Botón hamburguesa: bien con `aria-expanded`, pero falta sincronizar `aria-label` dinámico (Abrir/Cerrar menú).
- Carousel: no hay controles prev/next accesibles; solo dots. Dots no tienen `role="tab"` (correcto) pero podrían tener `aria-controls` si se asocia contenido.
- Falta `lang="es"` ya presente en `<html>` ✓.
- Formularios: no se usa `novalidate` pero se maneja validación custom; considerar soportar validación nativa + `aria-invalid`.

---
## 8. Código Muerto / Inconsistencias
- `SEO.astro` vacío.
- Animaciones clave incompletas (`{…}` placeholders) = CSS inválido.
- Gradiente vacío en `.proyecto-card__overlay`.

---
## 9. Tipado / Utilidades
- `utils.ts` incluye funciones no usadas (e.g., `calculateAge`, `formatDate`, `capitalizeWords`, `truncateText`) → revisar uso real; eliminar o documentar.
- Regex de validación replicado en formulario (email) en lugar de reutilizar `VALIDATION_RULES_WITH_REGEX`.

---
## 10. Testing
- No hay configuración de pruebas (unit / e2e).
- Candidatos a unit test: `isValidEmail`, `isValidPhone`, `formatPhone`, sanitización.

---
## 11. Seguridad
- Uso de `set:html` (ServiceCard icon, ContactInfo icon) aceptable por control interno, pero documentar que no se alimenta de user input.
- Falta Content Security Policy en `nginx.conf` (no revisado aún en detalle; pendiente en plan de acción).

---
## 12. Oportunidades de Refactor Clave (Resumen)
1. Consolidar estilos de tarjetas y botones.
2. Eliminar placeholders CSS y animaciones inválidas.
3. Extraer scripts a módulos y aplicar partial hydration.
4. Migrar datos JSON a content collections.
5. Simplificar meta tags y crear `<SEO />` real.
6. Remover preloader para mejorar LCP.
7. Mejorar accesibilidad (roles redundantes, aria-live, patrón tabs falso).
8. Adoptar Tailwind o reducir utilidades custom duplicadas.
9. Añadir pipeline de tests + CI.

---
## 13. Tabla de Hallazgos Priorizada
| ID | Categoría | Hallazgo | Impacto | Prioridad |
|----|-----------|----------|---------|-----------|
| H1 | CSS | Duplicación card/button | Mantenimiento / Peso | Alta |
| H2 | CSS | Animaciones/keyframes inválidos | Render / Confusión | Alta |
| H3 | JS | Scripts inline repetidos | Performance / DX | Alta |
| H4 | A11y | Roles redundantes / aria tab pattern | Accesibilidad | Media |
| H5 | SEO | Meta tags excesivas | Peso / Relevancia | Media |
| H6 | Perf | Preloader artificial | LCP / UX | Alta |
| H7 | Content | Falta content collections | Escalabilidad | Media |
| H8 | A11y | Filtro galería con roles tabs incorrectos | Accesibilidad | Media |
| H9 | Code | `SEO.astro` vacío | Claridad | Baja |
| H10 | JS | No reutilizar regex validación | Duplicación | Baja |
| H11 | CSS | Gradiente overlay vacío | UI inconsistente | Baja |
| H12 | Utils | Funciones no usadas | Mantenimiento | Baja |

---
## 14. Recomendaciones Iniciales (Resumen)
(Se detallarán tácticas en el `astro-action-plan.md`)
- Fase inmediata: limpieza CSS, consolidación, eliminar preloader, corregir a11y básico.
- Medio plazo: partial hydration, content collections, test setup.
- Largo plazo: CI/CD, métricas CWV, refactor a Tailwind (opcional) o design tokens más sistemáticos.

---
## 15. Notas Adicionales
- Verificar `nginx.conf` para headers; no incluido en detalle aquí.
- Considerar auto-hosting de fuentes y subset.

Fin del documento.
