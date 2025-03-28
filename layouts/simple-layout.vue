<template>
    <SimpleHeader />
    <slot></slot>    
    <Footer />
</template>

<script setup>
import SimpleHeader from '~/components/SimpleHeader.vue'
import Footer from '~/components/Footer.vue'
</script>
