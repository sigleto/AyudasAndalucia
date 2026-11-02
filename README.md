# Ayudas Públicas Andalucía

Guía independiente para Android: 30 fichas en 10 categorías, búsqueda sin tildes, filtros, favoritos locales, orientación, simulación de partos/adopciones múltiples y exportación de informes. No utiliza cuentas, Firebase ni servidor.

## Desarrollo

Node 22 LTS recomendado (mínimo de Expo: 20.19.4; pruebas ejecutadas con Node 24). Instala con `npm ci`. Usa `npm start` para Metro y un development build, o `npm run android` con Android SDK/JDK configurados. AdMob requiere un binario nativo: Expo Go no incluye ese módulo.

`npm run web` permite revisar navegación y formularios en navegador. La publicidad es exclusiva de Android. En web se comparten informes de texto; en Android se generan PDF mediante Expo Print.

## Validación

- `npm run typecheck`
- `npm test` (Node 22+ para `--test-isolation=none`)
- `npm run check:expo` y `npx expo-doctor`
- `npm run test:ui` (Chrome instalado; Playwright exporta el bundle web de producción y lo sirve localmente)
- `npx expo export --platform android --platform web`
- `npx expo prebuild --platform android --no-install`, seguido de compilación Gradle local.

Los artefactos temporales, capturas y cachés quedan en `.validation/`, excluido de Git y Metro. No confundir el bundle JavaScript con un APK/AAB nativo.

## Mantener las ayudas

Editar `src/domain/catalog.ts`, con fuente oficial, fecha, requisitos, destinatarios, documentación, canal y estado. No marcar `open` sin fechas verificadas. `unknown` es una incertidumbre explícita; no significa pendiente ni abierta. Los plazos con fecha de fin se cierran automáticamente según Europe/Madrid; una nueva convocatoria necesita revisión manual. No hay sincronización remota.

Las cuantías ligadas a un año deben mantener ese año explícito. El simulador solo acepta hechos causantes de 2026 y no calcula con requisitos esenciales sin confirmar. El resto de guías no emite concesiones ni importes inventados. Para IMV se ofrece también el simulador oficial.

Después de cambiar el catálogo: `node scripts/document-catalog.cjs`, `npm test`, y revisar `FUENTES_AYUDAS.md`. Este script genera el registro de fuentes y el inventario técnico; no investiga ni verifica nuevas convocatorias por sí solo.

## Configuración conservada

- Android: `com.sigleto.AyudasAndalucia`.
- EAS projectId: `3bd13dcc-f412-411b-bd43-78ee448a3d7d`.
- `eas.json` y gestión de firma no modificados. No se han leído ni cambiado credenciales remotas.
- AdMob Android app ID y tres IDs de unidades originales conservados. Banners en Inicio, Buscar (incluidas categorías), Convocatorias y Favoritos; intersticial al entrar en una guía o simulador, una vez por visita. Ambos formatos comprueban consentimiento UMP y usan anuncios de prueba en desarrollo. Si un anuncio falla, la app sigue funcionando.
- La configuración original no aportaba un AdMob app ID de iOS. Se desactiva el autolinking de anuncios en iOS; no se inventa uno. El plugin de AdMob puede seguir mostrando un aviso sobre ese ID al evaluar la configuración. iOS no se ha compilado en este equipo Windows.

La configuración de mensajes UMP debe existir en la cuenta AdMob para que Google pueda mostrar el formulario. No se ha accedido ni modificado esa cuenta. Si no se puede obtener autorización para solicitar anuncios, la guía sigue funcionando sin publicidad.

## Organización

- `App.tsx` y `src/navigation.ts`: Drawer y Stack tipados.
- `src/screens.tsx` y `src/ui.tsx`: pantallas y diseño compartido.
- `src/domain`: catálogo, búsqueda, estados y reglas puras.
- `src/state`: favoritos con recuperación de errores.
- `src/reports.ts`: informes con escape de HTML.
- `legacy/`: versión anterior archivada, fuera del bundle y de TypeScript activo; no contiene reglas vigentes.

Consulta `AUDITORIA.md`, `FUENTES_AYUDAS.md` y `VALIDACION.md` para alcance, fuentes y resultados de comprobación. No se ha publicado ni enviado código a servicios externos.
