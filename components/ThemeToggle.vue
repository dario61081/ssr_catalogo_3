<!-- A simple theme toggle button component -->
<template>
  <div class="theme-switch" :class="{ 'dark': isDarkMode }" @click="toggleTheme"
    :title="isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
    <div class="switch-track">
      <div class="icons">
        <i class="pi pi-sun"></i>
        <i class="pi pi-moon"></i>
      </div>
      <div class="switch-thumb"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/themeStore';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { isDarkMode } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;
</script>

<style scoped>
.theme-switch {
  position: relative;
  cursor: pointer;
  width: 56px;
  height: 28px;
  padding: 2px;
  border-radius: 14px;
  background-color: var(--bg-secondary);
  transition: background-color 0.3s ease;
}

.switch-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.icons {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  color: var(--text-primary);
}

.icons i {
  font-size: 0.9rem;
  z-index: 1;
}

.switch-thumb {
  position: absolute;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background-color: var(--text-primary);
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.theme-switch.dark .switch-thumb {
  transform: translate(28px, -50%);
}

.theme-switch:hover {
  opacity: 0.9;
}
</style>