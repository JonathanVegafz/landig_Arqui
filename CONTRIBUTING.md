# CONTRIBUTING - Reglas para Agentes IG Construcciones

Eres un experto en JavaScript, TypeScript y Astro framework especializado en el desarrollo de sitios web arquitectónicos y de construcción optimizados para performance.

## Principios Clave del Proyecto

- **Performance First**: Prioriza la generación estática y minimal JavaScript para performance óptima
- **CSS Puro**: Utiliza **CSS personalizado** (🚫 NO Tailwind CSS) con sistema de variables CSS bien estructurado
- **Identidad Visual**: Mantén la identidad visual de IG Construcciones usando la paleta de colores establecida
- **TypeScript Estricto**: Escribe código TypeScript estricto siguiendo las configuraciones del proyecto
- **Mobile First**: Optimiza para Core Web Vitals y experiencia móvil

## Estructura del Proyecto IG Construcciones

```
src/
├── components/
│   ├── sections/     # Secciones principales: Hero, About, Servicios, etc.
│   └── ui/          # Componentes reutilizables: OptimizedImage, SectionHeader
├── layouts/         # Layout.astro con SEO optimizado
├── pages/           # index.astro, 404.astro, proyecto/[id].astro
├── styles/          # global.css con sistema de variables CSS
├── lib/             # constants.json, validations.ts, utils.ts
├── types/           # Definiciones TypeScript centralizadas
└── assets/          # Imágenes optimizadas en WebP (optimized/)
```

## Desarrollo de Componentes

### Arquitectura de Componentes
- ✅ Utiliza archivos `.astro` para todos los componentes del sitio
- 🚫 NO uses hidratación del lado del cliente (`client:*`) a menos que sea absolutamente necesario
- ✅ Implementa componentes de secciones siguiendo el patrón: `Hero.astro`, `About.astro`, `Servicios.astro`
- ✅ Usa el componente `SectionHeader` para títulos consistentes de secciones
- ✅ Mantén la estructura de props tipadas con interfaces TypeScript

### Patrón de Componentes de Sección
```astro
---
import SectionHeader from '../ui/SectionHeader.astro';
// Importar tipos necesarios
---

<section class="seccion section-bg-white" id="seccion-id">
  <div class="container">
    <SectionHeader 
      subtitle="Subtítulo"
      title="Título Principal"
      description="Descripción de la sección"
    />
    <!-- Contenido de la sección -->
  </div>
</section>

<style>
/* Estilos específicos de la sección usando variables CSS */
</style>
```

## Sistema de Estilos Personalizado

### 🚫 PROHIBIDO: Tailwind CSS
**NUNCA uses Tailwind CSS** - el proyecto usa CSS puro con variables personalizadas.

### ✅ Sistema de Variables CSS
Utiliza las variables CSS definidas en `global.css`:

```css
/* Colores principales */
--color-primary: #77bcdb;
--color-secondary: #294758;
--color-accent: #f39c12;

/* Espaciado */
--spacing-xs: 0.25rem;
--spacing-sm: 0.75rem;
--spacing-md: 1.25rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Transiciones */
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
```

### Clases Utilitarias Disponibles
```css
/* Fondos de sección */
.section-bg-white
.section-bg-gray

/* Efectos visuales */
.glassmorphism
.card-hover

/* Layouts */
.grid-auto-fit
.grid-2-columns
.grid-3-columns

/* Animaciones */
.scroll-fade
.fade-in-up
```

### Patrón de Estilos en Componentes
```astro
<style>
.mi-componente {
  background: var(--color-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  transition: var(--transition-normal);
}

.mi-componente:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}
</style>
```

## Gestión de Contenido

### Fuentes de Datos
- **Información de empresa**: `src/lib/constants.json`
- **Proyectos**: `src/lib/projects.json` + `projects-loader.ts`
- **Testimonios**: `src/lib/testimonials.json` + `testimonials-loader.ts`

