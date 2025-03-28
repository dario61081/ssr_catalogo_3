<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'simple-layout'
})

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  // Verificar si el usuario está autenticado
  if (!authStore.isAuthenticated) {
    // Redirigir a la página de registro si no está autenticado
    router.push('/cuenta/registro')
  }
})

// Función para cerrar sesión
const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6">Mi Cuenta</h2>
      
      <div class="mb-8 border-b pb-6">
        <h3 class="text-lg font-medium mb-4">Información Personal</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Nombre</p>
            <p class="font-medium">{{ authStore.user?.nombre || 'No disponible' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Apellido</p>
            <p class="font-medium">{{ authStore.user?.apellido || 'No disponible' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Correo electrónico</p>
            <p class="font-medium">{{ authStore.user?.email || 'No disponible' }}</p>
          </div>
        </div>
      </div>
      
      <div class="mb-8 border-b pb-6">
        <h3 class="text-lg font-medium mb-4">Mis Pedidos</h3>
        <p class="text-gray-500">No tienes pedidos recientes.</p>
      </div>
      
      <div class="mb-8 border-b pb-6">
        <h3 class="text-lg font-medium mb-4">Direcciones de Envío</h3>
        <p class="text-gray-500">No tienes direcciones guardadas.</p>
        <button class="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Agregar dirección
        </button>
      </div>
      
      <div class="flex justify-end">
        <button 
          @click="logout" 
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-white {
  background-color: white;
}
</style>
