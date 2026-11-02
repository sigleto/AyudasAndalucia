require("../tests/register.cjs");
const fs = require("node:fs");
const path = require("node:path");
const { aids, REVIEW_DATE } = require("../src/domain/catalog.ts");
const { statusLabels } = require("../src/domain/types.ts");
const intro = `# Fuentes de ayudas\n\nRevisión: ${REVIEW_DATE} (Europe/Madrid). Fuentes oficiales consultadas por búsqueda y lectura web. No se presume que una página informativa abra una convocatoria. Donde no se verificó el plazo o el expediente completo, la app muestra «Consultar convocatoria oficial». Los resúmenes no reproducen todas las bases.\n\n`;
const entries = aids
  .map(
    (a) =>
      `## ${a.name}\n\n- Identificador: \`${a.id}\`. Revisión: ${a.reviewed}.\n- [Fuente oficial](${a.source}).\n- Verificado: objeto y colectivo; ${a.calculator ? "regla de cálculo de pago único y cómputo por discapacidad" : "referencia del programa y condiciones descritas en la ficha"}.\n- Estado incorporado: **${statusLabels[a.status]}**. ${a.period}\n- Límites: ${a.status === "unknown" ? "no se afirma apertura actual; comprobar convocatoria o disponibilidad." : "revisar modificaciones posteriores y condiciones completas antes de solicitar."}\n`,
  )
  .join("\n");
fs.writeFileSync(
  "FUENTES_AYUDAS.md",
  intro +
    entries +
    "\n## Fuentes complementarias\n\n- [SMI 2026, BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2026-3815): 1.221 €/mes para el cálculo de partos múltiples de 2026.\n- [Servicios IMV, Seguridad Social](https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/65850d68-8d06-4645-bde7-05374ee42ac7/serviciossobreimv?changeLanguage=es): simulador oficial y tramitación.\n",
);
function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
}
const files = walk("legacy/components");
const routes = [
  ...fs
    .readFileSync("legacy/components/navigator.tsx", "utf8")
    .matchAll(/name="([^"]+)"/g),
].map((m) => m[1]);
let inventory =
  "# Inventario inicial y auditoría\n\nFecha: " +
  REVIEW_DATE +
  "\n\n## Configuración inicial\n\nExpo 52 / React Native 0.76.7 / React 18.3.1; Drawer y Stack anidados. 8 categorías. No había servidor ni persistencia de favoritos. AdMob 14.9.0 con banner, intersticial automático y exportación condicionada a recompensa. Configuración AdMob fuera de `expo` ignorada por Expo CLI.\n\n## Archivos originales\n\n" +
  files.map((f) => "- `" + f.replaceAll("\\", "/") + "`").join("\n");
inventory +=
  "\n\n## Rutas declaradas originalmente\n\n" +
  [...new Set(routes)].map((r) => "- `" + r + "`").join("\n");
inventory +=
  "\n\n## Auditoría de los 22 simuladores originales\n\nSe inspeccionaron todos los formularios. Esta lista recoge líneas relevantes de sus reglas; el código íntegro queda archivado. Todos se sustituyen por guías de requisitos de la ficha correspondiente, salvo partos múltiples, rehecho con la regla del INSS. El Bono Carestía pasa a histórico sin simulación.\n";
for (const f of files.filter((f) =>
  f.includes(`${path.sep}Simuladores${path.sep}`),
)) {
  const rules = fs
    .readFileSync(f, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter(
      (l) =>
        /Ejemplo:|como ejemplo|const (base|importe|aval|financiacion|precioMaximo)|rentaNum [<>]|ingresosNum [<>]|setCuantia\(/.test(
          l,
        ) && !/placeholder/.test(l),
    );
  inventory +=
    "\n### " +
    path.basename(f) +
    "\n\n" +
    (rules.length
      ? rules
          .slice(0, 12)
          .map((l) => "- `" + l.replaceAll("`", "'") + "`")
          .join("\n")
      : "Formulario de condiciones parciales: no acredita todos los requisitos. Se sustituye por una guía sin concesión automática.") +
    "\n";
}
inventory +=
  "\n## Hallazgos y sustituciones\n\n- RMISA y solidaridad alimentaria enlazaban al mismo procedimiento 24580. Se separan RMISA (12563) y BÁSICO (BOJA 2026/124/3).\n- Bono Carestía calculaba cantidades por miembro sin respaldo: histórico, sin nuevas solicitudes.\n- Emergencia, guardería, alquiler, discapacidad y cuidadores incluían bases o límites de ejemplo; se retiran esos cálculos.\n- Garantía Vivienda calculaba un aval del 15 %: sustituido por orientación sobre el instrumento actual, sin aprobación bancaria ficticia.\n- Segunda Oportunidad se mueve de desempleo a estudios; sigue encontrándose por colectivo desempleado.\n- Prestaciones sociales por discapacidad se concreta en PNC; contratación de cuidadores se sustituye por dependencia/PIA. No se ha confirmado la antigua subvención genérica.\n- Ayudas regionales de partos se sustituyen por la prestación estatal identificada expresamente. No se mezclan sus reglas.\n- Modernización de maquinaria se concreta en Renove; medidas sectoriales se reorganizan como guía PAC.\n- Las 11 pantallas de informe se reemplazan por exportación común desde cada guía (PDF nativo y compartir en web).\n- El formulario general tenía opciones vacías y simuladores con rutas no registradas en el stack activo. El nuevo Drawer accede a un único Stack padre de fichas/guías tipadas; no se conservan enlaces a pantallas antiguas.\n- Ampliaciones: IMV/infancia, prestación contributiva, subsidio por agotamiento, beca general, dependencia y bono social eléctrico.\n\n## Flujo actual\n\nInicio / Buscar / Convocatorias / Favoritos / Orientación / Información (Drawer) → Ficha(id) → Guía(id). El botón Atrás regresa al origen. Toda categoría, búsqueda y filtro consulta el mismo catálogo.\n";
fs.writeFileSync("AUDITORIA.md", inventory);
