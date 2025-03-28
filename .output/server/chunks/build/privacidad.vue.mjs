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
  __name: "privacidad",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 py-12" }, _attrs))} data-v-e326d21d><h1 class="text-3xl font-bold mb-6" data-v-e326d21d>Política de Privacidad</h1><div class="prose prose-lg" data-v-e326d21d><p class="mb-4" data-v-e326d21d>En Paraná Hogar, nos comprometemos a proteger su privacidad y a tratar sus datos personales con transparencia.</p><h2 class="text-xl font-semibold mt-6 mb-3" data-v-e326d21d>Información que recopilamos</h2><p data-v-e326d21d>Podemos recopilar la siguiente información:</p><ul class="list-disc pl-6 mb-4" data-v-e326d21d><li data-v-e326d21d>Información de contacto (nombre, dirección, correo electrónico, teléfono)</li><li data-v-e326d21d>Información de la cuenta (nombre de usuario, contraseña)</li><li data-v-e326d21d>Historial de compras y preferencias</li><li data-v-e326d21d>Información de navegación y uso del sitio</li></ul><h2 class="text-xl font-semibold mt-6 mb-3" data-v-e326d21d>Uso de la información</h2><p data-v-e326d21d>Utilizamos su información para:</p><ul class="list-disc pl-6 mb-4" data-v-e326d21d><li data-v-e326d21d>Procesar sus pedidos y transacciones</li><li data-v-e326d21d>Mejorar nuestros productos y servicios</li><li data-v-e326d21d>Personalizar su experiencia de compra</li><li data-v-e326d21d>Comunicarnos con usted sobre ofertas y novedades</li></ul><h2 class="text-xl font-semibold mt-6 mb-3" data-v-e326d21d>Protección de datos</h2><p class="mb-4" data-v-e326d21d>Implementamos medidas de seguridad adecuadas para proteger sus datos contra acceso no autorizado, alteración, divulgación o destrucción.</p><h2 class="text-xl font-semibold mt-6 mb-3" data-v-e326d21d>Cookies</h2><p class="mb-4" data-v-e326d21d>Utilizamos cookies para mejorar su experiencia en nuestro sitio. Puede configurar su navegador para rechazar cookies, aunque esto podría limitar algunas funcionalidades.</p><h2 class="text-xl font-semibold mt-6 mb-3" data-v-e326d21d>Sus derechos</h2><p class="mb-4" data-v-e326d21d>Tiene derecho a acceder, corregir o eliminar sus datos personales. Para ejercer estos derechos, contáctenos a través de nuestro formulario de contacto.</p><h2 class="text-xl font-semibold mt-6 mb-3" data-v-e326d21d>Cambios en esta política</h2><p class="mb-4" data-v-e326d21d>Podemos actualizar esta política periódicamente. Le recomendamos revisar esta página regularmente para estar informado sobre cualquier cambio.</p><p class="mt-8 text-sm text-gray-600" data-v-e326d21d>Última actualización: Enero 2024</p></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacidad.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const privacidad = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e326d21d"]]);

export { privacidad as default };
//# sourceMappingURL=privacidad.vue.mjs.map
