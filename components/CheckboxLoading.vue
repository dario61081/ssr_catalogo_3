<template>
	<transition name="fade">
		<div class="flex items-center animate-pulse">
			<div class="w-4 h-4 rounded border border-gray-300 bg-gray-200"></div>
			<div class="ml-2 h-4 w-48 bg-gray-200 rounded"></div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'CheckboxLoading'
}
</script>

<style scoped>
</style>
