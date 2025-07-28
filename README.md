# IG Construcciones - Sitio Web

Sitio web profesional para IG Construcciones, empresa de arquitectura y construcción en la V Región de Chile.

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes organizados por categoría
│   ├── ui/             # Componentes de interfaz reutilizables
│   │   ├── AstroImage.astro
│   │   ├── ContactInfo.astro
│   │   ├── FormField.astro
│   │   ├── SectionHeader.astro
│   │   └── ServiceCard.astro
│   ├── sections/       # Secciones principales de la página
│   │   ├── About.astro
│   │   ├── Cotiza.astro
│   │   ├── Galeria.astro
│   │   ├── Hero.astro
│   │   ├── NuestroProceso.astro
│   │   ├── Resenas.astro
│   │   └── Servicios.astro
│   └── layout/         # Componentes de estructura
│       ├── Header.astro
│       └── Footer.astro
├── layouts/            # Layouts de página
│   └── Layout.astro    # Layout principal
├── pages/              # Páginas del sitio
│   ├── index.astro     # Página principal
│   └── 404.astro       # Página de error
├── styles/             # Estilos globales
│   └── global.css      # CSS global
└── types/              # Tipos TypeScript
    └── index.ts        # Definiciones de tipos
```

## ✨ Características

### 🎯 Buenas Prácticas Implementadas

- **Semántica HTML**: Uso correcto de elementos semánticos (`<section>`, `<header>`, `<nav>`, `<main>`, `<footer>`)
- **Accesibilidad**: Atributos `aria-label`, `aria-live`, `role` y navegación por teclado
- **SEO Optimizado**: Meta tags completos, Open Graph, Twitter Cards
- **Componentes Modulares**: Estructura reutilizable y mantenible
- **Tipado TypeScript**: Interfaces bien definidas para props
- **Responsive Design**: Diseño adaptativo para todos los dispositivos

### 🧩 Componentes Organizados

#### **UI Components** (`src/components/ui/`)
- `SectionHeader.astro`: Encabezados de sección estandarizados
- `ContactInfo.astro`: Información de contacto reutilizable
- `FormField.astro`: Campos de formulario con validación
- `ServiceCard.astro`: Tarjetas de servicio modulares
- `AstroImage.astro`: Imágenes optimizadas

#### **Section Components** (`src/components/sections/`)
- `Hero.astro`: Sección principal de la página
- `About.astro`: Sección sobre nosotros
- `Servicios.astro`: Servicios ofrecidos
- `Galeria.astro`: Galería de proyectos
- `NuestroProceso.astro`: Proceso de trabajo
- `Resenas.astro`: Testimonios de clientes
- `Cotiza.astro`: Formulario de contacto

#### **Layout Components** (`src/components/layout/`)
- `Header.astro`: Navegación principal
- `Footer.astro`: Pie de página

### 🎨 Diseño y UX

- **Glassmorphism**: Efectos de cristal modernos
- **Animaciones Suaves**: Transiciones fluidas y profesionales
- **Paleta de Colores**: Consistente y accesible
- **Tipografía**: Jerarquía clara y legible

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 Tecnologías Utilizadas

- **Astro**: Framework web para sitios estáticos
- **TypeScript**: Tipado estático para mejor desarrollo
- **CSS Modules**: Estilos encapsulados por componente
- **SVG Icons**: Iconografía vectorial escalable

## 🎯 Optimizaciones

- **Performance**: Lazy loading de imágenes
- **SEO**: Meta tags optimizados, Structured Data (JSON-LD), sitemap.xml, robots.txt
- **Semántica HTML**: Uso correcto de `<article>`, `<section>`, `<address>`, `<dl>`, `<ul>`, `<li>`
- **Accesibilidad**: Navegación por teclado, lectores de pantalla, `aria-label`, `role`
- **Mobile First**: Diseño responsive desde móviles
- **Structured Data**: Schema.org markup para mejor indexación

## 📄 Licencia

© 2024 IG Construcciones. Todos los derechos reservados.
