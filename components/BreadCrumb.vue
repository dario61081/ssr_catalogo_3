<template>
  <nav class="breadcrumb text-sm" aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center space-x-1">
      <li class="flex items-center">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 transition-colors">
          <i class="pi pi-home mr-1"></i>
          <span>Inicio</span>
        </NuxtLink>
      </li>
      
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <span class="text-gray-400 mx-1">/</span>
        <NuxtLink 
          v-if="item.link && index < items.length - 1" 
          :to="item.link" 
          class="text-gray-500 hover:text-gray-700 transition-colors"
        >
          {{ item.text }}
        </NuxtLink>
        <span v-else class="text-gray-900 font-medium">{{ item.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array as () => Array<{ text: string; link?: string }>,
    default: () => []
  }
});
</script>