### Información de la Empresa
```json
{
  "COMPANY_INFO": {
    "name": "IG Construcciones",
    "location": "Maitencillo, V Región, Chile",
    "phone": "+56945150212",
    "email": "contacto@igconstrucciones.cl",
    "experience": "20+",
    "projects": "100+"
  }
}
```

### Idioma y Localización
- ✅ Todo el contenido debe estar en **español (es_CL)**
- ✅ Mantén coherencia en información de contacto y ubicación
- ✅ Usa terminología técnica apropiada: paneles SIP, metalcom, EIFS

## Optimización de Imágenes

### Componente Image de Astro
```astro
---
import { Image } from 'astro:assets';
import miImagen from '../assets/optimized/imagen-hero.webp';
---

<Image
  src={miImagen}
  alt="Descripción específica"
  class="mi-clase"
  loading="lazy" // o "eager" para hero
  fetchpriority="high" // solo para imagen principal
  format="webp"
  quality={90}
  width={1200}
  height={800}
/>
```

### Reglas de Imágenes
- ✅ Usa exclusivamente formato **WebP** en `src/assets/optimized/`
- ✅ Implementa **lazy loading** excepto para imágenes above-the-fold
- ✅ Usa `fetchpriority="high"` solo para la imagen hero
- ✅ Especifica **dimensiones** para evitar layout shifts
- ✅ Alt text descriptivo y específico

## Routing y SEO

### Estructura de Páginas
```
src/pages/
├── index.astro          # Landing principal
├── 404.astro           # Página de error
└── proyecto/[id].astro # Rutas dinámicas de proyectos
```

### SEO Optimizado
```astro
<Layout
  title="IG Construcciones - Arquitectura y Construcción en la V Región"
  description="Descripción específica con keywords"
  canonical="https://igconstruccionesspa.cl/"
  ogImage={imagenOG}
  ogType="website"
  ogLocale="es_CL"
>
```

### Keywords Principales
- Arquitectura, construcción, V Región, Chile
- Diseño arquitectónico, obras nuevas, eficiencia energética
- Maitencillo, construcción sustentable, paneles SIP

## Performance y Optimización

### JavaScript Mínimo
- 🚫 NO uses `client:*` directives innecesariamente
- ✅ Prefiere animaciones CSS sobre JavaScript
- ✅ Usa el sistema de optimización configurado en `astro.config.mjs`

### Animaciones CSS
```css
/* Usar clases predefinidas */
.scroll-fade {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.scroll-fade.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Core Web Vitals
- ✅ LCP < 2.5s (optimizar imagen hero)
- ✅ FID < 100ms (minimal JavaScript)
- ✅ CLS < 0.1 (dimensiones de imagen definidas)

## Validación y Tipos TypeScript

### Configuración Estricta
El proyecto usa TypeScript estricto. Respeta estas reglas:
```typescript
// tsconfig.json
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noImplicitReturns": true
```

### Interfaces de Componentes
```typescript
// src/types/index.ts
export interface BaseProps {
  class?: string;
  id?: string;
}

export interface ImageProps extends BaseProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}
```

### Uso en Componentes
```astro
---
interface Props {
  titulo: string;
  descripcion?: string;
  class?: string;
}

const { titulo, descripcion, class: className } = Astro.props;
---
```

## Funcionalidades Específicas

### Formularios de Cotización
```astro
---
import FormField from '../ui/FormField.astro';
---

<form class="cotiza__form">
  <FormField
    id="nombre"
    name="nombre"
    type="text"
    label="Nombre completo"
    placeholder="Ingresa tu nombre"
    required={true}
  />
</form>
```

### Galería de Proyectos
- ✅ Usa el sistema de proyectos en `projects.json`
- ✅ Implementa navegación optimizada
- ✅ Lazy loading para imágenes de galería

### Sistema de Testimonios
```astro
---
import { getTestimonials } from '../lib/testimonials-loader';
const testimonios = await getTestimonials();
---
```

## Convenciones de Código

### Nomenclatura
- **Variables de negocio**: español (`nombreEmpresa`, `ubicacionProyecto`)
- **Variables técnicas**: inglés (`isLoading`, `imageWidth`)
- **Clases CSS**: kebab-case (`seccion-hero`, `card-proyecto`)
- **Componentes**: PascalCase (`SectionHeader`, `OptimizedImage`)

### Comentarios
```astro
---
// Lógica de negocio en español
const informacionEmpresa = await getCompanyInfo();

