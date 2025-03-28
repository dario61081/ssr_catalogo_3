<template>
  <div class="flex justify-center items-center p-4">
    <span class="loading-text">Cargando...</span>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.loading-skeleton {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200% 100%;
  animation: pulse 1.5s infinite;
}

.loading-text {
  font-weight: 500;
  background: linear-gradient(90deg, #555, #888, #555);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: textGradient 2s linear infinite;
}

@keyframes pulse {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}

@keyframes textGradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}
</style>
