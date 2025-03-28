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
  __name: "terminos-uso",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 py-8" }, _attrs))} data-v-993d1b33><h1 class="text-3xl font-bold mb-6" data-v-993d1b33>Términos y Condiciones de Uso</h1><div class="prose prose-lg" data-v-993d1b33><section class="mb-6" data-v-993d1b33><h2 class="text-xl font-semibold mb-3" data-v-993d1b33>1. Aceptación de los Términos</h2><p data-v-993d1b33>Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Términos y Condiciones de Uso, todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, está prohibido usar este sitio.</p></section><section class="mb-6" data-v-993d1b33><h2 class="text-xl font-semibold mb-3" data-v-993d1b33>2. Uso de la Plataforma</h2><p data-v-993d1b33>El contenido de este sitio web es únicamente para fines informativos. Está prohibido el uso no autorizado del sitio o de sus contenidos, lo que podría violar las leyes de propiedad intelectual.</p></section><section class="mb-6" data-v-993d1b33><h2 class="text-xl font-semibold mb-3" data-v-993d1b33>3. Precisión de Contenidos</h2><p data-v-993d1b33>El contenido de este sitio web puede contener errores técnicos, tipográficos o fotográficos. No garantizamos que cualquier contenido sea preciso, completo o actual. Podemos realizar cambios al contenido en cualquier momento sin previo aviso.</p></section><section class="mb-6" data-v-993d1b33><h2 class="text-xl font-semibold mb-3" data-v-993d1b33>4. Enlaces a Terceros</h2><p data-v-993d1b33>Este sitio puede contener enlaces a sitios web de terceros. Estos enlaces son proporcionados únicamente para su conveniencia. No tenemos control sobre el contenido de estos sitios y no asumimos responsabilidad por ellos.</p></section><section class="mb-6" data-v-993d1b33><h2 class="text-xl font-semibold mb-3" data-v-993d1b33>5. Modificaciones a los Términos</h2><p data-v-993d1b33>Podemos revisar estos términos de uso en cualquier momento sin previo aviso. Al usar este sitio, usted acepta estar sujeto a la versión actual de estos Términos y Condiciones.</p></section></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terminos-uso.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const terminosUso = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-993d1b33"]]);

export { terminosUso as default };
//# sourceMappingURL=terminos-uso.vue.mjs.map
