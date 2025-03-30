<template>
	<div class="mb-4">
		<h4 class="font-medium mb-2">Lineas</h4>
		<div class="space-y-2 ">
			<template v-for="row in 15">
				<CheckboxLoading></CheckboxLoading>
			</template>
		</div>
	</div>
</template>
<script>

export default {
	props: {
		productos: {type: Array, required: true}
	},
	
}


</script>
<style scoped>

</style>
