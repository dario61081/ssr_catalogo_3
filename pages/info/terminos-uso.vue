<script lang="ts" setup>
// Términos de uso component
definePageMeta({
  layout: 'simple-layout'
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <BreadCrumb :items="[{ text: 'Términos de Uso' }]" class="mb-6" />
    
    <h1 class="text-3xl font-bold mb-6">Términos y Condiciones de Uso</h1>
    
    <div class="prose prose-lg">
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">1. Aceptación de los Términos</h2>
        <p>Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Términos y Condiciones de Uso, todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, está prohibido usar este sitio.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">2. Uso de la Plataforma</h2>
        <p>El contenido de este sitio web es únicamente para fines informativos. Está prohibido el uso no autorizado del sitio o de sus contenidos, lo que podría violar las leyes de propiedad intelectual.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">3. Precisión de Contenidos</h2>
        <p>El contenido de este sitio web puede contener errores técnicos, tipográficos o fotográficos. No garantizamos que cualquier contenido sea preciso, completo o actual. Podemos realizar cambios al contenido en cualquier momento sin previo aviso.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">4. Enlaces a Terceros</h2>
        <p>Este sitio puede contener enlaces a sitios web de terceros. Estos enlaces son proporcionados únicamente para su conveniencia. No tenemos control sobre el contenido de estos sitios y no asumimos responsabilidad por ellos.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">5. Modificaciones a los Términos</h2>
        <p>Podemos revisar estos términos de uso en cualquier momento sin previo aviso. Al usar este sitio, usted acepta estar sujeto a la versión actual de estos Términos y Condiciones.</p>
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