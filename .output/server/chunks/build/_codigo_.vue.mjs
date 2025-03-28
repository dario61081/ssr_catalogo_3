import { _ as __nuxt_component_0 } from './nuxt-link.mjs';
import { mergeProps, useSSRContext, defineComponent, ref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _export_sfc } from './server.mjs';
import { u as useHead } from './v3.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};

const _sfc_main$1 = {
  props: {
    /**
     * Array of image URLs to display in the carousel
     */
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * Auto-play interval in milliseconds
     */
    interval: {
      type: Number,
      default: 5e3
    }
  },
  data() {
    return {
      activeIndex: 0,
      autoplayTimer: null
    };
  },
  mounted() {
    this.startAutoplay();
  },
  beforeUnmount() {
    this.stopAutoplay();
  },
  methods: {
    /**
     * Set the active image by index
     */
    setActiveImage(index) {
      this.activeIndex = index;
      this.restartAutoplay();
    },
    /**
     * Navigate to the previous image
     */
    prevImage() {
      if (this.images.length <= 1) return;
      this.activeIndex = this.activeIndex === 0 ? this.images.length - 1 : this.activeIndex - 1;
      this.restartAutoplay();
    },
    /**
     * Navigate to the next image
     */
    nextImage() {
      if (this.images.length <= 1) return;
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
      this.restartAutoplay();
    },
    /**
     * Start the autoplay timer
     */
    startAutoplay() {
      if (this.images.length <= 1) return;
      this.autoplayTimer = setInterval(() => {
        this.nextImage();
      }, this.interval);
    },
    /**
     * Stop the autoplay timer
     */
    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    },
    /**
     * Restart the autoplay timer
     */
    restartAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "product-carousel" }, _attrs))} data-v-e4bd9749><div class="relative overflow-hidden rounded-lg bg-gray-100" data-v-e4bd9749><div class="carousel-container" style="${ssrRenderStyle({ transform: `translateX(-${$data.activeIndex * 100}%)` })}" data-v-e4bd9749><!--[-->`);
  ssrRenderList($props.images, (image, index) => {
    _push(`<div class="carousel-slide" data-v-e4bd9749><img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `Product image ${index + 1}`)} class="w-full h-64 object-contain" data-v-e4bd9749></div>`);
  });
  _push(`<!--]--></div><button${ssrIncludeBooleanAttr($props.images.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": $props.images.length <= 1 }, "absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors"])}" data-v-e4bd9749><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e4bd9749><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-e4bd9749></path></svg></button><button${ssrIncludeBooleanAttr($props.images.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": $props.images.length <= 1 }, "absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition-colors"])}" data-v-e4bd9749><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e4bd9749><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-e4bd9749></path></svg></button>`);
  if ($props.images.length > 1) {
    _push(`<div class="absolute bottom-2 left-0 right-0 flex justify-center space-x-2" data-v-e4bd9749><!--[-->`);
    ssrRenderList($props.images, (_, index) => {
      _push(`<button class="${ssrRenderClass([index === $data.activeIndex ? "bg-orange-500" : "bg-gray-300", "w-2 h-2 rounded-full transition-all"])}" aria-label="Go to slide" data-v-e4bd9749></button>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductosCarrouselSmall.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProductosCarrouselSmall = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e4bd9749"]]);

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[codigo]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: () => {
        var _a;
        return ((_a = producto.value) == null ? void 0 : _a.nombre) || "Producto";
      },
      meta: [
        { name: "description", content: () => {
          var _a;
          return ((_a = producto.value) == null ? void 0 : _a.nombre) || "Detalles del producto";
        } },
        { property: "og:title", content: () => {
          var _a;
          return ((_a = producto.value) == null ? void 0 : _a.nombre) || "Producto";
        } },
        { property: "og:description", content: () => {
          var _a, _b;
          return `${(_a = producto.value) == null ? void 0 : _a.nombre} - ${(_b = producto.value) == null ? void 0 : _b.categoria}`;
        } },
        { property: "og:image", content: () => {
          var _a;
          return ((_a = producto.value) == null ? void 0 : _a.imagen) || "";
        } },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" }
      ]
    });
    useRoute();
    const producto = ref(null);
    const cantidad = ref(1);
    const loading = ref(true);
    const productImages = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))} data-v-69f2e72d><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" data-v-69f2e72d><nav class="flex" aria-label="Breadcrumb" data-v-69f2e72d><ol class="flex items-center space-x-2" data-v-69f2e72d><li data-v-69f2e72d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-gray-500 hover:text-gray-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Products`);
          } else {
            return [
              createTextVNode("Products")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="flex items-center" data-v-69f2e72d><svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" data-v-69f2e72d><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-69f2e72d></path></svg>`);
      if (producto.value) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/categoria/${producto.value.categoria}`,
          class: "ml-2 text-gray-500 hover:text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(producto.value.categoria)}`);
            } else {
              return [
                createTextVNode(toDisplayString(producto.value.categoria), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</li><li class="flex items-center" data-v-69f2e72d><svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" data-v-69f2e72d><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-69f2e72d></path></svg>`);
      if (producto.value) {
        _push(`<span class="ml-2 text-gray-700 font-medium" data-v-69f2e72d>${ssrInterpolate(producto.value.nombre)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li></ol></nav></div>`);
      if (loading.value) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center" data-v-69f2e72d><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" data-v-69f2e72d></div></div>`);
      } else if (producto.value) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-69f2e72d><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-69f2e72d><div class="bg-gray-100 rounded-lg overflow-hidden" data-v-69f2e72d>`);
        _push(ssrRenderComponent(ProductosCarrouselSmall, { images: productImages.value }, null, _parent));
        _push(`</div><div data-v-69f2e72d>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/categoria/${producto.value.categoria}`,
          class: "text-blue-600 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(producto.value.categoria)}`);
            } else {
              return [
                createTextVNode(toDisplayString(producto.value.categoria), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h1 class="text-3xl font-bold text-gray-900 mt-2" data-v-69f2e72d>${ssrInterpolate(producto.value.nombre)}</h1><div class="flex items-center mt-4" data-v-69f2e72d><div class="flex" data-v-69f2e72d><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<svg class="${ssrRenderClass([i <= 4 ? "text-yellow-400" : "text-gray-300", "h-5 w-5 flex-shrink-0"])}" fill="currentColor" viewBox="0 0 20 20" data-v-69f2e72d><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-69f2e72d></path></svg>`);
        });
        _push(`<!--]--></div><p class="ml-2 text-sm text-gray-600" data-v-69f2e72d>4 reviews</p></div><div class="mt-6" data-v-69f2e72d><p class="text-base text-gray-700" data-v-69f2e72d> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam. </p></div><div class="mt-8 grid grid-cols-2 gap-8" data-v-69f2e72d><div data-v-69f2e72d><h3 class="text-sm font-medium text-gray-700 mb-2" data-v-69f2e72d>QUANTITY</h3><div class="flex items-center border border-gray-300 rounded" data-v-69f2e72d><button class="px-3 py-1 text-gray-600 hover:bg-gray-100"${ssrIncludeBooleanAttr(cantidad.value <= 1) ? " disabled" : ""} data-v-69f2e72d> - </button><span class="px-4 py-1 text-center" data-v-69f2e72d>${ssrInterpolate(cantidad.value)}</span><button class="px-3 py-1 text-gray-600 hover:bg-gray-100"${ssrIncludeBooleanAttr(producto.value && cantidad.value >= producto.value.stock) ? " disabled" : ""} data-v-69f2e72d> + </button></div></div><div data-v-69f2e72d><h3 class="text-sm font-medium text-gray-700 mb-2" data-v-69f2e72d>PRICE</h3><p class="text-xl font-medium text-gray-900" data-v-69f2e72d>Gs. ${ssrInterpolate(producto.value.precio)}</p></div></div><div class="mt-8 flex gap-4" data-v-69f2e72d><button class="flex-1 bg-white border border-orange-500 text-orange-500 py-3 px-6 rounded hover:bg-orange-50 font-medium" data-v-69f2e72d> ADD TO CART </button><button class="flex-1 bg-orange-500 border border-orange-500 text-white py-3 px-6 rounded hover:bg-orange-600 font-medium" data-v-69f2e72d> BUY NOW </button></div></div></div></div>`);
      } else {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center" data-v-69f2e72d><h2 class="text-2xl font-bold text-gray-900" data-v-69f2e72d>Product not found</h2><p class="mt-2 text-gray-600" data-v-69f2e72d>The product you&#39;re looking for doesn&#39;t exist or has been removed.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "mt-4 inline-block text-blue-600 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Return to home page`);
            } else {
              return [
                createTextVNode("Return to home page")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/producto/[codigo].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _codigo_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-69f2e72d"]]);

export { _codigo_ as default };
//# sourceMappingURL=_codigo_.vue.mjs.map
