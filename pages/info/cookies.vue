<script lang="ts" setup>
// Política de cookies component
definePageMeta({
  layout: 'simple-layout'
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <BreadCrumb :items="[{ text: 'Política de Cookies' }]" class="mb-6" />
    
    <h1 class="text-3xl font-bold mb-6">Política de Cookies</h1>
    
    <div class="prose prose-lg">
      <p class="mb-4">En Paraná Hogar utilizamos cookies para mejorar su experiencia en nuestro sitio web. Esta política de cookies explica qué son las cookies, cómo las utilizamos y cómo puede gestionarlas.</p>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tableta o móvil) cuando visita un sitio web. Las cookies ayudan a que el sitio web recuerde información sobre su visita, como su idioma preferido y otras configuraciones. Esto puede facilitar su próxima visita y hacer que el sitio le resulte más útil.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Tipos de cookies que utilizamos</h2>
        <p>En nuestro sitio web utilizamos los siguientes tipos de cookies:</p>
        
        <h3 class="text-lg font-semibold mt-4 mb-2">Cookies esenciales</h3>
        <p>Estas cookies son necesarias para el funcionamiento básico de nuestro sitio web. Le permiten navegar por nuestro sitio y utilizar sus funciones, como acceder a áreas seguras. Sin estas cookies, no podríamos proporcionar los servicios que usted solicita.</p>
        
        <h3 class="text-lg font-semibold mt-4 mb-2">Cookies de rendimiento</h3>
        <p>Estas cookies recopilan información sobre cómo utiliza nuestro sitio web, por ejemplo, qué páginas visita con más frecuencia y si recibe mensajes de error. Estas cookies no recopilan información que lo identifique directamente; toda la información es anónima y se utiliza únicamente para mejorar el funcionamiento de nuestro sitio web.</p>
        
        <h3 class="text-lg font-semibold mt-4 mb-2">Cookies de funcionalidad</h3>
        <p>Estas cookies permiten que nuestro sitio web recuerde las elecciones que realiza (como su nombre de usuario, idioma o la región en la que se encuentra) y proporcione funciones mejoradas y más personales. También pueden utilizarse para recordar los cambios que ha realizado en el tamaño del texto, las fuentes y otras partes de las páginas web que puede personalizar.</p>
        
        <h3 class="text-lg font-semibold mt-4 mb-2">Cookies de publicidad</h3>
        <p>Estas cookies se utilizan para mostrarle anuncios más relevantes para usted y sus intereses. También se utilizan para limitar el número de veces que ve un anuncio, así como para ayudar a medir la eficacia de las campañas publicitarias. Recuerdan que ha visitado un sitio web y esta información se comparte con otras organizaciones, como los anunciantes.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Cómo gestionar las cookies</h2>
        <p>Puede controlar y/o eliminar las cookies según lo desee. Puede eliminar todas las cookies que ya están en su dispositivo y puede configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si hace esto, es posible que tenga que ajustar manualmente algunas preferencias cada vez que visite un sitio y que algunos servicios y funcionalidades no funcionen.</p>
        
        <p class="mt-3">Para obtener más información sobre cómo gestionar las cookies en su navegador, visite los siguientes enlaces:</p>
        <ul class="list-disc pl-6 mt-2">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Microsoft Edge</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Safari</a></li>
        </ul>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Cambios en nuestra política de cookies</h2>
        <p>Cualquier cambio que podamos hacer en nuestra política de cookies en el futuro se publicará en esta página. Por favor, compruebe con frecuencia para ver cualquier actualización o cambio en nuestra política de cookies.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Contacto</h2>
        <p>Si tiene alguna pregunta sobre nuestra política de cookies, no dude en ponerse en contacto con nosotros a través de nuestro <a href="/info/contacto" class="text-blue-600 hover:underline">formulario de contacto</a> o enviando un correo electrónico a info@paranahogar.com.py.</p>
      </section>
      
      <p class="mt-8 text-sm text-gray-600">Última actualización: Abril 2025</p>
    </div>
  </div>
</template>

<style scoped>
.prose {
  color: #333;
  line-height: 1.6;
}

h1, h2, h3 {
  color: #000;
}

section {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 1rem;
}

section:last-child {
  border-bottom: none;
}
</style>
