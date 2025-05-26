# Modo movil

## Diagnostica problemas de rendimiento

Hay recursos que bloquean el primer renderizado de tu página. Te recomendamos que muestres los elementos de JavaScript y CSS críticos insertados y pospongas todos los que no sean esenciales. Consulta cómo eliminar recursos que bloquean el renderizadoLCPFCP


URL
Tamaño de la transferencia
Ahorro potencial
paranashowroom.com.py Propio
6,7 KiB	1960 ms
/_nuxt/ProductMo….DpculPj3.css(dev.paranashowroom.com.py)
2,1 KiB
450 ms
/styles/general.css(dev.paranashowroom.com.py)
0,3 KiB
150 ms
/_nuxt/productoStore.CgTUUoLw.css(dev.paranashowroom.com.py)
1,0 KiB
450 ms
/_nuxt/index.Bn8PSvFJ.css(dev.paranashowroom.com.py)
2,1 KiB
450 ms
/_nuxt/entry.Cq93vWtJ.css(dev.paranashowroom.com.py)
1,3 KiB
450 ms


Los recursos de texto se deberían publicar comprimidos (gzip, deflate o brotli) para minimizar el total de bytes de la red


URL
Tamaño de la transferencia
Ahorro potencial
paranashowroom.com.py Propio
406,5 KiB	277,8 KiB
/_nuxt/Cx4F3yin.js(dev.paranashowroom.com.py)
211,8 KiB
134,8 KiB
https://dev.paranashowroom.com.py
97,7 KiB
78,7 KiB
/_nuxt/BFDD3_lo.js(dev.paranashowroom.com.py)
35,8 KiB
25,1 KiB
/_nuxt/Dp_zVVbZ.js(dev.paranashowroom.com.py)
34,1 KiB
22,4 KiB
/_nuxt/B-_aajFx.js(dev.paranashowroom.com.py)
11,7 KiB
7,4 KiB
/_nuxt/zdWAiZvy.js(dev.paranashowroom.com.py)
7,7 KiB
4,5 KiB
/_nuxt/catalog.XHo8SWHS.css(dev.paranashowroom.com.py)
3,5 KiB
2,5 KiB
/_nuxt/CimA-pFf.js(dev.paranashowroom.com.py)
4,2 KiB
2,4 KiB



Reduce el contenido JavaScript que no se use y retrasa la carga de secuencias de comandos hasta que se necesiten. Así, se reducirán los bytes consumidos por la actividad de red.

En los elementos de imagen, especifica un ancho y una altura explícitos para reducir los cambios de diseño y mejorar el CLS. 

Paraná Hogar
<img src="/img/logo.svg" alt="Paraná Hogar" style="width:180px;">


Publica imágenes con formatos de próxima generación

Usa el componente nuxt/image y establece format="webp"

Publica recursos estáticos con una política de caché eficaz 

- /img/logo.svg(dev.paranashowroom.com.py)
- /styles/general.css(dev.paranashowroom.com.py)

Si un botón no tiene un nombre accesible, los lectores de pantalla lo leerán en voz alta como "botón", lo que hace que el botón no resulte útil a los usuarios que necesitan lectores de pantalla

Usar textos de enlace (y textos alternativos para las imágenes, si estas se usan como enlaces) que sean reconocibles, únicos y que se puedan seleccionar mejora la experiencia de navegación de los usuarios de lectores de pantalla

Los elementos informativos deberían incluir textos alternativos cortos y descriptivos. Si el texto alternativo es idéntico al texto situado junto a un enlace o una imagen, puede resultar confuso para los usuarios de lectores de pantalla, ya que el texto se leerá dos veces


El elemento <html> no tiene un atributo [lang]
Si no se especifica ningún atributo lang en una página, el lector de pantalla asumirá que la página está en el idioma predeterminado que el usuario eligió al configurarlo. Si el idioma de la página es diferente del predeterminado, es posible que el lector de pantalla no lea correctamente el texto de la página.



Se han registrado errores del navegador en la consola
Los errores registrados en la consola indican que hay problemas sin resolver. Pueden proceder de solicitudes fallidas de la red y otros errores del navegador
