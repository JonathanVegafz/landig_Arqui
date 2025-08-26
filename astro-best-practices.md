# Astro Best Practices (Guía Base)

Esta guía consolida buenas prácticas oficiales y de la comunidad de Astro (estructura, rendimiento, SEO, accesibilidad, DX) junto con las directrices solicitadas. Úsala como referencia normativa del proyecto.

---
## Principios Clave
- Minimiza JavaScript enviado al cliente: favorece HTML estático + CSS.
- Aprovecha el render estático (SSG) por defecto; solo hidrata donde exista interactividad necesaria.
- Usa directivas `client:*` de forma explícita y justificada (documentar motivo en comentario).
- Prioriza composición de componentes `.astro` y pasar datos vía props en lugar de lógica duplicada.
- Nombra archivos y carpetas con significado semántico y consistente (kebab-case para páginas, PascalCase para componentes).
- Evita dependencias globales innecesarias y carga condicional de librerías (lazy / dynamic import).

## Estructura Recomendada
```
root
├─ public/              # Assets estáticos (favicons, fuentes auto-hospedadas, static images no transform)
├─ src/
│  ├─ components/
│  │  ├─ ui/           # Componentes atómicos/reutilizables
│  │  ├─ sections/     # Secciones de página (hero, about...)
│  ├─ content/         # Colecciones (Markdown/MDX) → usar content collections
│  ├─ layouts/
│  ├─ lib/             # Utilidades, loaders, lógica dominio
│  ├─ pages/           # Rutas file-based
│  ├─ styles/          # Global.css + utilidades / tokens
│  ├─ assets/          # Imágenes procesadas por Astro (import)
│  └─ types/           # Tipos TS
├─ astro.config.mjs
├─ tsconfig.json
```

## Componentes
- Un componente `.astro` solo incluye JS/TS necesario en el frontmatter; evita lógica pesada inline en `<script>` del body.
- Extrae scripts interactivos a componentes dedicados que se hidraten: `<Typewriter client:visible />`.
- Usa `<slot />` para composición flexible.
- Prefiere `<Fragment>` o envoltorios mínimos para reducir DOM extra.
- Centraliza meta/SEO en un componente `<SEO />` reutilizable (evita duplicar en cada layout). 

## Routing y Páginas
- Rutas dinámicas: `[id].astro`, `[...slug].astro` para catch-all.
- Siempre exportar `getStaticPaths()` en páginas dinámicas con datos estáticos.
- Incluir página `404.astro` personalizada.
- Mantener rutas limpias (sin trailing `.html` en enlaces internos).

## Gestión de Contenido
- Migrar JSON de proyectos/testimonios a Content Collections (`src/content/config.{js,ts}`) para esquemas validados.
- Usar frontmatter para título, descripción, fecha, openGraph.
- Generar RSS cuando aplique (blog/noticias) con `@astrojs/rss`.

## Estilos
- Usar estilos scoped dentro de componentes para reglas específicas.
- Global.css solo para: CSS reset, tokens (variables), utilidades, tipografía base, layout genérico.
- Evitar duplicar utilidades (ej. `.btn`, `.card`) en varios sitios; centralizarlas.
- Considerar adopción de Tailwind (`@astrojs/tailwind`) si se busca acelerar prototipado; si se usa: no mezclar con grandes bloques CSS no utilizados.
- No usar `@apply` (según directriz solicitada) → preferir composición directa de clases.

## Optimización de Imágenes
- Usar `import image from '../assets/...';` + `<Image />` para redimensionado automático y formatos modernos.
- Añadir `sizes` en `<Image>` para responsive.
- Lazy loading por defecto (`loading="lazy"`) salvo hero crítico (`eager`).

## JavaScript & Hydration
- Directivas:
  - `client:load` para interactividad inmediata (evitar salvo crítico).
  - `client:idle` para diferir no crítico tras idle.
  - `client:visible` para componentes fuera del viewport inicial.
  - `client:only="react"` (u otro) si se necesita framework SPA para ese componente.
- Agrupar pequeñas animaciones scroll / counters en un único observer reutilizable.
- Evitar `DOMContentLoaded` repetido: usar módulos compartidos.

## Data Fetching / Build Time
- Cargar datos estáticos en `getStaticPaths()` o en el frontmatter (import JSON/Markdown directamente).
- Preferir `Astro.glob()` para colecciones locales vs peticiones runtime.
- Validar datos con Zod u otro para robustez.

## SEO y Metadatos
- Usar `<head>` en layouts + componente `<SEO>` para metas dinámicas.
- `rel="canonical"` en Layout.
- Open Graph + Twitter Cards consistentes.
- Structured Data JSON-LD mínimo y validado (no duplicar).
- Solo incluir meta tags necesarios (evitar saturación irrelevante).

## Accesibilidad
- Usar HTML semántico: `<header>`, `<nav>`, `<main>`, `<section>` con `aria-labelledby` cuando el heading no es inmediatamente claro.
- Evitar `role` redundante (ej. `role="navigation"` en `<nav>` no es necesario).
- `aria-label` descriptivo solo si no hay texto visible.
- Mantener orden lógico de headings (no saltar h2→h4 sin h3 contextual).
- Focus styles visibles; no remover outline sin reemplazo.
- `prefers-reduced-motion` para animaciones.

