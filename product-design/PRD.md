# Documento de Requisitos del Producto (PRD)

## Catálogo Online Paraná Hogar

**Fecha:** 1 de abril de 2025  
**Versión:** 1.0  
**Estado:** ACTIVO

# 📍 Documento de Requisitos del Producto (PRD)

## 🆔 Nombre del Proyecto:

**Catálogo de Productos Multicategoría**

---

## 🎯 Objetivo del Proyecto

Desarrollar una aplicación web responsiva que permita visualizar un catálogo de productos de múltiples categorías y
subcategorías, con funcionalidades de filtrado, ordenamiento y visualización detallada. El sistema deberá estar
preparado para escalar en funcionalidades y volumen de datos.

---

## 👥 Público Objetivo

Usuarios finales interesados en explorar productos por categorías, comparar características y tomar decisiones
informadas.

---

## 🧹 Funcionalidades Principales

### 1. 📦 Catálogo de Productos

- Visualización de productos con imagen, nombre, descripción breve, precio y atributos clave.
- Paginación o scroll infinito para manejar grandes volúmenes de productos.

### 2. 🔍 Filtro por Categorías y Subcategorías

- Listado de categorías principales.
- Al seleccionar una categoría, se despliegan sus subcategorías.
- Los productos mostrados deben corresponder a la combinación de categoría y subcategoría seleccionadas.

### 3. ↕️ Ordenamiento de Productos

- Opciones disponibles:
	- Precio (ascendente / descendente)
	- Nombre (A-Z / Z-A)
	- Más recientes
- Interfaz clara para cambiar criterios de ordenamiento sin recargar la vista.

### 4. 📝 Detalles del Producto

- Página o componente de detalle con:
	- Imagen ampliada
	- Descripción extendida
	- Lista de características
	- Información adicional: disponibilidad, garantía, etc.

---

## 🛠️ Tecnologías a Utilizar

| Categoría           | Herramienta/Framework |
|---------------------|-----------------------|
| Framework Fullstack | Nuxt (Vue 3 + SSR)    |
| Manejo de Estado    | Pinia                 |
| Estilos             | Tailwind CSS          |
| Iconografía         | PrimeIcons            |
| Bus messages        | mitt                  |		

> **Nota:** Se ha decidido reemplazar Vite por **Nuxt** como framework principal, para aprovechar sus capacidades
> integradas de renderizado del lado del servidor (SSR), generación de sitios estáticos y estructura optimizada para
> escalabilidad.

---

## 🧱 Estructura Técnica Sugerida

### 🗂️ Arquitectura de Carpetas

```
src/
├── components/
│   └── ProductCard.vue
│   └── FilterSidebar.vue
│   └── SortOptions.vue
├── pages/
│   └── index.vue
│   └── product/[id].vue
│   └── category/[id].vue
│   └── favorities.vue
├── store/
│   └── productStore.ts
│   └── categoryStore.ts
├── assets/
│   └── icons/
├── types/
│   └── product.d.ts
│   └── category.d.ts
```

### Urls de Referencia

| Origen datos | URL                                                                                                                                           |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| categorias   | https://panel.colchonesparana.com.py/articulos/divisiones/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC/TODOS                  |
| productos    | https://panel.colchonesparana.com.py/api/v2/articulos/division/TODOS/TODOS/TODOS/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC |
| producto     | https://panel.colchonesparana.com.py/api/v2/articulos/detalle/${codigo_producto}/$2y$10$FOLP83QuixpjN7lgAU8acOM4SIiOQlBYMbK6mHppi5Lo0kraspEkC |

### 📦 Modelo de Datos (Ejemplo)

