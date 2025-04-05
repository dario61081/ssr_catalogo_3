<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	props: {
		item: {
			type: Object,
			default: () => {
			}
		}
	}
})
</script>

<template>
	<div class="flex items-center">
		<input class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
			type="checkbox">
	</div>
</template>

<style scoped>

</style>
