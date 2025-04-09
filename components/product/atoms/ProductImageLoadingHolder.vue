<template>
	<transition mode="out-in"
		name="fade">
		<div class="w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
			<div class="relative w-4/5 h-4/5">
				<!-- Animated gradient background -->
				<div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
				<!-- Image icon -->
				<div class="absolute inset-0 flex items-center justify-center">
					<svg class="w-16 h-16 text-gray-300"
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
			</div>
		</div>
	</transition>
</template>

<style scoped>
.animate-shimmer {
	background-size: 200% 100%;
	animation: shimmer 1.5s infinite linear;
}

@keyframes shimmer {
	0% {
		background-position: -100% 0;
	}
	100% {
		background-position: 100% 0;
	}
}
</style>
