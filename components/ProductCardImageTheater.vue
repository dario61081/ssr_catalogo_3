<template>
	<div v-if="isOpen"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity">
		<div class="relative bg-white rounded-lg shadow-xl w-[90vw] max-w-[90vw] h-[90dvh] max-h-[90dvh] overflow-hidden flex flex-col">
			<!-- Close button -->
			<button
				class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors"
				@click="close"
			>
				<svg class="h-5 w-5 text-gray-700"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M6 18L18 6M6 6l12 12"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"></path>
				</svg>
			</button>

			<!-- Main image container with zoom functionality -->
			<div
				ref="imageContainer"
				class="flex-1 flex items-center justify-center bg-gray-100 p-4 relative overflow-hidden min-h-[65dvh]"
				@mouseenter="isZooming = true"
				@mouseleave="isZooming = false"
				@mousemove="handleMouseMove"
			>
				<!-- Normal image (shown when not zooming) -->
				<div class="relative flex items-center justify-center w-full h-full">
					<img
						v-if="product && images.length > 0"
						ref="productImage"
						:alt="product.nombre"
						:class="{ 'opacity-0': isZooming && !isMobile }"
						:src="images[currentImageIndex]"
						class="max-w-full max-h-full object-contain cursor-magnifying-glass transition-opacity duration-300"
					/>

					<!-- Zoomed image container -->
					<div
						v-show="isZooming && !isMobile"
						ref="zoomContainer"
						class="absolute inset-0 overflow-hidden flex items-center justify-center"
					>
						<img
							v-if="product && images.length > 0"
							ref="zoomedImage"
							:alt="product.nombre"
							:src="images[currentImageIndex]"
							:style="zoomedImageStyle"
							class="w-full h-full object-contain transition-transform duration-100"
						/>
					</div>
				</div>

				<div v-if="!product || images.length === 0"
					class="text-gray-400 text-center">
					<svg class="mx-auto h-12 w-12"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"></path>
					</svg>
					<p class="mt-2">No hay imágenes disponibles</p>
				</div>
			</div>

			<!-- Navigation arrows for larger screens -->
			<button
				v-if="images.length > 1"
				class="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors hidden md:block"
				@click="prevImage"
			>
				<svg class="h-6 w-6 text-gray-700"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M15 19l-7-7 7-7"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"></path>
				</svg>
			</button>

			<button
				v-if="images.length > 1"
				class="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-colors hidden md:block"
				@click="nextImage"
			>
				<svg class="h-6 w-6 text-gray-700"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M9 5l7 7-7 7"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"></path>
				</svg>
			</button>

			<!-- Thumbnail gallery -->
			<div class="p-4 bg-white border-t border-gray-200">
				<div class="flex space-x-2 justify-center">
					<button
						v-for="(image, index) in images.slice(0, 3)"
						:key="index"
						:class="[
              'border-2 rounded-md p-1 transition-all',
              currentImageIndex === index ? 'border-blue-500' : 'border-gray-300 hover:border-gray-500'
            ]"
						class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						@click="setCurrentImage(index)"
					>
						<div class="relative h-16 w-16">
							<img
								:alt="`Miniatura ${index + 1}`"
								:src="image"
								class="h-16 w-16 object-contain"
							/>
							<!-- Indicador de posición del cursor -->
							<div
								v-if="isZooming && !isMobile && currentImageIndex === index"
								:style="cursorIndicatorStyle"
								class="absolute border-2 border-red-500 bg-red-500 bg-opacity-30 pointer-events-none rounded-full z-10"
							></div>
						</div>
					</button>

					<!-- Placeholder thumbnails if less than 3 images -->
					<template v-if="images.length < 1">
						<div
							v-for="i in 3 - images.length"
							:key="`placeholder-${i}`"
							class="border-2 border-gray-200 rounded-md p-1 h-[66px] w-[66px] flex items-center justify-center bg-gray-50"
						>
							<svg class="h-8 w-8 text-gray-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"></path>
							</svg>
						</div>
					</template>
				</div>

				<!-- Image counter -->
				<div v-if="images.length > 0"
					class="text-center text-sm text-gray-500 mt-2">
					Imagen {{ currentImageIndex + 1 }} de {{ images.length }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue';

const props = defineProps({
	isOpen: {
		type: Boolean,
		default: false
	},
	product: {
		type: Object,
		default: null
	}
});

const emit = defineEmits(['close']);

// Estado para el índice de la imagen actual
const currentImageIndex = ref(0);

// Zoom functionality
const imageContainer = ref(null);
const productImage = ref(null);
const zoomContainer = ref(null);
const zoomedImage = ref(null);
const isZooming = ref(false);
const isMobile = ref(false);

// Zoom configuration
const zoomLevel = 1.5; // Zoom magnification level (150%)

// Style for zoomed image
const zoomedImageStyle = ref({
	width: '100%',
	height: '100%',
	transform: 'translate(0px, 0px) scale(1.5)'
});

// Estilo para el indicador de posición del cursor
const cursorIndicatorStyle = ref({
	top: '0px',
	left: '0px',
	width: '10px',
	height: '10px'
});

// Detectar si es dispositivo móvil
onMounted(() => {
	checkIfMobile();
	window.addEventListener('resize', checkIfMobile);
});

onUnmounted(() => {
	window.removeEventListener('resize', checkIfMobile);
});

function checkIfMobile() {
	isMobile.value = window.innerWidth < 768;
}

// Handle mouse movement over the image
function handleMouseMove(e) {
	if (!isZooming.value || isMobile.value || !imageContainer.value || !productImage.value || !zoomedImage.value) {
		return;
	}

	// Get positions
	const containerRect = imageContainer.value.getBoundingClientRect();
	const imageRect = productImage.value.getBoundingClientRect();

	// Calculate cursor position relative to the image
	const mouseX = e.clientX - imageRect.left;
	const mouseY = e.clientY - imageRect.top;

	// Calculate the percentage position of the cursor on the image (0 to 1)
	const percentX = Math.max(0, Math.min(1, mouseX / imageRect.width));
	const percentY = Math.max(0, Math.min(1, mouseY / imageRect.height));

	// Ajustamos el cálculo para corregir los márgenes
	const maxTransformX = imageRect.width * (zoomLevel - 1);
	const maxTransformY = imageRect.height * (zoomLevel - 1);

	// Aplicamos un ajuste asimétrico para dar más espacio a la derecha
	// Desplazamos el rango de transformación horizontal
	const offsetAdjustmentLeft = 0.25; // Ajuste para el lado izquierdo
	const offsetAdjustmentRight = 0.45; // Mayor ajuste para el lado derecho

	// Mapeamos el rango [0,1] a un rango ajustado para corregir los márgenes
	// Usamos una función asimétrica que da más espacio al lado derecho
	const transformX = (percentX * (1 + offsetAdjustmentLeft + offsetAdjustmentRight) - offsetAdjustmentLeft) * maxTransformX;
	const transformY = percentY * maxTransformY;

	// Update zoomed image style
	zoomedImageStyle.value = {
		transform: `translate(-${transformX}px, -${transformY}px) scale(${zoomLevel})`,
		transformOrigin: '0 0',
		width: '100%',
		height: '100%',
		objectFit: 'contain'
	};

	// Actualizar el estilo del indicador de posición del cursor en la miniatura
	const thumbnailSize = 64;
	const indicatorSize = 12;

	cursorIndicatorStyle.value = {
		top: `${percentY * thumbnailSize - indicatorSize / 2}px`,
		left: `${percentX * thumbnailSize - indicatorSize / 2}px`,
		width: `${indicatorSize}px`,
		height: `${indicatorSize}px`,
		transform: 'translate(0, 0)',
		position: 'absolute'
	};
}

// Computar las imágenes disponibles del producto
const images = computed(() => {
	if (!props.product) return [];

	// Imagen principal siempre se incluye
	const imageList = [props.product.imagen];

	// Agregar imágenes adicionales si existen
	if (props.product.imagenes && Array.isArray(props.product.imagenes)) {
		imageList.push(...props.product.imagenes);
	}

	// Filtrar imágenes nulas o vacías
	return imageList.filter(img => img);
});

// Resetear el índice de imagen cuando cambia el producto
watch(() => props.product, () => {
	currentImageIndex.value = 0;
});

// Resetear el índice de imagen cuando se abre el modal
watch(() => props.isOpen, (newValue) => {
	if (newValue) {
		currentImageIndex.value = 0;
	}
});

// Métodos para navegación de imágenes
function prevImage() {
	if (images.value.length <= 1) return;
	currentImageIndex.value = (currentImageIndex.value - 1 + images.value.length) % images.value.length;
}

function nextImage() {
	if (images.value.length <= 1) return;
	currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
}

function setCurrentImage(index) {
	if (index >= 0 && index < images.value.length) {
		currentImageIndex.value = index;
	}
}

function close() {
	emit('close');
}
</script>

<style scoped>
.transition-opacity {
	transition: opacity 0.3s ease;
}

.transition-transform {
	transition: transform 0.1s ease-out;
}

.transition-all {
	transition: all 0.2s ease;
}

/* Animación para las flechas de navegación */
button:active svg {
	transform: scale(0.9);
}

/* Soporte para gestos táctiles en dispositivos móviles */
@media (max-width: 768px) {
	.max-h-\[90vh\] {
		max-height: 80vh;
	}
}

/* Estilos para el zoom */
.cursor-magnifying-glass {
	cursor: zoom-in;
}

/* Ajustar el CSS y la estructura del contenedor para asegurar que la imagen se muestre correctamente sin recortes verticales */
.image-container {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.image-container img {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
}
</style>
