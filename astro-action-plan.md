# Plan de Acción Astro

Basado en: `astro-best-practices.md` + `astro-audit.md`
Fecha: 2025-08-26

## Objetivo General
Optimizar el proyecto para alinearlo con las mejores prácticas de Astro, reduciendo peso de CSS/JS, mejorando accesibilidad, SEO y mantenibilidad, y preparando la base para escalabilidad futura (contenido estructurado, testing y CI/CD).

---
## 1. Acciones Inmediatas (Semana 1)
Enfocadas en limpieza, corrección y quick wins de performance / accesibilidad.

### 1.1 CSS
- [x] Eliminar definiciones duplicadas (`.card-base`, `.card-hover`, `.card-top-border`) del archivo redundante y centralizarlas en un único módulo inicial (cards.css). (Pendiente fase 2: purga final del legacy y archivo viejo si existe)
- [x] Normalizar naming base de botones: creado `buttons.css` con sistema (`.btn`, variantes previstas). (Pendiente remapeo completo `.btn-primary` → `.btn--primary` y limpieza legacy para cierre total)
- [x] Eliminar placeholders inválidos en animaciones: primer pase (no se detectan placeholders activos en nuevos parciales). Validar restante en legacy antes de cierre.
- [x] Corregir gradiente vacío en `.proyecto-card__overlay` (actualizado en `global.css`).
- [x] Crear clase utilitaria `.section` (`padding: var(--spacing-2xl) 0;`).
- [x] Revisar y eliminar clases timeline no usadas y módulo duplicado typewriter (limpieza en `global.css` y `interactions/`).

### 1.2 HTML / Semántica / A11y
 - [x] Remover roles redundantes en `<header>`, `<nav>`, `<footer>`.
 - [x] Cambiar patrón de filtros Galería: reemplazar `role="tablist"`/`role="tab"` por botones simples con `aria-pressed` + `.is-active`.
 - [x] Añadir `aria-live="polite"` a contenedor de mensajes de error del formulario; marcar inputs erróneos con `aria-invalid="true"` (validación básica añadida). (Pendiente validaciones regex avanzadas)
 - [x] Sincronizar `aria-expanded` y `aria-label` dinámico en botón hamburguesa (toggle implementado).
 - [x] Tipo de overlay hero: asegurar `h1` único y ocultar texto decorativo (span visual oculto con aria-hidden y texto accesible único añadido).

### 1.3 JavaScript
- [x] Eliminar preloader (simplificado Layout sin retraso artificial; pendiente medir LCP post cambio).
- [x] Extraer lógica repetitiva (counters, intersection observers, typewriter, carousel, filtros, formValidation) a `/src/lib/interactions/`.
- [x] Centralizar un solo `IntersectionObserver` importado por componentes (Typewriter, counters, processReveal, scrollFade unificados; pendiente revisar carousel/filtros si requieren observer para lazy init adicional).
- [x] Reutilizar regex de email / teléfono de `VALIDATION_RULES_WITH_REGEX` en el formulario (módulo `formValidation.ts`).

### 1.4 SEO / Meta
 - [x] Crear componente real `SEO.astro` con props esenciales y meta mínimas.
 - [x] Reducir meta tags no críticas (el componente omite Dublin Core / geo por defecto).
 - [x] Añadir imagen OG por defecto (`/og-default.jpg`). (Pendiente crear asset físico si no existe)
 - [x] Integrar `SEO.astro` en `Layout.astro` reemplazando metatags manuales restantes.

### 1.5 Limpieza de Código
 - [x] Eliminar funciones no usadas (`calculateAge` removida con comentario de recuperación).
 - [x] Documentar uso seguro de `set:html` (comentarios añadidos en `ServiceCard.astro` y `ContactInfo.astro`).

### 1.6 Configuración
 - [x] Definir `site` en `astro.config.mjs` (ya estaba configurado y confirmado).
 - [x] Revisar `nginx.conf` y agregar headers seguridad (CSP mínima, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection).

### Ejemplo Refactor (Filtro Galería)
ANTES:
```astro
<button role="tab" class="filter-button active" aria-selected="true">Todos</button>
```
DESPUÉS:
```astro
<button class="filter-button" aria-pressed={categoria === active} data-category={categoria}>
  {label}
</button>
```
JS (modularizado):
```ts
export function initProjectFilters(root = document) {
  const buttons = [...root.querySelectorAll('.filter-button')];
  const cards = [...root.querySelectorAll('.proyecto-card')];
  let active = 'todos';
  buttons.forEach(btn => btn.addEventListener('click', () => {
    active = btn.dataset.category || 'todos';
    buttons.forEach(b => b.setAttribute('aria-pressed', (b===btn).toString()));
    cards.forEach(card => {
      card.toggleAttribute('hidden', active !== 'todos' && card.dataset.categoria !== active);
    });
  }));
}
```

