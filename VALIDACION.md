# Validación de la modernización

Fecha de referencia de contenido: **30/10/2026**, Europe/Madrid.

## Rediseño editorial posterior

Interfaz reorganizada con fondo cálido, azul marino y acentos coral, azul, violeta y amarillo. Inicio incorpora búsqueda directa, orientación destacada, mosaico de categorías e ilustración geométrica realizada con vistas e iconos existentes. Los listados usan separadores; las fichas combinan secciones abiertas, cuantía destacada, pasos numerados y acceso fijo a la fuente oficial. El simulador separa condiciones, datos y resultado, permite volver a editar y conserva las reglas y el contenido del informe. No se han añadido dependencias ni modificado el catálogo, fórmulas, persistencia o integración publicitaria en este rediseño.

Revisión visual mediante capturas de la vista previa web en Chrome a 390 y 320 px: Inicio, mosaico, ficha, simulador y resultado. Capturas `editorial-*.png` en `.validation/`. Se adapta la prueba de navegación a las nuevas etapas; se comprueba también la búsqueda desde Inicio y la invalidación del cálculo al editar. Esta comprobación visual no sustituye una prueba nativa Android.

Resultado del rediseño: TypeScript sin errores, 10/10 pruebas de dominio y 6/6 pruebas de interfaz. La comprobación de 320 px verifica que las primeras categorías mantienen dos columnas; los nombres largos se revisaron visualmente y se ajustaron sus espacios.

## Alcance implementado

30 fichas en 10 categorías. Búsqueda por palabras sin tildes; filtros combinados de categoría, colectivo y estado; favoritos persistidos con AsyncStorage y errores recuperables; orientación por situación; fichas con documentación, requisitos, cuantía, compatibilidades, pasos y fuente. El Bono Carestía es histórico. Cuota Cero, inicio de actividad, becas del curso identificado y Renove tienen su cierre claramente indicado.

Los 22 formularios antiguos se han revisado. Se conserva un cálculo local fiable de partos/adopciones múltiples, con SMI 2026 y cómputo por discapacidad. Los demás se sustituyen por guías de comprobación, sin inventar importes. IMV tiene acceso a su simulador oficial. Los informes comunes reemplazan las 11 pantallas duplicadas y no requieren una recompensa publicitaria.

## Migración técnica

Ruta incremental Expo 52 → 53 → 54 → **55.0.32**, con alineación de dependencias, React **19.2.0**, React Native **0.83.10**, Reanimated **4.2.1**, Worklets **0.7.4** y AdMob fijado en **16.0.3** (Google Mobile Ads Android 24.9.0). AdMob 16.5.0 traía Google 25.4.0 con metadatos Kotlin 2.3 incompatibles con Kotlin 2.1 de Expo 55; se corrigió sin forzar el compilador de todo el proyecto. Nueva arquitectura, áreas seguras y Android API objetivo/compilación **36**, mínimo **24**. El plugin Expo incorpora el ID AdMob y retrasa la medición hasta la inicialización después del consentimiento.

Fuentes técnicas revisadas:

- [Migración oficial Expo](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/).
- [SDK 54](https://expo.dev/changelog/sdk-54) y [SDK 55](https://expo.dev/changelog/sdk-55).
- [Requisitos de API de Google Play](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en-EN): actualizaciones desde 31/08/2026 requieren API 36.
- [Consentimiento UMP en AdMob](https://docs.page/invertase/react-native-google-mobile-ads/european-user-consent) y código del plugin instalado.

No se cambian el identificador Android, EAS projectId, `eas.json` ni credenciales de firma. No se publica ni se sube el código.

## Comprobaciones completadas

- TypeScript estricto: sin errores.
- Pruebas de dominio: **10/10**. Incluyen integridad de catálogo, referencias, búsqueda, filtros, límites del cálculo, datos incompletos, estados por fecha/Madrid, corrupción de favoritos y escape HTML.
- Expo Doctor: **20/20**, sin problemas de esquema ni duplicación de módulos.
- `expo install --check`: dependencias compatibles.
- Exportación de producción Android (Hermes) y web: completada.
- Prebuild Android: completado; manifiesto con ID AdMob correcto y medición diferida; Gradle confirma compileSdk/targetSdk 36.
- Interfaz Chrome móvil: búsqueda → ficha → favorito → guía; persistencia tras recarga; errores de formulario; desglose; invalidación del resultado al editar; categorías, filtros, estados vacíos y orientación: superados.
- Menú completo en anchura 320 px: superado, sin desbordamiento horizontal. Capturas inspeccionadas en `.validation/`.
- Las 30 fichas abiertas desde la búsqueda, fuente oficial visible y navegación Atrás: superado.
- Pasada final de Playwright contra el bundle web de producción servido en localhost: **5/5**, en 3,3 minutos. El servidor de prueba se cierra al finalizar.

## Límites y verificaciones externas

**El APK nativo no se ha generado.** Se intentó `:app:assembleDebug` para x86_64 con el Android SDK local. Tras corregir la incompatibilidad Kotlin de AdMob, Ninja falló en `:react-native-reanimated:buildCMakeDebug[x86_64][reanimated]` al crear directorios derivados de la ruta larga de Windows (`ninja: error: mkdir(...): No such file or directory`). CMake también advierte de rutas superiores a su límite para Expo Modules Core. Se probó una unidad temporal con `subst`, pero autolinking/CMake recuperan rutas absolutas originales y Kotlin mezcla raíces C:/R:. El proceso se detuvo tras el fallo; registro en `.validation/android-short-build.log`. Para completar esta validación, compilar en una ubicación física corta o en Linux y probar el binario en dispositivo. No se ha validado un AAB de distribución, ejecución Android, PDF nativo ni compatibilidad binaria de 16 KB. La exportación Hermes y el prebuild no sustituyen esa comprobación.

No se ha comprobado la entrega de anuncios reales ni los mensajes UMP de la cuenta del propietario. Los identificadores se conservan y el modo desarrollo usa el ID de prueba de Google. La app funciona si no hay anuncios o falla la conexión.

No se ha compilado iOS en Windows. La versión original no contenía ID AdMob iOS; el módulo publicitario está deshabilitado para esa plataforma mediante autolinking. El plugin oficial emite un aviso genérico de ausencia de ese ID al leer la configuración.

`npm audit fix` aplicó correcciones compatibles. Quedan **8 avisos transitivos (5 bajos y 3 altos)** asociados a `deepmerge`/`zod` y herramientas Expo. La reparación automática sugería retroceder Expo a SDK 51; no se aplicó ese cambio incompatible. No se han forzado versiones mayores de dependencias internas del CLI. Revisar de nuevo al actualizar Expo.

Las guías no son un motor legal exhaustivo. Los campos no confirmados se remiten expresamente a la convocatoria; las fuentes y fechas están en `FUENTES_AYUDAS.md`. El catálogo no recibe actualizaciones remotas.
