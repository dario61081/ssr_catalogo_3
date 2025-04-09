<template>
	<div class="product-comments mt-8 mb-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
		<h3 class="text-lg font-bold mb-4">Comentarios</h3>

		<!-- Comments List -->
		<div v-if="loading"
			class="py-4 text-center">
			<div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
			<p class="mt-2 text-gray-600">Cargando comentarios...</p>
		</div>

		<div v-else-if="comments.length === 0"
			class="py-4 text-center bg-gray-50 rounded-lg">
			<p class="text-gray-500">No hay comentarios para este producto.</p>
			<p class="text-sm text-gray-400 mt-1">¡Sé el primero en comentar!</p>
		</div>

		<div v-else
			class="space-y-4 mb-6">
			<div v-for="comment in comments"
				:key="comment.id"
				class="bg-gray-50 p-4 rounded-lg">
				<div class="flex justify-between items-start">
					<div class="flex items-center">
						<div class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
							{{
								comment.author.charAt(0)
									.toUpperCase()
							}}
						</div>
						<div class="ml-3">
							<h4 class="font-medium">{{ comment.author }}</h4>
							<p class="text-xs text-gray-500">{{ formatDate(comment.date) }}</p>
						</div>
					</div>

					<!-- Rating Stars -->
					<div class="flex">
						<template v-for="i in 5"
							:key="i">
							<svg
								:class="i <= comment.rating ? 'text-yellow-400' : 'text-gray-300'"
								class="w-4 h-4"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
							</svg>
						</template>
					</div>
				</div>

				<p class="mt-3 text-gray-700">{{ comment.text }}</p>
			</div>
		</div>

		<!-- Add Comment Form -->
		<div class="bg-white border border-gray-200 rounded-lg p-4">
			<h4 class="font-medium mb-3">Deja tu comentario</h4>

			<div v-if="!isLoggedIn"
				class="text-center py-4">
				<p class="text-gray-600 mb-2">Debes iniciar sesión para comentar</p>
				<button
					class="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
					@click="$emit('login-required')"
				>
					Iniciar sesión
				</button>
			</div>

			<form v-else
				class="space-y-4"
				@submit.prevent="submitComment">
				<!-- Rating Selection -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">Calificación</label>
					<div class="flex space-x-1">
						<button
							v-for="i in 5"
							:key="i"
							class="focus:outline-none"
							type="button"
							@click="newComment.rating = i"
						>
							<svg
								:class="i <= newComment.rating ? 'text-yellow-400' : 'text-gray-300'"
								class="w-6 h-6 cursor-pointer hover:text-yellow-400 transition"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
							</svg>
						</button>
					</div>
				</div>

				<!-- Comment Text -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1"
						for="comment-text">Comentario
					</label>
					<textarea
						id="comment-text"
						v-model="newComment.text"
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
						placeholder="Escribe tu comentario aquí..."
						required
						rows="3"
					></textarea>
				</div>

				<div class="flex justify-end">
					<button
						:disabled="isSubmitting"
						class="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
						type="submit"
					>
            <span v-if="isSubmitting">
              <span class="inline-block animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
              Enviando...
            </span>
						<span v-else>Publicar comentario</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProductComments',

	props: {
		productId: {
			type: [Number,
				String],
			required: true
		},
		isLoggedIn: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			comments: [],
			loading: true,
			isSubmitting: false,
			newComment: {
				text: '',
				rating: 5
			}
		}
	},

	emits: ['comment-added',
		'login-required'],

	mounted() {
		this.fetchComments();
	},

	watch: {
		productId: {
			handler() {
				this.fetchComments();
			},
			immediate: true
		}
	},

	methods: {
		async fetchComments() {
			this.loading = true;

			try {
				// Simulación de carga de datos
				// En una implementación real, aquí se haría una llamada a la API
				await new Promise(resolve => setTimeout(resolve, 1000));

				// Datos de ejemplo - reemplazar con datos reales de la API
				this.comments = [
					{
						id: 1,
						author: 'Juan Pérez',
						date: new Date(2024, 2, 15),
						rating: 5,
						text: 'Excelente producto, muy cómodo y de buena calidad. Lo recomiendo totalmente.'
					},
					{
						id: 2,
						author: 'María García',
						date: new Date(2024, 1, 28),
						rating: 4,
						text: 'Buena relación calidad-precio. Llegó antes de lo esperado y en perfectas condiciones.'
					},
					{
						id: 3,
						author: 'Carlos Rodríguez',
						date: new Date(2024, 1, 10),
						rating: 3,
						text: 'El producto está bien, pero esperaba un poco más por el precio pagado.'
					}
				];
			} catch (error) {
				console.error('Error al cargar comentarios:', error);
				this.comments = [];
			} finally {
				this.loading = false;
			}
		},

		async submitComment() {
			if (!this.newComment.text.trim()) return;

			this.isSubmitting = true;

			try {
				// Simulación de envío de datos
				// En una implementación real, aquí se haría una llamada a la API
				await new Promise(resolve => setTimeout(resolve, 1500));

				// Crear un nuevo comentario con datos simulados
				const newComment = {
					id: Date.now(),
					author: 'Usuario Actual', // Esto vendría de la autenticación real
					date: new Date(),
					rating: this.newComment.rating,
					text: this.newComment.text
				};

				// Agregar el comentario a la lista
				this.comments.unshift(newComment);

				// Emitir evento para notificar que se agregó un comentario
				this.$emit('comment-added', newComment);

				// Limpiar el formulario
				this.newComment = {
					text: '',
					rating: 5
				};
			} catch (error) {
				console.error('Error al enviar comentario:', error);
				alert('No se pudo enviar el comentario. Por favor, intenta nuevamente.');
			} finally {
				this.isSubmitting = false;
			}
		},

		formatDate(date) {
			return new Intl.DateTimeFormat('es-PY', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}).format(date);
		}
	}
}
</script>

<style scoped>
.product-comments {
	max-width: 100%;
}
</style>
