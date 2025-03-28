<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
