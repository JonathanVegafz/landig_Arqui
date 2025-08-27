# IG Construcciones - Sitio Web Profesional

Sitio web profesional para IG Construcciones, empresa de arquitectura y construcción especializada en 5 regiones de Chile: Coquimbo, Valparaíso, Biobío, La Araucanía y Los Lagos. Desarrollado con Astro para máximo rendimiento y SEO optimizado.

## 🏗️ Estructura del Proyecto

```
src/
├── components/         # 🧩 Componentes reutilizables
│   ├── ui/            # Componentes de interfaz base
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── ContactInfo.astro
│   │   ├── FormField.astro
│   │   ├── SectionHeader.astro
│   │   ├── ServiceCard.astro
│   │   └── Typewriter.astro
│   └── sections/      # Secciones principales del sitio
│       ├── About.astro
│       ├── Cotiza.astro
│       ├── Footer.astro
│       ├── Galeria.astro
│       ├── Header.astro
│       ├── Hero.astro
│       ├── NuestroProceso.astro
│       ├── Resenas.astro
│       └── Servicios.astro
├── layouts/           # 📄 Layouts de página
│   └── Layout.astro   # Layout principal con SEO
├── pages/             # 🌐 Páginas del sitio
│   ├── index.astro    # Página principal
│   ├── 404.astro      # Página de error
│   └── proyecto/      # Páginas dinámicas de proyectos
│       └── [id].astro
├── lib/               # 📚 Bibliotecas y utilidades
│   ├── constants-loader.ts  # Carga de constantes con tipos
│   ├── constants.json      # Datos de la empresa
│   ├── projects-loader.ts  # Carga de proyectos
│   ├── projects.json      # Datos de proyectos
│   ├── static-image-map.ts # Mapeo de imágenes
│   ├── utils.ts           # Utilidades generales
│   ├── validations.ts     # Validaciones de formularios
│   └── interactions/      # Scripts de interactividad
│       ├── counters.ts
│       ├── formValidation.ts
│       ├── galleryFilter.ts
│       ├── headerMenu.ts
│       ├── observer.ts
│       └── scrollFade.ts
├── styles/            # 🎨 Estilos modularizados
│   ├── global.css     # Estilos principales
│   ├── tailwind.css   # Configuración Tailwind
│   ├── base/          # Estilos base
│   ├── components/    # Estilos de componentes
│   └── utilities/     # Utilidades CSS
├── assets/            # 🖼️ Recursos optimizados
│   └── optimized/     # Imágenes optimizadas WebP
└── types/             # 📝 Definiciones TypeScript
    ├── astro.d.ts
    └── index.ts
```

## 🌟 Características Principales

### 🏢 **Empresa**: IG Construcciones
- **Especialidad**: Arquitectura y construcción profesional
- **Cobertura**: 5 regiones de Chile (Coquimbo, Valparaíso, Biobío, La Araucanía, Los Lagos)
- **Servicios**: Diseño arquitectónico, construcción de obras nuevas, remodelaciones, eficiencia energética

### 🚀 **Tecnologías**
- **Framework**: Astro v5+ (Static Site Generation)
- **Styling**: Tailwind CSS + CSS personalizado modularizado
- **Lenguaje**: TypeScript para tipado fuerte
- **Optimización**: Imágenes WebP, compresión automática
- **SEO**: Schema.org structured data, meta tags optimizados

### ✨ **Funcionalidades**
- **Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **SEO Avanzado**: Optimizado para búsquedas de "arquitecto"
- **Formulario de Contacto**: Validación avanzada y integración WhatsApp
- **Galería de Proyectos**: Filtros dinámicos y navegación
- **Timeline de Proceso**: Línea de tiempo interactiva
- **Rendimiento**: Core Web Vitals optimizados

## 📁 Análisis Detallado de Archivos

### 🗃️ **Modelos (Models)**

#### `src/models/Project.ts`

**Función**: Define todas las interfaces y tipos de datos del proyecto

- `Project`: Interfaz para proyectos de construcción
- `Service`: Interfaz para servicios ofrecidos
- `Testimonial`: Interfaz para testimonios de clientes
- `ContactInfo`: Interfaz para información de contacto
- `CompanyInfo`: Interfaz para datos de la empresa

#### `src/models/data.ts`

**Función**: Contiene todos los datos estáticos y funciones del modelo

- Datos de la empresa (nombre, descripción, estadísticas)
- Información de contacto (teléfono, email, WhatsApp)
- Lista de proyectos con imágenes y descripciones
- Servicios ofrecidos con características
- Testimonios de clientes
- Funciones para filtrar y obtener datos

### 🎮 **Controladores (Controllers)**

#### `src/controllers/BaseController.ts`

**Función**: Controlador base que implementa operaciones CRUD genéricas

- Operaciones básicas: getAll, getById, create, update, delete
- Funciones de filtrado y ordenamiento
- Control de IDs automático
- Interfaz MVCController implementada

#### `src/controllers/ProjectController.ts`

**Función**: Maneja la lógica de negocio para proyectos

- Obtener todos los proyectos
- Filtrar por categoría (Residencial/Comercial)
- Obtener categorías disponibles
- Filtrado por área y múltiples criterios

#### `src/controllers/ServiceController.ts`

**Función**: Maneja la lógica de negocio para servicios

- Obtener todos los servicios
- Filtrar por características específicas
- Obtener características disponibles
- Búsqueda por funcionalidades

#### `src/controllers/ContactController.ts`

**Función**: Maneja la lógica de contacto y validaciones

- Validación de formularios de contacto
- Formateo de números de teléfono
- Validación de emails
- Información de la empresa

### ⚙️ **Configuración**

#### `src/config/mvc.ts`