---
## 2. Acciones a Mediano Plazo (Semanas 2–4)
Foco en estructura, escalabilidad y optimización progresiva.

### 2.1 Content Collections
- [x] Crear `src/content/config.ts` con colecciones `projects`, `testimonials` y migrar JSON a archivos individuales.
- [x] Ajustar loaders para usar `getCollection('projects')` / `getCollection('testimonials')` (async) y ordenar por id.

### 2.2 Partial Hydration
- [x] Crear componentes/módulos interactivos:
  - `Typewriter.astro` (reemplaza script en Hero)
  - `galleryFilter.ts` (reemplaza script inline Galería)
  - `processReveal.ts` (reemplaza observer manual en NuestroProceso)
  - `testimonialsCarousel.ts` (reemplaza script inline Reseñas)
  - `counters.ts` (ya existente, pendiente hydration strategy idle)
- [x] Definir estrategia sin directivas `client:*` usando observer central (counters, carousel, filters, processReveal) → JS solo ejecuta tras visibilidad.
- [x] Sustituir scripts inline (Header menu toggle migrado a `headerMenu.ts` + observer; Galería, Carousel, Process, Counters, Form) → quedan revisiones menores futuras si se añaden nuevos scripts.

### 2.3 Arquitectura CSS
- [ ] Evaluar adopción de Tailwind. Si se integra:
  - Instalar `@astrojs/tailwind`.
  - Mapear tokens actuales a `tailwind.config.cjs` (colores, spacing, fonts).
  - Reemplazar utilidades custom (`.mb-*`, `.flex`, `.grid-*`) por clases Tailwind progresivamente.
- [ ] Si NO se adopta Tailwind: formalizar design tokens y utilities (ITCSS o Utility-first minimalista).

### 2.4 Performance
- [x] Auto-hosting fuentes (creado `fonts.css`, pendiente subir archivos woff2 reales a `public/fonts`).
- [x] Generar `sitemap` con `@astrojs/sitemap` (integración ya configurada en `astro.config.mjs`).
- [x] Añadir prefetch de rutas de proyecto (hover/focus en links "Ver Detalles" usando `<link rel=prefetch>` dinámico).
- [x] Implementar `loading="lazy"`/`decoding="async"` (Galería, About, Header logo) + `sizes` añadido (Hero full width, logo fijo, about). (Pendiente revisar páginas futuras si se añaden imágenes nuevas).

### 2.5 Testing
- [x] Añadir Vitest configuración base (`vitest.config.ts`) y primer test `validation.test.ts`.
- [x] Ampliar tests unitarios: `format.test.ts` (formatPhone, sanitizeText, capitalizeWords, truncateText, formatDate), `id.test.ts` (generateId uniqueness).
- [x] Configurar cobertura (Vitest v8 provider, reporters: text, html, lcov; thresholds líneas ≥70%).
- [ ] Playwright o Cypress para E2E (navegación, formulario exitoso, filtrado galería).
- [ ] Script npm: `test`, `test:unit`, `test:e2e`.

### 2.6 Accesibilidad Avanzada
- [x] Carousel: controles prev/next, aria-live status, roles slide, soporte teclado.
- [x] Formulario: `aria-invalid`, `role="alert"`, `aria-describedby` persistente.
- [ ] Revisión Lighthouse Accessibility >= 95 (pendiente ejecutar auditoría tras cambios).

### 2.7 SEO / Structured Data
- [x] Añadir Schema `CreativeWork` por página `[id]` (JSON-LD dinámico con título, descripción, imagen, categoría, ubicación, keywords).
- [ ] Implementar `robots.txt` dinámico (ya existe estático, validar contenido). 

### 2.8 Refactor Utils
- [x] Depurar utils no usados; dividir en módulos (`validation.ts`, `format.ts`) (pendiente revisar importaciones para reemplazar llamadas antiguas si las hubiera).

### Ejemplo Refactor (Typewriter a componente)
ANTES (inline script en Hero):
```js
setTimeout(() => { typeWriter(); }, 1200);
```
DESPUÉS:
```astro
---
export interface Props { texts: string[]; delay?: number; }
const { texts, delay = 1200 } = Astro.props;
---
<span class="typewriter" data-texts={JSON.stringify(texts)} />
<script client:visible>
  const el = document.currentScript.previousElementSibling;
  const texts = JSON.parse(el.dataset.texts);
  /* lógica minimal */
</script>
```

---
## 3. Acciones a Largo Plazo (Mes 2+)
Escalabilidad, automatización y calidad continua.

