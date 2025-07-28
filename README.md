# IG Construcciones - Sitio Web Profesional SE LO PEDI A GPTTTT

Sitio web profesional para IG Construcciones, empresa de arquitectura y construcción en la V Región de Chile. Desarrollado con Astro y siguiendo el patrón MVC para máxima mantenibilidad y escalabilidad.

## 🏗️ Estructura del Proyecto (Patrón MVC)

```
src/
├── models/             # 🗃️ Modelos de datos (MVC)
│   ├── Project.ts      # Interfaces y tipos de datos
│   └── data.ts         # Datos estáticos y funciones del modelo
├── controllers/        # 🎮 Controladores (MVC)
│   ├── BaseController.ts    # Controlador base con CRUD
│   ├── ProjectController.ts # Controlador de proyectos
│   ├── ServiceController.ts # Controlador de servicios
│   └── ContactController.ts # Controlador de contacto
├── config/             # ⚙️ Configuración MVC
│   └── mvc.ts         # Configuración y tipos MVC
├── components/         # 👁️ Vistas/Componentes (MVC)
│   ├── ui/            # Componentes de interfaz reutilizables
│   ├── sections/      # Secciones principales (Vistas)
│   └── layout/        # Componentes de estructura
├── layouts/           # Layouts de página
│   └── Layout.astro   # Layout principal
├── pages/             # Páginas del sitio (Controladores de página)
│   ├── index.astro    # Página principal
│   └── 404.astro      # Página de error
├── styles/            # Estilos globales
│   └── global.css     # CSS global
├── assets/            # Recursos estáticos
│   ├── *.webp         # Imágenes optimizadas
│   ├── *.png          # Imágenes PNG
│   └── *.svg          # Iconos y gráficos
└── types/             # Tipos TypeScript
    └── index.ts       # Definiciones de tipos
```

## 📋 Descripción del Proyecto

Este es un sitio web profesional para **IG Construcciones**, una empresa de arquitectura y construcción ubicada en la V Región de Chile. El proyecto está desarrollado con **Astro** y sigue el patrón **MVC (Modelo-Vista-Controlador)** para garantizar código mantenible, escalable y bien organizado.

### 🎯 Características Principales

- **Arquitectura MVC**: Separación clara de responsabilidades
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags, Open Graph, Twitter Cards
- **Accesibilidad**: Cumple estándares WCAG
- **Rendimiento Optimizado**: Core Web Vitals optimizados
- **TypeScript**: Tipado fuerte para mayor robustez

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
- `src/components/sections/Resenas.astro`: Testimonios de clientes
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

*Este proyecto demuestra una implementación profesional del patrón MVC en Astro, proporcionando una base sólida y escalable para el desarrollo de aplicaciones web modernas.*
