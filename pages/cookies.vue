<script lang="ts" setup>
// Política de cookies component
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold mb-6">Política de Cookies</h1>
    
    <div class="prose">
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Estas cookies nos ayudan a mejorar su experiencia de navegación, recordar sus preferencias y entender cómo utilizan los visitantes nuestro sitio.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Tipos de cookies que utilizamos</h2>
        <ul>
          <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
          <li><strong>Cookies de rendimiento:</strong> Nos ayudan a entender cómo interactúan los usuarios con nuestro sitio.</li>
          <li><strong>Cookies de funcionalidad:</strong> Permiten recordar sus preferencias para mejorar su experiencia.</li>
          <li><strong>Cookies de publicidad:</strong> Utilizadas para mostrarle anuncios relevantes según sus intereses.</li>
        </ul>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Control de cookies</h2>
        <p>Puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envía una cookie. Sin embargo, si rechaza las cookies, es posible que algunas partes de nuestro sitio no funcionen correctamente.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Cookies de terceros</h2>
        <p>Nuestro sitio puede utilizar servicios de terceros que también establecen sus propias cookies. No tenemos control sobre estas cookies. Le recomendamos consultar las políticas de privacidad de estos terceros para obtener más información.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Actualizaciones a esta política</h2>
        <p>Podemos actualizar nuestra política de cookies ocasionalmente. Le recomendamos revisar esta página periódicamente para estar informado sobre cualquier cambio.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.prose {
  color: #333;
  line-height: 1.6;
}

h1, h2 {
  color: #1a1a1a;
}

ul {
  margin-bottom: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>