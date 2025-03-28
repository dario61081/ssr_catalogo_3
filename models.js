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


export class Producto extends Model {
    constructor(codigo, nombre, categoria, precio, imagen, stock) {
        super();
        this.codigo = codigo
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
        this.imagen = imagen
        this.stock = stock
    }
}

export class Linea extends Model {
    constructor(codigo, nombre) {
        super();
        this.codigo = codigo
        this.nombre = nombre
    }
}

