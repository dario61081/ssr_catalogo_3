import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cookies",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, _attrs))} data-v-3a906734><h1 class="text-3xl font-bold mb-6" data-v-3a906734>Política de Cookies</h1><div class="prose" data-v-3a906734><section class="mb-6" data-v-3a906734><h2 class="text-xl font-semibold mb-3" data-v-3a906734>¿Qué son las cookies?</h2><p data-v-3a906734>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Estas cookies nos ayudan a mejorar su experiencia de navegación, recordar sus preferencias y entender cómo utilizan los visitantes nuestro sitio.</p></section><section class="mb-6" data-v-3a906734><h2 class="text-xl font-semibold mb-3" data-v-3a906734>Tipos de cookies que utilizamos</h2><ul data-v-3a906734><li data-v-3a906734><strong data-v-3a906734>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li><li data-v-3a906734><strong data-v-3a906734>Cookies de rendimiento:</strong> Nos ayudan a entender cómo interactúan los usuarios con nuestro sitio.</li><li data-v-3a906734><strong data-v-3a906734>Cookies de funcionalidad:</strong> Permiten recordar sus preferencias para mejorar su experiencia.</li><li data-v-3a906734><strong data-v-3a906734>Cookies de publicidad:</strong> Utilizadas para mostrarle anuncios relevantes según sus intereses.</li></ul></section><section class="mb-6" data-v-3a906734><h2 class="text-xl font-semibold mb-3" data-v-3a906734>Control de cookies</h2><p data-v-3a906734>Puede configurar su navegador para rechazar todas las cookies o para que le avise cuando se envía una cookie. Sin embargo, si rechaza las cookies, es posible que algunas partes de nuestro sitio no funcionen correctamente.</p></section><section class="mb-6" data-v-3a906734><h2 class="text-xl font-semibold mb-3" data-v-3a906734>Cookies de terceros</h2><p data-v-3a906734>Nuestro sitio puede utilizar servicios de terceros que también establecen sus propias cookies. No tenemos control sobre estas cookies. Le recomendamos consultar las políticas de privacidad de estos terceros para obtener más información.</p></section><section class="mb-6" data-v-3a906734><h2 class="text-xl font-semibold mb-3" data-v-3a906734>Actualizaciones a esta política</h2><p data-v-3a906734>Podemos actualizar nuestra política de cookies ocasionalmente. Le recomendamos revisar esta página periódicamente para estar informado sobre cualquier cambio.</p></section></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cookies.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cookies = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a906734"]]);

export { cookies as default };
//# sourceMappingURL=cookies.vue.mjs.map
