export const utils = () => {

	/**
	 * Limpiar el campo PRECIO
	 * @param value {String}
	 */
	const cleanformatPrecio = (value: string) => {
		return value.replace('.', '');
	}

	/**
	 * formatear el numero al texto con separadores de miles
	 * @param value {Number}
	 */
	const formatPrecio = (value: number) => {
		return value.toLocaleString('es-PY', {minimumFractionDigits: 0})
	}

	return {
		cleanformatPrecio,
		formatPrecio
	}

}
