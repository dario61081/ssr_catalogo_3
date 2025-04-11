<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "ProductGridLoading"
})
</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<div v-for="i in 12"
			:key="i"
			class="bg-white rounded-lg p-6 shadow-sm">
			<div class="animate-pulse">
				<div class="shimmer-bg h-48 w-full rounded-lg"></div>
				<div class="h-6 w-2/5 bg-gray-300 rounded-lg mt-3 shimmer-bg"></div>
				<div class="h-6 w-3/5 bg-gray-300 rounded-lg mt-3 shimmer-bg"></div>
				<div class="h-6 w-1/5 bg-gray-300 rounded-lg mt-3 shimmer-bg"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.shimmer-bg {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