// Comentarios técnicos en inglés
const optimizedImages = processImages(rawImages);
---

<!-- Comentarios HTML en español -->
<!-- Sección principal con información de la empresa -->
<section class="hero">
```

### Estructura de Archivos
```astro
---
// 1. Imports
import Layout from '../layouts/Layout.astro';
import ComponenteUI from '../components/ui/ComponenteUI.astro';

// 2. Interfaces (si es necesario)
interface Props {
  titulo: string;
}

// 3. Props
const { titulo } = Astro.props;

// 4. Lógica
const datos = await obtenerDatos();
---

<!-- 5. HTML/Template -->
<Layout>
  <main>
    <!-- contenido -->
  </main>
</Layout>

<!-- 6. Estilos -->
<style>
/* Estilos del componente */
</style>
```

## Scripts NPM Disponibles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
```

### Calidad de Código
```bash
npm run lint         # ESLint
npm run lint:fix     # ESLint con auto-fix
npm run format       # Prettier
npm run type-check   # TypeScript check
npm run check        # Lint + Format + Type check
npm run validate     # Check + Build
```

### Optimización
```bash
npm run optimize-images  # Optimizar imágenes
```

## Contenido y Branding IG Construcciones

### Tono de Comunicación
- ✅ Profesional pero cercano
- ✅ Técnico pero accesible
- ✅ Enfoque en experiencia y calidad

### Mensajes Clave
- 20+ años de experiencia en la V Región
- Especialización en eficiencia energética
- Construcción sustentable y moderna
- Integración con el entorno natural

### Terminología Técnica
- Paneles SIP (Structural Insulated Panels)
- Sistema Metalcom
- EIFS (Exterior Insulation Finishing System)
- Eficiencia energética
- Construcción sustentable

## Accesibilidad

### Semántica HTML
```astro
<!-- Estructura semántica correcta -->
<main>
  <section aria-label="Sección principal">
    <h1>Título principal</h1>
    <nav aria-label="Navegación de secciones">
      <ul role="list">
        <li><a href="#servicios">Servicios</a></li>
      </ul>
    </nav>
  </section>
</main>
```

### ARIA y Accesibilidad
- ✅ `aria-label` en secciones importantes
- ✅ `role="list"` en listas personalizadas
- ✅ `aria-live="polite"` para contenido dinámico
- ✅ Contraste adecuado (usar paleta de colores)
- ✅ Navegación por teclado funcional

## Testing y Deployment

### Validación Pre-Deploy
```bash
# Ejecutar antes de cualquier commit
npm run validate
```

### Optimización de Build
- ✅ Inlining de CSS pequeño configurado
- ✅ Optimización de assets habilitada
- ✅ Chunking manual para vendor libs
- ✅ Sourcemaps deshabilitados en producción

---

## 🚨 Reglas Críticas

### ❌ NO HACER
- No usar Tailwind CSS (usar CSS personalizado)
- No agregar JavaScript innecesario
- No usar `client:*` sin justificación
- No modificar la paleta de colores sin consultar
- No cambiar la información de contacto
- No usar imágenes que no sean WebP optimizadas

### ✅ SIEMPRE HACER
- Usar el sistema de variables CSS
- Mantener TypeScript estricto
- Optimizar imágenes antes de usar
- Validar con `npm run check`
- Respetar la estructura de carpetas
- Mantener consistencia en español/inglés según contexto
- Testear en móviles y desktop
- Verificar Core Web Vitals

---

*Este proyecto representa a IG Construcciones, una empresa de arquitectura y construcción con 20+ años de experiencia en la V Región de Chile. Mantén siempre la profesionalidad y calidad en cada línea de código.*
