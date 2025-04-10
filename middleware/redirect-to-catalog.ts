export default defineNuxtRouteMiddleware((to) => {
  // Solo redirigir si estamos en la página de inicio
  if (to.path === '/') {
    return navigateTo('/catalog')
  }
})
