<template>
	<transition mode="out-in"
				name="fade">
		<div class="flex flex-col h-full bg-white rounded-lg shadow-sm p-4">
			<!-- Image Placeholder -->
			<div class="w-full h-72 bg-gray-200 rounded-lg mb-4"></div>
			<!-- Product Info Placeholders -->
			<div class="flex-1 flex flex-col">
				<!-- Title Placeholder -->
				<div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
				<!-- Category Placeholder -->
				<div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
				<div class="mt-auto">
					<!-- Price Placeholder -->
					<div class="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
					<!-- Button Placeholder -->
					<div class="h-10 bg-gray-200 rounded-md w-full"></div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'ProductCartLoading'
}
</script>