````ts
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
		return Object.keys(this)
			.reduce((obj,
					 key) => {
				if (!key.startsWith("_")) {
					obj[key] = this[key]
				}
				return obj
			}, {})
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
	constructor(codigo,
				nombre,
				codigo_categoria,
				desc_categoria,
				precio,
				imagen,
				stock,
				codigo_division,
				desc_division) {
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

export class Categoria extends Model {
	constructor(codigo,
				nombre,
				imagen,
				estado,
				orden) {
		super();
		/** @type {string} */
		this.codigo = codigo
		/** @type {string} */
		this.nombre = nombre
		this.imagen = imagen || ''
		this.estado = estado || 'A'
		this.orden = orden || 0
	}
}


````

```ts

export interface CategoriaResponse {
	DIV_CODIGO: number;
	DIV_DESC: string;
	DIV_ESTADO: string;
	DIV_ORDEN: number;
	DIV_DIR_IMAGEN: string | null;
}

export interface ProductoResponse {
	COD_ALFANUM: string;
	ART_COD: number;
	ART_DESCRIPCION: string;
	LINEA: string;
	PRECIO: string;
	STOCK: number;
	ART_DIR_IMAG1: string | null;
	ART_DIR_IMAG2: string | null;
	ART_DIR_IMAG3: string | null;
	ART_DIR_IMAG4: string | null;
	ART_DIR_IMAG5: string | null;
	ART_DIR_IMAG6: string | null;
	ART_IND_IMP: string;
	DIVISION: number;
	DIV_DESC: string;
	DIV_CLAS: number;
	DIV_CLAS_DESC: string;
	MOSTRAR_ECOM: string;
	MOSTRAR_CAT: string;
	TIENE_DOCUMENTOS: string;
}


```

---

## 📈 Escalabilidad & Mantenimiento

- **Desacoplamiento por componentes**: cada parte visual y lógica estará encapsulada para facilitar pruebas,
  mantenimiento y reutilización.
- **Uso de tipado estricto (TypeScript)**: permite robustez ante cambios futuros en los datos.
- **Sistema de rutas dinámico** para categorías/subcategorías y producto individual usando las convenciones de `pages/`
  de Nuxt.
- **API ready**: diseño orientado a consumir datos desde una API REST o GraphQL.

---

## 📌 Requerimientos Futuro-Proof (Planeado pero no implementado inicialmente)

| Funcionalidad                                                  | Prioridad | Estado      |
|----------------------------------------------------------------|-----------|-------------|
| Búsqueda por texto libre                                       | Media     | Planificado |
| Filtros avanzados (por rango de precio, características, etc.) | Alta      | Planificado |
| Valoraciones de productos                                      | Baja      | Pendiente   |

---

## 📌 Criterios de Aceptación

- El usuario puede filtrar productos por categoría y subcategoría.
- El usuario puede ordenar los productos usando múltiples criterios.
- El catálogo es funcional en dispositivos móviles y de escritorio.
- La estructura del código facilita añadir más filtros, vistas o integraciones.

### Comportamiento

- Al iniciar el sistema, se muestra catalogo
- El usuario puede navegar por categorías y subcategorías
- El usuario puede filtrar productos por categoría y subcategoría
- El usuario puede ordenar los productos usando múltiples criterios
- El usuario puede ver detalles de un producto individual
- El usuario puede marcar como producto favorito y guardar en localseccion
- El usuario puede volver a la ruta anterior (siempre se hace historico de navegacion)
- El sistema debe estar preparado para escalar en funcionalidades y volumen de datos
- El sistema utiliza useFetch para obtener datos de la API
- Los componentes siempre se comunican por eventbus para comunicarse entre si
- La estructura del código facilita añadir más filtros, vistas o integraciones

### Diseño

- La interfaz debe ser clara y intuitiva
- La interfaz debe ser responsive y adaptarse a diferentes dispositivos
- La interfaz debe ser accesible para personas con discapacidad
- La interfaz debe ser minimalista y elegante
- La interfaz debe ser personalizable y adaptable a las necesidades del usuario
- La interfaz debe soportar multiples navegadores (Chrome, Firefox, Safari, Edge, etc.)