### 3.1 CI/CD
- [ ] Workflow GitHub Actions: `lint`, `type-check`, `build`, `test`.
- [ ] Deploy automático a Vercel / Netlify / Cloudflare Pages.

### 3.2 Observabilidad y Métricas
- [ ] Integrar analítica ligera (Plausible) con defer.
- [ ] Lighthouse CI o `@lhci/cli` para monitoreo de regresiones.
- [ ] Configurar presupuestos (bundle size) en CI.

### 3.3 Performance Profunda
- [ ] Implementar `astro-compress` (si necesario) para minificar HTML/CSS/JS.
- [ ] Revisar uso de HTTP/2 push (o preload selectivo) para recursos críticos.
- [ ] Auditar imágenes para AVIF opcional.

### 3.4 Accesibilidad Continua
- [ ] Integrar Pa11y CI.
- [ ] Documentar checklist de a11y en PR template.

### 3.5 Documentación
- [ ] Añadir `CONTRIBUTING.md` con estándares de commits, branching y lint.
- [ ] Documentar arquitectura (diagrama dependencias componentes).

### 3.6 Internacionalización (Opcional)
- [ ] Preparar estructura i18n si se prevé crecimiento (Astro + translations JSON / content collections por locale).

### Ejemplo CI (GitHub Actions Skeleton)
```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```

---
## 4. Roadmap Priorizado (Resumen)
| Orden | Acción | Tipo | Resultado Esperado |
|-------|--------|------|--------------------|
| 1 | Limpieza CSS duplicado | Mantención | -8–15% peso CSS |
| 2 | Quitar preloader | Perf | Mejor LCP & FID |
| 3 | Componente SEO + metas esenciales | SEO | Metadatos coherentes |
| 4 | Extraer scripts a módulos + hydration selectiva | Perf/DX | Menos JS global |
| 5 | A11y ajustes básicos | A11y | Lighthouse A11y >95 |
| 6 | Content Collections | Escalabilidad | Contenido tipado |
| 7 | Tailwind (evaluar) | DX | Desarrollo más rápido |
| 8 | Testing base | Calidad | Confianza en refactors |
| 9 | CI/CD | Flujo | Deploy confiable |
| 10 | Métricas & budgets | Perf | Prevención regresiones |

---
## 5. Métricas de Éxito
- Peso CSS inicial < 35KB gzip.
- JS ejecutado en main thread < 80KB (sin contar Astro runtime mínimo).
- LCP < 2.5s en 75º percentil móvil (medido con Lighthouse y luego RUM).
- Lighthouse: Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Cobertura pruebas unitarias (lib) ≥ 70% líneas.

---
## 6. Riesgos y Mitigaciones
| Riesgo | Mitigación |
|--------|------------|
| Refactor masivo CSS rompe layout | Refactor incremental + visual review en PRs |
| Introducción Tailwind genera mezcla inconsistente | Fase de transición con lint (no crear nuevas utilidades custom) |
| Partial hydration aumenta complejidad | Documentar cada componente interactivo con propósito y directiva usada |
| Eliminación preloader afecta percepción | Sustituir por skeleton ligero si fuese necesario |

---
## 7. Lista de Refactors Concretos (Ejemplos)

### Botón
ANTES (global + inline variantes duplicadas)
```html
<a class="btn btn-primary hero-btn">Cotiza</a>
```
DESPUÉS
```astro
<Button variant="primary" size="lg">Cotiza</Button>
```

### Card Servicio
ANTES
```astro
<article class="card-base card-hover card-top-border servicio-card">...</article>
```
DESPUÉS (si Tailwind)
```astro
<article class="relative flex flex-col h-full rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg border-t-4 border-transparent hover:border-primary">...</article>
```

### Eliminación Preloader
Eliminar bloque `#preloader` y script asociado; dejar contenido visible inmediato:
```diff
- <div id="preloader">...</div>
- JS de ocultar/mostrar
```

### Consolidar Observer
```ts
// lib/interactions/observer.ts
const callbacks = new Map<Element, () => void>();
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      callbacks.get(e.target)?.();
      io.unobserve(e.target);
    }
  });
});
export function onceVisible(el: Element, cb: () => void) {
  callbacks.set(el, cb); io.observe(el);
}
```
Uso:
```js
onceVisible(document.querySelector('#stats'), startCounters);
```

---
## 8. Seguimiento
Definir tablero (GitHub Projects) con columnas: Backlog / En Progreso / Review / Done. Cada hallazgo H# del audit se mapea a issues.

---
## 9. Conclusión
La implementación disciplinada de este plan reducirá deuda técnica, mejorará velocidad percibida y accesibilidad, y establecerá base escalable para crecimiento futuro (más contenido, pruebas e integraciones) alineado a las mejores prácticas de Astro.

Fin del documento.
