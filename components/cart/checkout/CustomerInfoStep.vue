<template>
    <div class="space-y-4">
        <h4 class="font-semibold text-gray-900 text-lg pb-2 border-b">Información del Cliente</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CI o RUC</label>
                <input v-model="customerInfo.ruc" type="text" required placeholder="Ej: 1234567-8 o 80012345-6" :class="[
                    'w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all',
                    errors.ruc ? 'border-red-500 bg-red-50' : ''
                ]">
                <p v-if="errors.ruc" class="text-xs text-red-600 mt-1">{{ errors.ruc }}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input v-model="customerInfo.name" type="text" required placeholder="Ej: Juan Pérez" :class="[
                    'w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all',
                    errors.name ? 'border-red-500 bg-red-50' : ''
                ]">
                <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input v-model="customerInfo.telefono" type="text" required placeholder="Ej: 0981 123456" :class="[
                    'w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all',
                    errors.telefono ? 'border-red-500 bg-red-50' : ''
                ]">
                <p v-if="errors.telefono" class="text-xs text-red-600 mt-1">{{ errors.telefono }}</p>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input v-model="customerInfo.email" type="email" required placeholder="Ej: correo@ejemplo.com" :class="[
                    'w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all',
                    errors.email ? 'border-red-500 bg-red-50' : ''
                ]">
                <p v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</p>
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Dirección de envío</label>
            <textarea v-model="customerInfo.address" required rows="2" placeholder="Ej: Av. Mcal. 1234, Asunción"
                :class="[
                    'w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all',
                    errors.address ? 'border-red-500 bg-red-50' : ''
                ]"></textarea>
            <p v-if="errors.address" class="text-xs text-red-600 mt-1">{{ errors.address }}</p>

            <!-- Geolocation checkbox -->
            <div class="mt-2">
                <div class="flex items-center space-x-3">
                    <label class="flex items-center space-x-2 text-sm text-gray-600 m-0">
                        <input v-model="useGeolocationModel" type="checkbox"
                            class="rounded border-gray-300 text-orange-500 focus:ring-orange-400">
                        <span>Georeferenciar mi ubicación</span>
                    </label>
                    <button v-if="useGeolocationModel" type="button" @click="detectCurrentLocation"
                        class="bg-white border border-orange-200 text-orange-500 rounded-lg px-3 py-1.5 text-xs shadow-sm hover:bg-orange-50 transition-colors">
                        <i class="pi pi-map-marker mr-1"></i> Detectar mi ubicación
                    </button>
                </div>
            </div>

            <!-- Map container -->
            <div v-if="useGeolocationModel" class="mt-3 relative">
                <div id="map" class="h-64 rounded-lg border shadow-sm"></div>
                <transition name="fade">
                    <div v-if="showLocationMsg"
                        class="absolute left-1/2 -translate-x-1/2 top-2 z-20 bg-yellow-50 border border-yellow-400 text-yellow-800 px-4 py-2 rounded shadow-md text-xs flex items-center gap-2">
                        <i class="pi pi-map-marker"></i>
                        Por favor, permite el acceso a tu ubicación para detectarla automáticamente.
                    </div>
                </transition>
                <p class="text-sm text-gray-500 mt-1">
                    Mueve el pin para ajustar tu ubicación exacta
                </p>
                <div v-if="customerInfo.coordinates" class="text-xs text-gray-500 mt-1">
                    Coordenadas: {{ customerInfo.coordinates.lat.toFixed(6) }}, {{
                        customerInfo.coordinates.lng.toFixed(6) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';

// Props
const props = defineProps<{
    customerInfo: {
        ruc: string;
        name: string;
        telefono: string;
        email: string;
        address: string;
        paymentMethod: string;
        coordinates: { lat: number; lng: number } | null;
    };
    errors: {
        ruc: string;
        name: string;
        telefono: string;
        email: string;
        address: string;
    };
    useGeolocation: boolean;
    showLocationMsg: boolean;
}>();

// Emits
const emit = defineEmits(['update:customerInfo', 'update:useGeolocation', 'detect-location']);

// Modelo para two-way binding
const useGeolocationModel = ref(props.useGeolocation);

// Observar cambios en el modelo
watch(useGeolocationModel, (newValue) => {
    emit('update:useGeolocation', newValue);
});

// Inicializar mapa
onMounted(async () => {
    if (props.useGeolocation) {
        await nextTick();
        // El mapa se inicializa desde el componente padre
    }
});

// Detectar ubicación actual
const detectCurrentLocation = () => {
    emit('detect-location');
};
</script>