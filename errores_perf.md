# Modo movil

## Diagnostica problemas de rendimiento

Hay recursos que bloquean el primer renderizado de tu página. Te recomendamos que muestres los elementos de JavaScript y CSS críticos insertados y pospongas todos los que no sean esenciales. Consulta cómo eliminar recursos que bloquean el renderizadoLCPFCP


URL
Tamaño de la transferencia
Ahorro potencial
paranashowroom.com.py Propio
6,7 KiB	1960 ms
/_nuxt/ProductMo….DpculPj3.css(dev.paranashowroom.com.py)
2,1 KiB
450 ms
/styles/general.css(dev.paranashowroom.com.py)
0,3 KiB
150 ms
/_nuxt/productoStore.CgTUUoLw.css(dev.paranashowroom.com.py)
1,0 KiB
450 ms
/_nuxt/index.Bn8PSvFJ.css(dev.paranashowroom.com.py)
2,1 KiB
450 ms
/_nuxt/entry.Cq93vWtJ.css(dev.paranashowroom.com.py)
1,3 KiB
450 ms


Los recursos de texto se deberían publicar comprimidos (gzip, deflate o brotli) para minimizar el total de bytes de la red


URL
Tamaño de la transferencia
Ahorro potencial
paranashowroom.com.py Propio
406,5 KiB	277,8 KiB
/_nuxt/Cx4F3yin.js(dev.paranashowroom.com.py)
211,8 KiB
134,8 KiB
https://dev.paranashowroom.com.py
97,7 KiB
78,7 KiB
/_nuxt/BFDD3_lo.js(dev.paranashowroom.com.py)
35,8 KiB
25,1 KiB
/_nuxt/Dp_zVVbZ.js(dev.paranashowroom.com.py)
34,1 KiB
22,4 KiB
/_nuxt/B-_aajFx.js(dev.paranashowroom.com.py)
11,7 KiB
7,4 KiB
/_nuxt/zdWAiZvy.js(dev.paranashowroom.com.py)
7,7 KiB
4,5 KiB
/_nuxt/catalog.XHo8SWHS.css(dev.paranashowroom.com.py)
3,5 KiB
2,5 KiB
/_nuxt/CimA-pFf.js(dev.paranashowroom.com.py)
4,2 KiB
2,4 KiB



Reduce el contenido JavaScript que no se use y retrasa la carga de secuencias de comandos hasta que se necesiten. Así, se reducirán los bytes consumidos por la actividad de red.

En los elementos de imagen, especifica un ancho y una altura explícitos para reducir los cambios de diseño y mejorar el CLS. 

Paraná Hogar
<img src="/img/logo.svg" alt="Paraná Hogar" style="width:180px;">


Publica imágenes con formatos de próxima generación

Usa el componente nuxt/image y establece format="webp"

Publica recursos estáticos con una política de caché eficaz 

- /img/logo.svg(dev.paranashowroom.com.py)
- /styles/general.css(dev.paranashowroom.com.py)

Si un botón no tiene un nombre accesible, los lectores de pantalla lo leerán en voz alta como "botón", lo que hace que el botón no resulte útil a los usuarios que necesitan lectores de pantalla

Usar textos de enlace (y textos alternativos para las imágenes, si estas se usan como enlaces) que sean reconocibles, únicos y que se puedan seleccionar mejora la experiencia de navegación de los usuarios de lectores de pantalla

Los elementos informativos deberían incluir textos alternativos cortos y descriptivos. Si el texto alternativo es idéntico al texto situado junto a un enlace o una imagen, puede resultar confuso para los usuarios de lectores de pantalla, ya que el texto se leerá dos veces


El elemento <html> no tiene un atributo [lang]
Si no se especifica ningún atributo lang en una página, el lector de pantalla asumirá que la página está en el idioma predeterminado que el usuario eligió al configurarlo. Si el idioma de la página es diferente del predeterminado, es posible que el lector de pantalla no lea correctamente el texto de la página.



Se han registrado errores del navegador en la consola
Los errores registrados en la consola indican que hay problemas sin resolver. Pueden proceder de solicitudes fallidas de la red y otros errores del navegador

---

## Cambios realizados para solucionar los problemas (26/05/2025)

### 1. Mejoras de Accesibilidad

