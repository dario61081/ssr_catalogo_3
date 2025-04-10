<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	props: {
		rating: {
			type: Number,
			required: true
		},
		maxRating: {
			type: Number,
			default: 5
		}
	}
})
</script>

<template>
	<div class="flex items-center">
		<span v-for="(star, index) in maxRating"
			:key="index"
			class="text-yellow-500">
			<i :class="{'pi-star-fill': rating > index, 'pi-star': rating <= index}"
				class="pi"></i>
		</span>
	</div>
</template>

<style scoped>

</style>