**Función**: Configuración centralizada del patrón MVC

- Constantes de la empresa (nombre, contacto, ubicación)
- Configuración SEO (títulos, descripciones, URLs)
- Categorías y servicios disponibles
- Reglas de validación
- Configuración de animaciones

### 👁️ **Vistas (Views/Components)**

#### **Layout Components**

- `src/components/layout/Header.astro`: Navegación principal con menú hamburguesa
- `src/components/layout/Footer.astro`: Pie de página con información de contacto

#### **Section Components**

- `src/components/sections/Hero.astro`: Sección principal con call-to-action
- `src/components/sections/About.astro`: Información sobre la empresa
- `src/components/sections/Servicios.astro`: Catálogo de servicios ofrecidos
- `src/components/sections/Galeria.astro`: Portafolio de proyectos con filtros
- `src/components/sections/NuestroProceso.astro`: Proceso de trabajo paso a paso
- `src/components/sections/Cotiza.astro`: Formulario de contacto y cotización

#### **UI Components**

- `src/components/ui/SectionHeader.astro`: Encabezados estandarizados
- `src/components/ui/ServiceCard.astro`: Tarjetas de servicios
- `src/components/ui/ContactInfo.astro`: Información de contacto
- `src/components/ui/FormField.astro`: Campos de formulario
- `src/components/ui/AstroImage.astro`: Componente de imagen optimizada

### 📄 **Páginas**

#### `src/pages/index.astro`

**Función**: Página principal que orquesta todas las secciones

- Importa y renderiza todas las secciones
- Configuración SEO completa
- Layout principal aplicado

#### `src/pages/404.astro`

**Función**: Página de error 404 personalizada

- Diseño consistente con el sitio
- Enlace de regreso al inicio

### 🎨 **Estilos y Assets**

#### `src/styles/global.css`

**Función**: Estilos globales y variables CSS

- Variables de color y tipografía
- Estilos base y reset
- Media queries responsivos
- Optimizaciones para móviles
- Animaciones y transiciones

#### `src/assets/`

**Función**: Recursos estáticos optimizados

- `logo.webp`: Logo de la empresa
- `hero.webp`: Imagen principal del hero
- `imagen1.webp` - `imagen5.webp`: Proyectos del portafolio
- `background.svg`: Patrón de fondo
- `el arqui.png`: Imagen adicional

### 🔧 **Layouts**

#### `src/layouts/Layout.astro`

**Función**: Layout principal con configuración SEO

- Meta tags completos
- Open Graph y Twitter Cards
- Preload de fuentes críticas
- Structured Data (Schema.org)
- Configuración de AOS (Animate On Scroll)

### 📝 **Tipos**

#### `src/types/index.ts`

**Función**: Definiciones de tipos TypeScript

- Tipos para props de componentes
- Interfaces para formularios
- Tipos para configuración

## 🚀 Tecnologías Utilizadas

- **Astro**: Framework para sitios web estáticos
- **TypeScript**: Tipado fuerte para mayor robustez
- **CSS**: Estilos personalizados con variables CSS
- **WebP**: Imágenes optimizadas para web
- **AOS**: Animaciones al hacer scroll
- **GitHub Pages**: Hosting del sitio

## 🎯 Funcionalidades Implementadas

### ✅ **Navegación**

- Menú hamburguesa para móviles
- Navegación suave entre secciones
- Navegación por teclado accesible

### ✅ **Portafolio**

- Galería de proyectos con filtros
- Categorización (Residencial/Comercial)
- Imágenes optimizadas y responsivas

### ✅ **Servicios**

- Catálogo de servicios ofrecidos
- Características detalladas
- Iconos SVG personalizados

### ✅ **Contacto**

- Formulario de cotización
- Validación de campos
- Integración con WhatsApp
- Información de contacto

### ✅ **SEO y Rendimiento**

- Meta tags completos
- Open Graph para redes sociales
- Core Web Vitals optimizados
- Imágenes optimizadas
- Fuentes preload

## 🏛️ Patrón MVC Implementado

### **Separación de Responsabilidades**

- **Modelos**: Solo manejan datos y lógica de negocio
- **Controladores**: Solo manejan lógica de aplicación
- **Vistas**: Solo manejan presentación y UI

### **Beneficios Obtenidos**

- ✅ **Mantenibilidad**: Código fácil de mantener
- ✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades
- ✅ **Reutilización**: Componentes y controladores reutilizables
- ✅ **Testabilidad**: Cada capa testeable independientemente
- ✅ **Claridad**: Responsabilidades bien definidas

## 📊 Métricas de Rendimiento

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Tamaño de bundle**: Optimizado
- **Imágenes**: Comprimidas y responsivas

## 🔄 Flujo de Desarrollo

1. **Definir Modelo**: Crear interfaces en `models/`
2. **Crear Datos**: Agregar datos en `models/data.ts`
3. **Implementar Controlador**: Crear lógica en `controllers/`
4. **Desarrollar Vista**: Crear componentes en `components/`
5. **Conectar**: Usar controladores en vistas

## 📝 Convenciones de Nomenclatura

- **Modelos**: `Project.ts`, `Service.ts`
- **Controladores**: `ProjectController.ts`, `ServiceController.ts`
- **Vistas**: `Galeria.astro`, `Servicios.astro`
- **Configuración**: `mvc.ts`

## 🎯 Próximos Pasos

1. **Agregar más controladores** según necesidades
2. **Implementar validaciones** en controladores
3. **Agregar testing** para cada capa
4. **Optimizar rendimiento** con lazy loading
5. **Implementar caché** en controladores

---

_Este proyecto demuestra una implementación profesional del patrón MVC en Astro, proporcionando una base sólida y escalable para el desarrollo de aplicaciones web modernas._