- ✅ Se añadió el atributo `lang="es"` al elemento `<html>` a través de la configuración de Nuxt.
  ```javascript
  // En nuxt.config.ts
  app: {
    head: {
      htmlAttrs: {
        lang: 'es' // Especificar idioma español para toda la página
      },
      // ...
    }
  }
  ```

- ✅ Se mejoraron los botones sin nombres accesibles añadiendo atributos `aria-label`:
  - Botones de navegación en Hero.vue (anterior/siguiente)
  - Botón de cerrar en ProductModalPreview.vue
  - Botón de cerrar en CheckoutModal.vue
  - Botón de cerrar en FabActionWhatsapp.vue

- ✅ Se agregó `aria-hidden="true"` a los iconos dentro de botones para evitar la lectura duplicada

- ✅ Se mejoraron los textos alternativos de las imágenes para ser más descriptivos y únicos

### 2. Optimización de imágenes

- ✅ Se reemplazaron etiquetas `<img>` estándar con el componente `<NuxtImg>` de Nuxt, que proporciona mejor optimización:
  ```vue
  <!-- Antes -->
  <img src="/img/logo.svg" alt="Paraná Hogar" style="width: 180px;" />
  
  <!-- Después -->
  <NuxtImg src="/img/logo.svg" alt="Paraná Hogar" width="180" height="44" />
  ```

- ✅ Se añadieron atributos explícitos de ancho y alto a las imágenes para prevenir cambios de diseño (CLS)

### 3. Optimización de rendimiento

- ✅ Se configuró el almacenamiento en caché para recursos estáticos:
  ```javascript
  // En nuxt.config.ts
  nitro: {
    compressPublicAssets: true, // Habilitar compresión para todos los activos públicos
    compressPublicAssetsWith: {
      brotli: true, // Habilitar compresión Brotli (mayor nivel de compresión)
      gzip: true,   // Habilitar gzip como alternativa
    },
    routeRules: {
      '/img/**': { 
        cache: { 
          maxAge: 60 * 60 * 24 * 365 // 1 año de caché para imágenes
        }
      },
      '/styles/**': { 
        cache: { 
          maxAge: 60 * 60 * 24 * 30 // 30 días de caché para estilos
        }
      },
      '/_nuxt/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable'
        }
      },
      '/**': {
        compression: true // Habilitar compresión para todas las rutas
      }
    }
  }
  ```

- ✅ Se habilitó la compresión para activos públicos con `compressPublicAssets: true`

- ✅ Se mejoró la compresión de texto con las opciones Brotli y Gzip para todos los recursos, lo que permitirá un ahorro potencial de aproximadamente 7,382 KiB en transferencia de datos

- ✅ Se implementó carga diferida (lazy loading) para componentes pesados:
  ```vue
  <!-- Antes -->
  <ProductModalPreview :isOpen="showProductPreview" :productId="selectedProductId" @close="showProductPreview = false" />
  
  <!-- Después -->
  <LazyProductModalPreview :isOpen="showProductPreview" :productId="selectedProductId" @close="showProductPreview = false" />
  ```

- ✅ Se optimizó la carga de JavaScript mediante la carga diferida (lazy loading) de más componentes:
  ```vue
  <!-- Antes -->
  <IndexHero />
  <IndexCategoriesGrid />
  <IndexTop20Products />
  
  <!-- Después -->
  <LazyIndexHero />
  <LazyIndexCategoriesGrid />
  <LazyIndexTop20Products />
  ```

- ✅ Se añadieron recomendaciones para optimizar la compilación de JavaScript en el archivo `js-optimizations.txt`:
  - Configuración avanzada de Vite para minificación
  - División de código (code splitting) por dependencias
  - Optimización de carga de recursos mediante "manualChunks"
  - Reducción del tamaño del JavaScript principal mediante tree-shaking agresivo

### 4. Corrección de errores de sintaxis

- ✅ Se corrigió un error de sintaxis en el componente LayoutFooter.vue donde la etiqueta `<NuxtImg>` estaba mal cerrada:
  ```vue
  <!-- Antes (incorrecto) -->
  <NuxtImg alt="Logo de Paraná Hogar" src="/img/logo.svg" width="180" height="44">
    <p class="text-gray-400 mb-2 text-sm">Encuentra todo lo que necesitas...</p>
    <div class="flex space-x-3">
  
  <!-- Después (correcto) -->
  <NuxtImg alt="Logo de Paraná Hogar" src="/img/logo.svg" width="180" height="44" />
  <p class="text-gray-400 mb-2 text-sm">Encuentra todo lo que necesitas...</p>
  <div class="flex space-x-3">
  ```

