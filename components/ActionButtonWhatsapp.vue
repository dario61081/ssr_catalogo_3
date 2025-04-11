<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: "ActionButtonWhatsapp",
	props: {
		phoneNumber: {
			type: String,
			default: "5493764000000" // Número de WhatsApp por defecto
		},
		product: {
			type: Object,
			default: null
		}
	},
	computed: {
		message(): string {
			if (!this.product) return ""
			return `Hola, estoy interesado en el producto ${this.product.nombre}`
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
	@apply bg-green-500 hover:bg-green-700 text-white font-bold p-2  rounded gap-1  ;
}

.whatsapp-icon {
	@apply text-center;
}
</style>
