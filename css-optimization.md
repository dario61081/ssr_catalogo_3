# Optimización de CSS - Guía de Implementación (26/05/2025)

Este documento describe las mejoras implementadas para optimizar la carga y el rendimiento de CSS en el sitio web de Casa Paraná.

## Mejoras implementadas

### 1. Separación de CSS crítico y no crítico

- Se creó un archivo `critical.css` con los estilos esenciales para el contenido visible inicialmente
- Se configuró la carga asíncrona para los estilos no críticos con el atributo `preload`
- Se agregó un script de fallback para navegadores que no soportan `preload`

### 2. Eliminación de reglas CSS no utilizadas

- Se implementó PurgeCSS para analizar el código y eliminar estilos no utilizados
- Se configuró una lista de seguridad (safelist) para preservar clases generadas dinámicamente
- Se integró la optimización en el proceso de construcción del proyecto

### 3. Optimización de Tailwind CSS

- Se configuró la purga de clases no utilizadas de Tailwind en modo producción
- Se definieron reglas específicas para preservar clases críticas

### 4. Estrategia de caché mejorada

- Se establecieron políticas de caché agresivas para archivos CSS estáticos
- Se utilizaron encabezados de caché adecuados para recursos inmutables

## Instrucciones de implementación

### Paso 1: Aplicar la configuración optimizada

```batch
apply-optimizations.bat
```

Este script copia la configuración optimizada de Nuxt al archivo principal.

### Paso 2: Instalar dependencias (si no se ha hecho antes)

```bash
npm install
```

### Paso 3: Ejecutar la optimización de CSS

```bash
npm run optimize-css
```

Este comando ejecuta PurgeCSS para eliminar estilos no utilizados.

### Paso 4: Construir la aplicación con las optimizaciones

```bash
npm run build
```

Ahora el comando build incluye automáticamente la optimización de CSS.

## Resultados esperados

- **Reducción significativa del tamaño de CSS**: Eliminación de reglas no utilizadas
- **Carga más rápida**: El CSS crítico se carga inmediatamente, mejorando el tiempo de renderizado
- **Menor consumo de datos**: Especialmente beneficioso para usuarios móviles
- **Mejor rendimiento**: Menor tiempo de análisis y aplicación de estilos CSS

## Mantenimiento

Si se añaden nuevos componentes o estilos, es recomendable ejecutar nuevamente:

```bash
npm run optimize-css
```

## Verificación

Para verificar que las optimizaciones están funcionando correctamente:

1. Abrir las herramientas de desarrollador del navegador
2. Verificar el tamaño de los archivos CSS en la pestaña Network
3. Comprobar que los estilos se aplican correctamente en toda la aplicación
