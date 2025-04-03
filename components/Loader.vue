<template>
  <div class="modal-overlay">
    <div class="modal-spinner-container">
      <div class="spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-dot"></div>
      </div>
      <div class="spinner-text">Cargando...</div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  backdrop-filter: blur(2px);
}

.modal-spinner-container {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
}

.spinner {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 4px solid rgba(128, 128, 128, 0.1);
  border-top-color: #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-dot {
  position: absolute;
  top: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: #e53e3e; /* Rojo que hace juego con la paleta */
  border-radius: 50%;
  transform: translateX(-50%);
  animation: pulse 1s ease-in-out infinite;
}

.spinner-text {
  font-size: 16px;
  color: #4a5568;
  font-weight: 500;
  text-align: center;
  margin-top: 0.5rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(-50%) scale(1.5);
    opacity: 0.7;
  }
}
</style>
