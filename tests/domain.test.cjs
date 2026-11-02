require("./register.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { aids, REVIEW_DATE } = require("../src/domain/catalog.ts");
const { categories } = require("../src/domain/types.ts");
const {
  effectiveStatus,
  filterAids,
  multipleBirth,
  parseInteger,
  guidance,
  decodeFavorites,
  escapeHTML,
  madridDate,
} = require("../src/domain/logic.ts");
test("catálogo íntegro: identificadores, categorías, campos, fuentes y relacionados", () => {
  assert.equal(new Set(aids.map((a) => a.id)).size, aids.length);
  for (const a of aids) {
    assert.ok(categories.includes(a.category));
    for (const key of [
      "name",
      "agency",
      "summary",
      "amount",
      "period",
      "compatibility",
      "reviewed",
    ])
      assert.ok(a[key], `${a.id}: ${key}`);
    for (const key of ["requirements", "audience", "documents", "steps"])
      assert.ok(a[key].length);
    assert.match(a.source, /^https:\/\//);
    assert.ok(
      /(juntadeandalucia\.es|seg-social\.es|sepe\.es|inclusion\.gob\.es|boe\.es|mapa\.gob\.es|miteco\.gob\.es|imserso\.es|andaluciaemprende\.es|educacionfpydeportes\.gob\.es)$/.test(
        new URL(a.source).hostname,
      ),
    );
    assert.equal(a.reviewed, REVIEW_DATE);
    for (const id of a.related || [])
      assert.ok(
        aids.some((a) => a.id === id),
        id,
      );
    if (a.status === "open") assert.ok(a.opens && a.closes);
  }
});
test("plazo inclusivo, cierre automático y convocatoria futura", () => {
  const a = aids.find((a) => a.id === "empleat");
  assert.equal(effectiveStatus(a, "2026-10-31"), "open");
  assert.equal(effectiveStatus(a, "2026-11-01"), "closed");
  assert.equal(effectiveStatus(a, "2026-03-27"), "pending");
  assert.equal(
    effectiveStatus(
      aids.find((a) => a.id === "bono-carestia"),
      "2026-10-30",
    ),
    "historical",
  );
  assert.equal(
    effectiveStatus({ ...a, closes: undefined }, "2026-10-31"),
    "unknown",
  );
});
test("fecha de Madrid respeta el cambio de día en UTC", () =>
  assert.equal(madridDate(new Date("2026-10-30T23:30:00Z")), "2026-10-31"));
test("búsqueda sin tildes y filtros combinados", () => {
  assert.ok(
    filterAids(aids, { query: "  MINIMO vital " }).some((a) => a.id === "imv"),
  );
  assert.ok(
    filterAids(aids, { query: "electricidad" }).some(
      (a) => a.id === "bono-social",
    ),
  );
  assert.deepEqual(
    filterAids(
      aids,
      { category: "Emprendimiento", status: "open", audience: "Empresas" },
      "2026-10-30",
    ).map((a) => a.id),
    ["empleat"],
  );
  assert.equal(filterAids(aids, { query: "xyz-no-existe" }).length, 0);
  assert.deepEqual(filterAids(aids, { favorites: [] }), []);
  assert.deepEqual(
    filterAids(aids, { favorites: ["imv"] }).map((a) => a.id),
    ["imv"],
  );
});
test("cada categoría contiene fichas accesibles", () =>
  categories.forEach((category) =>
    assert.ok(filterAids(aids, { category }).length),
  ));
test("partos múltiples: 2, 3, 4+, discapacidad, sin mensualidad", () => {
  assert.equal(multipleBirth("2", "0", "2026").total, 4884);
  assert.equal(multipleBirth("3", "0", "2026").total, 9768);
  assert.equal(multipleBirth("4", "0", "2026").total, 14652);
  assert.equal(multipleBirth("2", "1", "2026").total, 9768);
  assert.equal(multipleBirth("2", "2", "2026").total, 14652);
  assert.equal(multipleBirth("8", "0", "2026").total, 14652);
});
test("rechaza datos incompletos, absurdos y otros años", () => {
  for (const input of ["", "-1", "2.5", "2hijos", "Infinity", "1e2"])
    assert.throws(() => parseInteger(input, 0, 20));
  assert.throws(() => multipleBirth("1", "0", "2026"));
  assert.throws(() => multipleBirth("2", "3", "2026"));
  assert.throws(() => multipleBirth("2", "0", "2025"));
  assert.throws(() => multipleBirth("2", "", "2026"));
});
test("orientación no convierte respuestas en una concesión", () => {
  assert.throws(() => guidance(["A", "B"], { 0: "yes" }));
  const lines = guidance(["A", "B", "C"], { 0: "yes", 1: "no", 2: "unknown" });
  assert.match(lines[0], /sin verificar/);
  assert.match(lines[1], /Posible impedimento/);
  assert.match(lines[2], /Pendiente/);
});
test("favoritos toleran ids retirados y rechazan corrupción", () => {
  assert.deepEqual(decodeFavorites(null, ["imv"]), []);
  assert.deepEqual(decodeFavorites('["imv","imv","vieja"]', ["imv"]), ["imv"]);
  for (const raw of ["invalid", "{}", "[42]"])
    assert.throws(() => decodeFavorites(raw, ["imv"]));
});
test("informes escapan contenido HTML", () =>
  assert.equal(escapeHTML('<script>"&'), "&lt;script&gt;&quot;&amp;"));
