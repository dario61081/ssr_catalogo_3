import { _ as __nuxt_component_0$3 } from './nuxt-link.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../_/nitro.mjs';
import { _ as _export_sfc } from './server.mjs';
import { nanoid } from 'nanoid';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import 'vue-router';

const _imports_0 = publicAssetsURL("/img/logo_white.svg");

const _sfc_main$7 = {
  data() {
    return {
      mobileMenuOpen: false
    };
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$3;
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-black text-white shadow-sm" }, _attrs))}><nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center justify-between"><div class="flex items-center justify-between py-2 sm:py-0"><img alt="Parana Hogar"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "140px", "height": "auto" })}"><button class="sm:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">`);
  if (!$data.mobileMenuOpen) {
    _push(`<path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>`);
  } else {
    _push(`<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>`);
  }
  _push(`</svg></button></div><div class="hidden sm:flex items-center space-x-4"><button class="text-gray-500 hover:text-gray-900"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button><button class="text-gray-500 hover:text-gray-900"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button><button class="text-gray-500 hover:text-gray-900 relative"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><span class="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span></button></div><div style="${ssrRenderStyle($data.mobileMenuOpen ? null : { display: "none" })}" class="sm:hidden py-3 border-t border-gray-200"><div class="flex flex-col space-y-3">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "text-gray-500 hover:text-gray-900 py-1",
    to: "/"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Inicio`);
      } else {
        return [
          createTextVNode("Inicio")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "text-gray-500 hover:text-gray-900 py-1",
    to: "/productos"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Productos`);
      } else {
        return [
          createTextVNode("Productos")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "text-gray-500 hover:text-gray-900 py-1",
    to: "/categorias"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Categorías`);
      } else {
        return [
          createTextVNode("Categorías")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "text-gray-500 hover:text-gray-900 py-1",
    to: "/ofertas"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Ofertas`);
      } else {
        return [
          createTextVNode("Ofertas")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="flex justify-between mt-4 pt-3 border-t border-gray-100"><button class="text-gray-500 hover:text-gray-900 p-1"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button><button class="text-gray-500 hover:text-gray-900 p-1"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button><button class="text-gray-500 hover:text-gray-900 p-1 relative"><svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span></button></div></div></nav></header>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);

const _sfc_main$6 = {
  name: "CheckboxLoading"
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center animate-pulse" }, _attrs))}><div class="w-4 h-4 rounded border border-gray-300 bg-gray-200"></div><div class="ml-2 h-4 w-48 bg-gray-200 rounded"></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CheckboxLoading.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6]]);

class Model {
  constructor() {
    this._id = nanoid();
    this._checked = false;
  }
  fromJson(data) {
    Object.assign(this, data);
  }
  toJson() {
    return Object.keys(this).reduce((obj, key) => {
      if (!key.startsWith("_")) {
        obj[key] = this[key];
      }
      return obj;
    }, {});
  }
}
class Producto extends Model {
  constructor(codigo, nombre, categoria, precio, imagen, stock) {
    super();
    this.codigo = codigo;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.imagen = imagen;
    this.stock = stock;
  }
}
class Linea extends Model {
  constructor(codigo, nombre) {
    super();
    this.codigo = codigo;
    this.nombre = nombre;
  }
}

const _sfc_main$5 = {
  emits: ["vnode-unmounted", "on-selected"],
  data() {
    return {
      /** @type {Linea[]} */
      categorias: [],
      loading: false
    };
  },
  methods: {
    get_data() {
      this.loading = true;
      fetch("/api/categorias").then((res) => res.json()).then((res) => {
        console.log("res", res);
        this.categorias = res.map((item) => {
          const row = new Linea();
          row.codigo = item.DIV_CODIGO;
          row.nombre = item.DIV_DESC;
          return row;
        });
      }).finally(() => {
        console.log(this.categorias);
        this.loading = false;
      });
    }
  },
  mounted() {
    this.get_data();
  },
  watch: {
    categorias() {
      this.$emit("on-selected", this.selected);
    }
  },
  computed: {
    selected() {
      return this.categorias.filter((item) => item._checked);
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CheckboxLoading = __nuxt_component_0$1;
  _push(`<!--[--><h4 class="font-medium mb-2">Categorias</h4><div class="mb-4"><div class="space-y-2">`);
  if ($data.loading) {
    _push(`<!--[-->`);
    ssrRenderList(10, (row) => {
      _push(ssrRenderComponent(_component_CheckboxLoading, null, null, _parent));
    });
    _push(`<!--]-->`);
  } else {
    _push(`<!--[-->`);
    ssrRenderList($data.categorias, (categoria) => {
      _push(`<label class="flex items-center"><input${ssrRenderAttr("value", categoria._checked)} class="rounded border-gray-300 text-gray-500 text-sm" type="checkbox"><span class="ml-2 text-gray-700 text-sm" style="${ssrRenderStyle({ "text-overflow": "ellipsis", "white-space": "nowrap" })}">${ssrInterpolate(categoria.nombre)}</span> <span class="text-grey-100">(0)</span></label>`);
    });
    _push(`<!--]-->`);
  }
  _push(`</div></div><!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoriaFilter.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);

const _sfc_main$4 = {
  name: "ProductCartLoading"
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col h-full bg-white rounded-lg shadow-sm p-4 animate-pulse" }, _attrs))}><div class="absolute top-2 left-2 z-10 w-16 h-6 bg-gray-200 rounded-full"></div><div class="w-full h-72 bg-gray-200 rounded-lg mb-4"></div><div class="flex-1 flex flex-col"><div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div><div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div><div class="mt-auto"><div class="h-6 bg-gray-200 rounded w-1/3 mb-3"></div><div class="h-10 bg-gray-200 rounded-md w-full"></div></div></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCartLoading.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);

const _sfc_main$3 = {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" }, _attrs))}><div class="${ssrRenderClass([
    $props.product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
    "absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-medium"
  ])}">${ssrInterpolate($props.product.stock > 0 ? "En Stock" : "Sin Stock")}</div><div class="relative pt-[100%] overflow-hidden rounded-t-lg"><img${ssrRenderAttr("alt", $props.product.nombre)}${ssrRenderAttr("src", $props.product.imagen)} class="absolute inset-0 w-full h-full object-contain object-center p-5" style="${ssrRenderStyle({ "aspect-ratio": "4/3" })}"><div class="absolute top-2 right-2 flex flex-col space-y-2"><button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"><svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button><button class="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"><svg class="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></button></div></div><div class="flex-1 p-4 flex flex-col"><h3 class="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-2">${ssrInterpolate($props.product.nombre)}</h3><p class="text-xs text-gray-500 mb-2">${ssrInterpolate($props.product.categoria)}</p><div class="mt-auto"><p class="text-base sm:text-lg font-bold text-gray-900">Gs. ${ssrInterpolate($options.formatPrice($props.product.precio))}</p><button class="mt-3 w-full bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-3 rounded-md flex items-center justify-center transition-colors duration-200"><svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg> Agregar </button></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);

const _sfc_main$2 = {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 9,
      selectedCategories: [],
      priceFilter: 0,
      inStockOnly: false,
      showFilters: false,
      // For mobile filter toggle
      categorias: [],
      loading: false
    };
  },
  computed: {
    // Dynamic filter values
    uniqueCategories() {
      return [...new Set(this.products.map((product) => product.categoria))].filter(Boolean).sort();
    },
    minPrice() {
      if (this.products.length === 0) return 0;
      return Math.floor(Math.min(...this.products.map((product) => Number(product.precio) || 0)));
    },
    maxPrice() {
      if (this.products.length === 0) return 0;
      return Math.ceil(Math.max(...this.products.map((product) => Number(product.precio) || 0)));
    },
    // Apply filters to products
    filteredProducts() {
      return this.products.filter((product) => {
        if (this.selectedCategories.length > 0 && !this.selectedCategories.includes(product.categoria)) {
          return false;
        }
        if (Number(product.precio) > this.priceFilter) {
          return false;
        }
        if (this.inStockOnly && (!product.stock || product.stock <= 0)) {
          return false;
        }
        return true;
      });
    },
    // Get products for the current page from filtered products
    paginatedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredProducts.slice(startIndex, endIndex);
    },
    // Calculate total number of pages based on filtered products
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    // Calculate which page numbers to display
    displayedPages() {
      const pages = [];
      const totalPages = this.totalPages;
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (this.currentPage > 3) {
          pages.push("...");
        }
        const startPage = Math.max(2, this.currentPage - 1);
        const endPage = Math.min(totalPages - 1, this.currentPage + 1);
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        if (this.currentPage < totalPages - 2) {
          pages.push("...");
        }
        if (totalPages > 1) {
          pages.push(totalPages);
        }
      }
      return pages;
    }
  },
  watch: {
    // Reset to page 1 when filters change
    filteredProducts() {
      this.currentPage = 1;
    }
  },
  methods: {
    // Format price with thousands separator
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    // Clear all filters
    clearFilters() {
      this.selectedCategories = [];
      this.priceFilter = this.maxPrice;
      this.inStockOnly = false;
    },
    // Go to specific page
    goToPage(page) {
      this.currentPage = page;
      this.scrollToTop();
    },
    // Go to previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
    },
    // Go to next page
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    // Scroll to top of grid after page change
    scrollToTop() {
      (void 0).scrollTo({ top: 0, behavior: "smooth" });
    }
  },
  created() {
    this.$nextTick(() => {
    });
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CategoriaFilter = __nuxt_component_0;
  const _component_ProductCartLoading = __nuxt_component_1$1;
  const _component_ProductCard = __nuxt_component_2$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-1" }, _attrs))}><div class="flex flex-col lg:flex-row gap-6"><div class="${ssrRenderClass([
    $data.showFilters ? "block" : "hidden",
    "lg:block w-full lg:w-64 flex-shrink-0"
  ])}"><div class="sticky top-4 bg-white p-4 rounded-lg shadow-sm"><h3 class="text-lg font-semibold mb-4"><i class="fa fa-filter text-gray-400"></i> Filtros</h3>`);
  _push(ssrRenderComponent(_component_CategoriaFilter, {
    onOnSelected: (value) => {
      console.log(value);
    }
  }, null, _parent));
  _push(`<div class="mb-4"><h4 class="font-medium mb-2">Lineas</h4><div class="space-y-2 max-h-40 overflow-y-auto"><!--[-->`);
  ssrRenderList($options.uniqueCategories, (category) => {
    _push(`<label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray($data.selectedCategories) ? ssrLooseContain($data.selectedCategories, category) : $data.selectedCategories) ? " checked" : ""}${ssrRenderAttr("value", category)} class="rounded border-gray-300 text-orange-500" type="checkbox"><span class="ml-2 text-gray-700 text-sm">${ssrInterpolate(category)}</span></label>`);
  });
  _push(`<!--]--></div></div><div class="mb-4"><h4 class="font-medium mb-2">Precio</h4><div class="px-2"><div class="flex justify-between text-sm text-gray-600 mb-1"><span>Gs. ${ssrInterpolate($options.formatPrice($options.minPrice))}</span><span>Gs. ${ssrInterpolate($options.formatPrice($options.maxPrice))}</span></div><input${ssrRenderAttr("value", $data.priceFilter)}${ssrRenderAttr("max", $options.maxPrice)}${ssrRenderAttr("min", $options.minPrice)} class="w-full" step="1000" type="range"><div class="text-center text-sm text-gray-800 mt-1"><span>Hasta Gs. ${ssrInterpolate($options.formatPrice($data.priceFilter))}</span></div></div></div><div><h4 class="font-medium mb-2">Disponibilidad</h4><div class="space-y-2"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray($data.inStockOnly) ? ssrLooseContain($data.inStockOnly, null) : $data.inStockOnly) ? " checked" : ""} class="rounded border-gray-300 text-orange-500" type="checkbox"><span class="ml-2 text-gray-700 text-sm">Solo en stock</span></label></div></div><button class="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"> Limpiar filtros </button></div></div><div class="flex-1"><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4"><p class="text-sm text-gray-600 mb-2 sm:mb-0">Mostrando ${ssrInterpolate($options.paginatedProducts.length)} de ${ssrInterpolate($options.filteredProducts.length)} Productos</p><select class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-auto"><option>Mas Popular</option><option>Nuevos</option><option>Precio: Bajo</option><option>Precio: Alto</option></select></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">`);
  if ($data.loading) {
    _push(`<!--[-->`);
    ssrRenderList(9, (row) => {
      _push(ssrRenderComponent(_component_ProductCartLoading, null, null, _parent));
    });
    _push(`<!--]-->`);
  } else {
    _push(`<!--[-->`);
    ssrRenderList($options.paginatedProducts, (product) => {
      _push(ssrRenderComponent(_component_ProductCard, {
        key: product.codigo,
        product
      }, null, _parent));
    });
    _push(`<!--]-->`);
  }
  _push(`</div><div class="mt-8 flex justify-center"><nav aria-label="Pagination" class="flex flex-wrap items-center justify-center gap-2"><button class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": $data.currentPage === 1 }, "px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"])}"${ssrIncludeBooleanAttr($data.currentPage === 1) ? " disabled" : ""}><span class="sr-only">Previous</span><svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" fill-rule="evenodd"></path></svg></button><!--[-->`);
  ssrRenderList($options.displayedPages, (page) => {
    _push(`<!--[-->`);
    if (page === "...") {
      _push(`<span class="hidden sm:inline-block px-3 py-2 text-gray-500"> ... </span>`);
    } else {
      _push(`<button class="${ssrRenderClass([page === $data.currentPage ? "bg-black text-white border border-gray-500" : "border border-gray-300 text-gray-700 hover:bg-gray-50", "px-3 py-2 rounded-md text-sm font-medium"])}">${ssrInterpolate(page)}</button>`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--><button class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": $data.currentPage === $options.totalPages }, "px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"])}"${ssrIncludeBooleanAttr($data.currentPage === $options.totalPages) ? " disabled" : ""}><span class="sr-only">Next</span><svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fill-rule="evenodd"></path></svg></button></nav></div></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductGrid.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);

const _sfc_main$1 = {
  data() {
    return {
      openSections: {
        company: false,
        links: false,
        service: false,
        contact: false
      }
    };
  },
  methods: {
    toggleSection(section) {
      this.openSections[section] = !this.openSections[section];
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-black text-white pt-8 pb-6" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="lg:hidden"><div class="border-b border-gray-800 pb-4 mb-4"><div class="flex items-center justify-between"><svg class="${ssrRenderClass([$data.openSections.company ? "rotate-180" : "", "h-5 w-5 transform transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div><div style="${ssrRenderStyle($data.openSections.company ? null : { display: "none" })}" class="mt-4 space-y-3 text-gray-400"><p>Encuentra todo lo que necesitas para tu hogar en un solo lugar.</p><div class="flex space-x-4 mt-4"><a class="text-gray-400 hover:text-white" href="#"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg></a><a class="text-gray-400 hover:text-white" href="#"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path></svg></a><a class="text-gray-400 hover:text-white" href="#"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a></div></div></div><div class="border-b border-gray-800 py-4 mb-4"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold">Enlaces Rápidos</h3><svg class="${ssrRenderClass([$data.openSections.links ? "rotate-180" : "", "h-5 w-5 transform transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div><div style="${ssrRenderStyle($data.openSections.links ? null : { display: "none" })}" class="mt-4 space-y-3 text-gray-400"><div><a class="hover:text-white" href="/">Inicio</a></div><div><a class="hover:text-white" href="/productos">Productos</a></div><div><a class="hover:text-white" href="/categorias">Categorías</a></div><div><a class="hover:text-white" href="/ofertas">Ofertas</a></div></div></div><div class="border-b border-gray-800 py-4 mb-4"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold">Atención al Cliente</h3><svg class="${ssrRenderClass([$data.openSections.service ? "rotate-180" : "", "h-5 w-5 transform transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div><div style="${ssrRenderStyle($data.openSections.service ? null : { display: "none" })}" class="mt-4 space-y-3 text-gray-400"><div><a class="hover:text-white" href="/contacto">Contacto</a></div><div><a class="hover:text-white" href="/faq">Preguntas Frecuentes</a></div><div><a class="hover:text-white" href="/envios">Envíos</a></div><div><a class="hover:text-white" href="/devoluciones">Devoluciones</a></div><div><a class="hover:text-white" href="/terminos">Términos y Condiciones</a></div></div></div><div class="border-b border-gray-800 py-4 mb-4"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold">Contacto</h3><svg class="${ssrRenderClass([$data.openSections.contact ? "rotate-180" : "", "h-5 w-5 transform transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div><div style="${ssrRenderStyle($data.openSections.contact ? null : { display: "none" })}" class="mt-4 space-y-3 text-gray-400"><p class="flex items-start"><svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><span>Av. Mariscal López 1234, Asunción, Paraguay</span></p><p class="flex items-start"><svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><span>+595 21 123 4567</span></p><p class="flex items-start"><svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><span>info@paranahogar.com.py</span></p><p class="flex items-start"><svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><span>Lun-Vie: 9:00 - 18:00<br>Sáb: 9:00 - 13:00</span></p></div></div><div class="py-4 mb-4"><h3 class="text-lg font-semibold mb-4">Suscríbete</h3><p class="text-gray-400 mb-4">Recibe nuestras ofertas y novedades</p><form class="flex flex-col space-y-2"><input class="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Tu correo electrónico" type="email"><button class="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition-colors duration-200" type="submit"> Suscribirse </button></form></div></div><div class="hidden lg:grid lg:grid-cols-4 lg:gap-8"><div><img alt="Parana Hogar"${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "200px", "margin-bottom": "1rem" })}"><p class="text-gray-400 mb-4">Encuentra todo lo que necesitas para tu hogar en un solo lugar.</p><div class="flex space-x-4"><a class="text-gray-400 hover:text-white" href="#"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg></a><a class="text-gray-400 hover:text-white" href="#"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path></svg></a><a class="text-gray-400 hover:text-white" href="#"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a></div></div><div><h3 class="text-lg font-semibold mb-4">Enlaces Rápidos</h3><ul class="space-y-3 text-gray-400"><li><a class="hover:text-white" href="/">Inicio</a></li><li><a class="hover:text-white" href="/productos">Productos</a></li><li><a class="hover:text-white" href="/categorias">Categorías</a></li><li><a class="hover:text-white" href="/ofertas">Ofertas</a></li></ul></div><div><h3 class="text-lg font-semibold mb-4">Atención al Cliente</h3><ul class="space-y-3 text-gray-400"><li><a class="hover:text-white" href="/contacto">Contacto</a></li><li><a class="hover:text-white" href="/faq">Preguntas Frecuentes</a></li><li><a class="hover:text-white" href="/envios">Envíos</a></li><li><a class="hover:text-white" href="/devoluciones">Devoluciones</a></li><li><a class="hover:text-white" href="/terminos">Términos y Condiciones</a></li></ul></div><div><h3 class="text-lg font-semibold mb-4">Contacto</h3><ul class="space-y-3 text-gray-400 mb-6"><li class="flex items-start"><svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><div><b>Showroom Encarnación</b><br> Padre Kreusser c/Gral. Artigas <br> +595 71 202 145 </div></li><li class="flex items-start"><svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><div><b>Showroom Asunción</b><br> Avda. República Argentina &amp; Dr. Hassler <br> +595 21 326 0656 </div></li><li class="flex items-start"><svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><span>info@paranahogar.com.py</span></li><li class="flex items-start"><svg class="h-6 w-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg><span>Lun-Vie: 9:00 - 18:00<br>Sáb: 9:00 - 13:00</span></li></ul><h3 class="text-lg font-semibold mb-4">Suscríbete</h3><form class="flex flex-col space-y-2"><input class="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Tu correo electrónico" type="email"><button class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors duration-200" type="submit"> Suscribirse </button></form></div></div><div class="mt-8 pt-8 border-t border-gray-800"><div class="flex flex-col md:flex-row md:justify-between md:items-center"><p class="text-gray-400 text-sm mb-4 md:mb-0"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Paraná Hogar. Todos los derechos reservados. </p><div class="flex flex-wrap gap-4 text-sm text-gray-400"><a class="hover:text-white" href="/privacidad">Política de Privacidad</a><a class="hover:text-white" href="/terminos-uso">Términos de Uso</a><a class="hover:text-white" href="/cookies">Política de Cookies</a></div></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);

const _sfc_main = {
  data() {
    return {
      productos: [],
      filtros: []
    };
  },
  methods: {
    get_data() {
      fetch("/api/articulos").then((res) => res.json()).then((res) => {
        this.productos = res.map((item) => {
          return new Producto(item.ART_COD, item.ART_DESCRIPCION, item.LINEA, item.PRECIO, item.ART_DIR_IMAG1, item.STOCK);
        });
      });
    }
  },
  mounted() {
    this.get_data();
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = __nuxt_component_0$2;
  const _component_ProductGrid = __nuxt_component_1;
  const _component_Footer = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Header, {
    onOnSearch: (filter) => {
    }
  }, null, _parent));
  _push(`<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="flex gap-8">`);
  _push(ssrRenderComponent(_component_ProductGrid, { products: $data.productos }, null, _parent));
  _push(`</div></main>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index.vue.mjs.map