## Rendimiento
- Analizar bundle con `astro build --verbose` y Lighthouse.
- Eliminar librerías no usadas (ej. AOS si se implementa animación manual).
- Incluir `rel="preload"` solo para recursos críticos (fuentes autohospedadas idealmente en lugar de Google Fonts para privacidad + performance).
- Usar `font-display: swap` si se cargan fuentes vía CSS.
- Implementar `image-set()` o `srcset` en fondos hero si se usa CSS background.
- Minimizar DOM depth y anidar menos contenedores.

## Integraciones
- Usar integraciones oficiales: `@astrojs/image`, `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/mdx`.
- Configurar `site` en `astro.config.mjs` para generar URLs absolutas correctas (sitemap, canonical, og:url).

## Build & Deployment
- Variables de entorno vía `.env` + `import.meta.env` (prefijo `PUBLIC_` para exponer).
- Automatizar CI: lint (ESLint), type-check, build y (opcional) pruebas E2E.
- Hosting estático (Netlify/Vercel/Cloudflare Pages) — revisar headers de caché y compresión.

## Logging & Errores
- Manejar errores en loaders con `try/catch` y fallback sensato.
- No exponer trazas internas al usuario final.

## Tailwind (si se integra)
- Usar utilidades de spacing/colores del tema extendido.
- Centralizar tokens en `tailwind.config.cjs` (`theme.extend`).
- Prohibido `@apply` (directriz local) → priorizar clases, componentes + `@layer components` si imprescindible.
- Purga automática (Tailwind JIT ya lo hace) asegurando paths correctos.

## Testing
- Unit tests: funciones en `lib/` (ej. validaciones, formateos).
- E2E: flujos clave (navegación, formulario contacto) con Playwright o Cypress.
- Visual regression: Percy / Chromatic (opcional si hay componentes complejos).

## Métricas y Observabilidad
- Core Web Vitals monitoreados (LCP <2.5s, CLS <0.1, INP/FID bajo).
- Analítica ligera (Plausible / Umami) para evitar JS pesado.
- Presupuestos de performance (peso total < 150KB JS inicial / < 300KB total crítico).

## Seguridad
- Sanitizar cualquier contenido dinámico (ya existe `sanitizeText`).
- Headers recomendados (con host): CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.

## Convenciones de Código
1. TypeScript donde sea posible.
2. Nombres descriptivos: `getProjects()`, `CompanyInfo`.
3. Comentarios JSDoc en utilidades críticas.
4. Evitar huecos de responsabilidad: un componente = una responsabilidad.
5. Uso estricto de ESLint + Prettier.

## Performance Checklist (Previo a Deploy)
- [ ] Lighthouse > 90 (Performance / Accessibility / SEO / Best Practices)
- [ ] JS total inicial < objetivo
- [ ] Imágenes comprimidas (WebP/AVIF) y dimensionadas
- [ ] No blocking scripts en `<head>` (usar `type="module"` defer implícito)
- [ ] Fonts: precarga + swap (ideal self-host)
- [ ] critical-path CSS minimizado

## Migraciones Recomendadas
- JSON → Content Collections.
- Scripts DOM inline → componentes hidratables ó extracción a módulo global (un solo observer).
- Inline CSS repetido → tokens/utilidades en `global.css` o Tailwind.

---
## Directrices Base Solicitadas (Consolidadas)
(Se integran dentro de las secciones previas, se listan explícitamente para trazabilidad.)

Key Principles
- Respuestas concisas y técnicas con ejemplos Astro.
- Aprovechar partial hydration y soporte multi-framework.
- Priorizar generación estática y JS mínimo.
- Nombres descriptivos y convenciones de Astro.
- Organización por file-based routing.

Astro Project Structure, Component Development, Routing, Content Management, Styling, Performance Optimization, Data Fetching, SEO, Integrations, Build & Deployment, Tailwind, Testing, Accessibility, Key Conventions, Performance Metrics: (Ver secciones detalladas arriba).

---
## Ejemplos de Patrón Correcto

Hydration específica:
```astro
---
import Typewriter from '../components/interactive/Typewriter.tsx';
---
<Typewriter client:visible messages={["Mensaje 1", "Mensaje 2"]} />
```

Uso de Content Collections:
```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
const projects = defineCollection({ schema: z.object({ title: z.string(), category: z.string(), description: z.string() }) });
export const collections = { projects };
```

Accesibilidad semántica:
```astro
<section aria-labelledby="servicios-title">
  <h2 id="servicios-title">Servicios</h2>
  <ul>
    <li>Diseño</li>
  </ul>
</section>
```

---
## Anti‑Patrones a Evitar
- `DOMContentLoaded` duplicado en múltiples componentes para observers simples.
- Roles redundantes (`role="banner"` en `<header>`).
- Bloques grandes de CSS repetidos en cada sección.
- Carga de librerías de animación si ya existen animaciones personalizadas.
- Imágenes críticas sin atributos `width/height` o sin `sizes`.

---
## Próximos Pasos (Resumen)
1. Auditar CSS y deduplicar (`.btn`, `.card`, `.nav-link`).
2. Extraer scripts repetidos a módulo.
3. Migrar datos JSON → content collections.
4. Implementar `<SEO />` central.
5. Considerar Tailwind o racionalizar utilidades existentes.
6. Añadir pruebas unitarias para `utils.ts`.

---
Fuente: Buenas prácticas sintetizadas de documentación oficial de Astro (project structure, performance, partial hydration, images, content collections) y experiencia profesional.
