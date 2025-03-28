<template>
  <div class="product-carousel">
    <!-- Main image display -->
    <div class="relative overflow-hidden rounded-lg bg-gray-100">
      <div class="carousel-container" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
        <div 
          v-for="(image, index) in images" 
          :key="index"
          class="carousel-slide"
        >
          <img 
            :src="image" 
            :alt="`Product image ${index + 1}`"
            class="w-full h-64 object-contain"
          />
        </div>
      </div>
      
      <!-- Navigation arrows -->
      <button 
        @click="prevImage" 
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
        :disabled="images.length <= 1"
        :class="{ 'opacity-50 cursor-not-allowed': images.length <= 1 }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        @click="nextImage" 
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors"
        :disabled="images.length <= 1"
        :class="{ 'opacity-50 cursor-not-allowed': images.length <= 1 }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Indicator dots -->
      <div class="absolute bottom-2 left-0 right-0 flex justify-center space-x-2" v-if="images.length > 1">
        <button 
          v-for="(_, index) in images" 
          :key="index"
          @click="setActiveImage(index)"
          class="w-2 h-2 rounded-full transition-all"
          :class="index === activeIndex ? 'bg-orange-500' : 'bg-gray-300'"
          aria-label="Go to slide"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Array of image URLs to display in the carousel
     */
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * Auto-play interval in milliseconds
     */
    interval: {
      type: Number,
      default: 5000
    }
  },
  
  data() {
    return {
      activeIndex: 0,
      autoplayTimer: null
    };
  },
  
  mounted() {
    this.startAutoplay();
  },
  
  beforeUnmount() {
    this.stopAutoplay();
  },
  
  methods: {
    /**
     * Set the active image by index
     */
    setActiveImage(index) {
      this.activeIndex = index;
      this.restartAutoplay();
    },
    
    /**
     * Navigate to the previous image
     */
    prevImage() {
      if (this.images.length <= 1) return;
      this.activeIndex = this.activeIndex === 0 ? this.images.length - 1 : this.activeIndex - 1;
      this.restartAutoplay();
    },
    
    /**
     * Navigate to the next image
     */
    nextImage() {
      if (this.images.length <= 1) return;
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
      this.restartAutoplay();
    },
    
    /**
     * Start the autoplay timer
     */
    startAutoplay() {
      if (this.images.length <= 1) return;
      
      this.autoplayTimer = setInterval(() => {
        this.nextImage();
      }, this.interval);
    },
    
    /**
     * Stop the autoplay timer
     */
    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    },
    
    /**
     * Restart the autoplay timer
     */
    restartAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }
};
</script>

<style scoped>
.product-carousel {
  width: 100%;
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  width: 100%;
}
</style>