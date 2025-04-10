<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>
    
    <div class="prose">
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">¿Cómo puedo realizar un pedido?</h2>
        <p>Para realizar un pedido, simplemente navegue por nuestro catálogo, seleccione los productos deseados y añádalos al carrito. Una vez que haya terminado de seleccionar, vaya al carrito y siga los pasos para completar la compra.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">¿Cuáles son los métodos de pago aceptados?</h2>
        <p>Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal y transferencia bancaria. Todos los pagos se procesan de forma segura.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">¿Cuánto tiempo tarda en llegar mi pedido?</h2>
        <p>El tiempo de entrega depende de su ubicación. Generalmente, los pedidos nacionales se entregan en 3-5 días hábiles, mientras que los envíos internacionales pueden tardar entre 7-14 días hábiles.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">¿Puedo devolver un producto?</h2>
        <p>Sí, ofrecemos devoluciones dentro de los 30 días posteriores a la recepción del producto. El artículo debe estar en su estado original y sin usar. Para iniciar una devolución, contacte a nuestro servicio de atención al cliente.</p>
      </section>
      
      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-3">¿Cómo puedo contactar al servicio de atención al cliente?</h2>
        <p>Puede contactarnos a través de nuestro formulario de contacto en la página de Contacto, por correo electrónico a info@paranahogar.com.py o visitando nuestros showrooms:</p>
        <ul class="mt-2 ml-6 list-disc">
          <li><strong>Showroom Encarnación:</strong> Padre Kreusser c/Gral. Artigas - Tel: +595 71 202 145</li>
          <li><strong>Showroom Asunción:</strong> Avda. República Argentina & Dr. Hassler - Tel: +595 21 326 0656</li>
        </ul>
        <p class="mt-2">Horario de atención: Lunes a Viernes de 9:00 a 18:00 y Sábados de 9:00 a 13:00.</p>
      </section>
    </div>
  </div>
</template>

<script>
  definePageMeta({
    layout: 'simple-layout'
  })
</script>

<style scoped>
.prose {
  color: #333;
  line-height: 1.6;
}

h1, h2 {
  color: #1a1a1a;
}

section {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 1rem;
}

section:last-child {
  border-bottom: none;
}

ul {
  margin-top: 0.5rem;
}
</style>
