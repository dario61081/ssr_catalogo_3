<script lang="ts">
import {defineComponent} from 'vue'
import SubCategoryItem from "~/components/treeview/SubCategoryItem.vue";

export default defineComponent({
	components: {SubCategoryItem},
	props: {
		/** @type {Categoria} */
		item: {type: Object, required: true}
	}
})
</script>

<template>
	<div class="flex items-center mb-1">
		<input class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
			type="checkbox">
		<span class="ml-2 text-sm font-medium text-gray-900">{{ item.nombre }}</span>

		<SubCategoryItem :item="item"></SubCategoryItem>

	</div>
</template>

<style scoped>

</style>
