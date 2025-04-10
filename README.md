# Catálogo Online Paraná Hogar

Este proyecto es un catálogo de productos multicategoría desarrollado con Nuxt 3, diseñado para mostrar productos de Paraná Hogar con funcionalidades de filtrado, ordenamiento y visualización detallada.

## Características

- Catálogo de productos con imágenes, descripciones y precios
- Filtrado por categorías y subcategorías
- Ordenamiento de productos por diferentes criterios
- Páginas de detalle de producto con información completa
- Sistema de favoritos con almacenamiento local
- Carrito de compras funcional
- Diseño responsivo para dispositivos móviles y de escritorio
- SSR (Server-Side Rendering) para mejor SEO

## Tecnologías

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Manejo de Estado**: [Pinia](https://pinia.vuejs.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Iconografía**: [PrimeIcons](https://primevue.org/icons)
- **Bus de Eventos**: [mitt](https://github.com/developit/mitt)

## Configuración

Asegúrate de instalar las dependencias:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

## Servidor de Desarrollo

Inicia el servidor de desarrollo en http://localhost:3010

```bash
npm run dev
```

## Producción

Construye la aplicación para producción:

```bash
npm run build
```

Vista previa local de la versión de producción:

```bash
npm run preview
```

## Generación Estática

Para generar una versión estática del sitio:

```bash
npm run generate
```

## Estructura del Proyecto

```
├── assets/              # Recursos estáticos (CSS, imágenes)
├── components/          # Componentes Vue reutilizables
├── pages/               # Páginas de la aplicación
├── public/              # Archivos públicos
├── stores/              # Stores de Pinia
├── types/               # Definiciones de tipos TypeScript
├── utils/               # Utilidades y funciones auxiliares
├── app.vue              # Componente principal de la aplicación
├── nuxt.config.ts       # Configuración de Nuxt
└── tailwind.config.js   # Configuración de Tailwind CSS
```

## API de Datos

El catálogo consume datos de las siguientes APIs:

- **Categorías**: `https://panel.colchonesparana.com.py/articulos/divisiones/[TOKEN]/TODOS`
- **Productos**: `https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/[TOKEN]`
- **Detalle de Producto**: `https://panel.colchonesparana.com.py/api/v2/articulos/detalle/[CODIGO]/[TOKEN]`

## Mantenimiento

Para actualizar el repositorio y reconstruir la aplicación:

```bash
git pull
npm install
npm run build
npm run preview
```
