<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
	name: "FabActionWhatsapp.vue",
	props: {
		phoneNumber: {
			type: String,
			default: "5493764000000" // Número de WhatsApp por defecto
		},
		defaultMessage: {
			type: String,
			default: "Hola, estoy interesado en un producto de Casa Paraná."
		},
		product: {
			type: Object,
			default: null
		}
	},
	setup(props) {
		const isFormOpen = ref(false);
		const message = ref(props.defaultMessage);

		const toggleForm = () => {
			isFormOpen.value = !isFormOpen.value;
			if (isFormOpen.value) {
				message.value = props.defaultMessage;
			}
		};

		const sendWhatsAppMessage = () => {
			if (!message.value.trim()) return;

			const encodedMessage = encodeURIComponent(message.value);
			const whatsappUrl = `https://wa.me/${props.phoneNumber}?text=${encodedMessage}`;

			window.open(whatsappUrl, '_blank');
			toggleForm();
		};

		return {
			isFormOpen,
			message,
			toggleForm,
			sendWhatsAppMessage
		};
	}
})
</script>

<template>
	<div class="fab-whatsapp">
		<button :class="{ 'active': isFormOpen }" class="fab-button" title="Enviar mensaje por WhatsApp"
			@click="toggleForm">
			<svg class="whatsapp-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
				<!-- Font Awesome WhatsApp icon -->
				<path
					d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
			</svg>
		</button>

		<div v-if="isFormOpen" class="whatsapp-form">
			<div class="form-header">
				<h3>Enviar mensaje por WhatsApp</h3>
				<button class="close-button" aria-label="Cerrar formulario de WhatsApp" @click="toggleForm">×
				</button>
			</div>
			<div class="form-body">
				<textarea v-model="message" placeholder="Escribe tu mensaje aquí..." rows="4"></textarea>
				<button :disabled="!message.trim()" class="send-button" @click="sendWhatsAppMessage">
					Enviar
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.fab-whatsapp {
	position: fixed;
	bottom: 20px;
	right: 20px;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
}

.fab-button {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: #25D366;
	border: none;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease;
}

.fab-button:hover {
	transform: scale(1.05);
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.fab-button.active {
	background-color: #128C7E;
}

.whatsapp-icon {
	width: 30px;
	height: 30px;
	fill: white;
}

.whatsapp-form {
	position: absolute;
	bottom: 70px;
	right: 0;
	width: 300px;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: all 0.3s ease;
}

.form-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 16px;
	background-color: #128C7E;
	color: white;
}

.form-header h3 {
	margin: 0;
	font-size: 16px;
}

.close-button {
	background: none;
	border: none;
	color: white;
	font-size: 24px;
	cursor: pointer;
	padding: 0;
	line-height: 1;
}

.form-body {
	padding: 16px;
}

textarea {
	width: 100%;
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
	resize: none;
	font-family: inherit;
	margin-bottom: 12px;
}

.send-button {
	width: 100%;
	padding: 10px;
	background-color: #25D366;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: bold;
	transition: background-color 0.3s ease;
}

.send-button:hover {
	background-color: #128C7E;
}

.send-button:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}
</style>
