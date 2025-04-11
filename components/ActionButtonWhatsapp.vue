<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "ActionButtonWhatsapp",
	props: {
		phoneNumber: {
			type: String,
			default: "+595991440100" // Número de WhatsApp por defecto
		},
		product: {
			type: Object,
			default: null
		}
	},
	computed: {
		message(): string {
			if (!this.product) return ""
			return `Hola, quiero más información sobre este producto ${this.product.nombre} SKU: ${this.product.codigo_alfanum}`
		}
	},
	methods: {
		sendWhatsAppMessage() {
			window.open(`https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`, '_blank')
		}
	}
})
</script>

<template>
	<button
		class="whatsapp-button"
		@click="sendWhatsAppMessage"
	>
		<i class="pi pi-whatsapp whatsapp-icon"></i>
		<!--		Enviar mensaje-->
	</button>
</template>

<style scoped>
.whatsapp-button {
	@apply w-[120px] bg-green-500 hover:bg-green-700 text-white font-bold p-2  rounded gap-1  ;
}

.whatsapp-icon {
	@apply text-center text-2xl;
}
</style>