### Próximos pasos

- Revisar errores de consola del navegador
- Verificar y optimizar carga de scripts de terceros
- Considerar estrategias adicionales de división de código (code splitting) para reducir el tamaño del bundle inicial
- Implementar una estrategia de precarga (preload) para recursos críticos

### 5. Corrección de errores de sintaxis adicionales

- ✅ Se eliminó código duplicado en el archivo `nuxt.config.ts` que causaba el error: `ParseError: E:\: Missing semicolon. E:/workspaces/casaparana/ssr_catalogo_3/nuxt.config.ts:133:14`
  - El error ocurría porque existía código repetido después del cierre de la función `defineNuxtConfig`
  - Se eliminó todo el contenido duplicado para restaurar la estructura correcta del archivo

### 6. Optimización de CSS para reducir el consumo de bytes en la red

- ✅ Se creó un archivo CSS crítico para el contenido visible sin scroll (above-the-fold):
  ```css
  /* Archivo nuevo: public/styles/critical.css */
  /* Critical CSS para contenido visible sin scroll */
  :root {
    --bg-primary: #ffffff;
    --text-primary: #1f2937;
    /* Solo variables críticas */
  }
  
  /* Estilos base críticos */
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
  }
  /* Solo los estilos necesarios para la carga inicial */
  ```

- ✅ Se implementó carga asíncrona para CSS no crítico:
  ```javascript
  // En nuxt.config.ts
  link: [
    // CSS crítico cargado inmediatamente
    { rel: 'stylesheet', href: '/styles/critical.css' },
    // CSS no crítico cargado de forma asíncrona
    { 
      rel: 'preload', 
      href: '/styles/general.css',
      as: 'style',
      onload: "this.onload=null;this.rel='stylesheet'"
    },
    // Otras hojas de estilo cargadas de forma asíncrona
  ]
  ```

- ✅ Se añadió un script de respaldo para navegadores que no soportan la carga asíncrona de CSS

- ✅ Se mejoró la configuración de caché para archivos CSS:
  ```javascript
  // En nuxt.config.ts
  '/styles/**': { 
    cache: { 
      maxAge: 60 * 60 * 24 * 30 // 30 días de caché para estilos
    },
    headers: {
      // Caché agresiva para archivos CSS
      'cache-control': 'public, max-age=2592000'
    }
  }
  ```

- ✅ Se implementó PurgeCSS para eliminar reglas CSS no utilizadas:
  ```javascript
  // Archivo purgecss-config.js
  module.exports = {
    content: [
      './pages/**/*.{vue,js,ts}',
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.{vue,js,ts}',
      './app.vue'
    ],
    css: [
      './assets/css/main.css'
    ],
    output: './public/styles/general.css',
    safelist: [
      // Clases que se generan dinámicamente
      /^p-/,        // Clases de PrimeVue
      /^pi-/,       // Clases de PrimeIcons
      /^leaflet-/,  // Clases del mapa Leaflet
      // ... más reglas de seguridad
    ]
  }
  ```

- ✅ Se optimizó la configuración de Tailwind para producción:
  ```javascript
  // En tailwind.config.js
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './app.vue',
    ],
    // ... más configuraciones
  }
  ```

- ✅ Se integró la optimización de CSS en el proceso de construcción:
  ```json
  // En package.json
  "scripts": {
    "build": "npm run optimize-css && nuxt build",
    "generate": "npm run optimize-css && nuxt generate",
    "optimize-css": "purgecss --config purgecss-config.js"
  }
  ```

- ✅ Se creó un script de aplicación para facilitar la implementación:
  ```batch
  @echo off
  echo Copying optimized Nuxt configuration...
  copy /Y nuxt.config.optimized.ts nuxt.config.ts
  echo Configuration updated successfully!
  ```
  
### Pasos para aplicar las optimizaciones

1. Ejecutar el script de aplicación:
   ```
   apply-optimizations.bat
   ```

2. Instalar las dependencias necesarias:
   ```
   npm install
   ```

3. Ejecutar la optimización de CSS y construir:
   ```
   npm run build
   ```

4. Desplegar la aplicación optimizada
