import {nanoid} from "nanoid";

class Model {
	constructor() {
		/** @type {string} */
		this._id = nanoid()
		/** @type {boolean} */
		this._checked = false
	}

	fromJson(data) {
		Object.assign(this, data)
	}

	toJson() {
		return Object.keys(this).reduce((obj, key) => {
			if (!key.startsWith("_")) {
				obj[key] = this[key]
			}
			return obj
		}, {})
	}

}


export class Seleccion extends Model {
	/**
	 *
	 * @param objeto {Object}
	 * @param keyName {String}
	 */
	constructor(objeto, keyName) {
		super();
		this.objeto = objeto
		this.keyName = keyName
	}
}


export class Producto extends Model {
	/**
	 *
	 * @param codigo
	 * @param nombre
	 * @param codigo_categoria
	 * @param desc_categoria
	 * @param precio
	 * @param imagen
	 * @param stock
	 * @param codigo_division
	 * @param desc_division
	 */
	constructor(codigo, nombre, codigo_categoria, desc_categoria, precio, imagen, stock, codigo_division, desc_division) {
		super();
		/** @type {Number} */
		this.codigo = codigo
		/** @type {String} */
		this.nombre = nombre
		/** @type {Number} SE OBTIENE DESDE DIVISION */
		this.codigo_categoria = codigo_categoria
		/** @type {String} */
		this.desc_categoria = desc_categoria
		/** @type {Number} */
		this.precio = precio
		/** @type {String} */
		this.imagen = imagen
		/** @type {String} */
		this.imagen_2 = ''
		/** @type {String} */
		this.imagen_3 = ''
		/** @type {number} */
		this.stock = stock
		/** @type {Number} */
		this.codigo_division = codigo_division
		/** @type {String} */
		this.desc_division = desc_division || ''
	}
}

export class Linea extends Model {
	constructor(codigo, nombre) {
		super();
		/** @type {string} */
		this.codigo = codigo
		/** @type {string} */
		this.nombre = nombre
	}
}


export class CarritoDetalle extends Model {
	constructor(codigo_producto, cantidad) {
		super();
		this.codigo_producto = codigo_producto
		this.cantidad = cantidad
	}
}

export class Carrito extends Model {
	constructor() {
		super();
		/** @type {string} */
		this.fecha = new Date().toISOString()
		/** @type {string} */
		this._id = nanoid()
		/** @type {CarritoDetalle[]} */
		this.detalle = []
	}

	agregarProducto(codigo_producto, cantidad) {
		const detalle = this.detalle.find(d => d.producto._id === producto._id)
		if (detalle) {
			detalle.cantidad += cantidad
		} else {
			this.detalle.push(new CarritoDetalle(codigo_producto, cantidad))
		}
	}

	quitarProducto(producto) {
		this.detalle = this.detalle.filter(d => d.producto._id !== producto._id)
	}

	actualizarCantidad(producto, cantidad) {
		const detalle = this.detalle.find(d => d.producto._id === producto._id)
		if (detalle) {
			detalle.cantidad = cantidad
		}
	}

	getTotal() {
		return this.detalle.reduce((total, detalle) => total + detalle.producto.precio * detalle.cantidad, 0)
	}

	getItems() {
		return this.detalle
	}
}
