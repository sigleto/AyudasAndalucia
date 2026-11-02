import { test, expect } from "@playwright/test";
import { aids } from "../../src/domain/catalog";

test("menú completo en móvil pequeño", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  for (const [label, heading] of [
    ["Favoritos", "Tus ayudas guardadas"],
    ["Convocatorias", "Convocatorias"],
    ["Orientación", "Empezamos por ti"],
    ["Información y privacidad", "Una guía independiente"],
    ["Buscar ayudas", "Encuentra tu ayuda"],
    ["Inicio", "¿Qué ayuda estás buscando?"],
  ]) {
    await page.getByRole("button", { name: "Show navigation menu" }).click();
    await page.getByText(label, { exact: true }).first().click();
    await expect(
      page.getByRole("heading", { name: heading, exact: false }).last(),
    ).toBeVisible();
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: ".validation/home-320.png" });
});

test("las 30 fichas se abren desde búsqueda y permiten volver", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.goto("/");
  await page
    .getByRole("button", { name: "Buscar ayudas →", exact: true })
    .click();
  for (const aid of aids) {
    await page
      .getByRole("textbox", { name: "Buscar ayudas", exact: true })
      .fill(aid.name);
    await expect(
      page.getByText("1 ayuda encontrada", { exact: true }),
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Ver ayuda →", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: aid.name, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: "Consultar fuente oficial ↗",
        exact: true,
      }),
    ).toBeVisible();
    if (aid.status === "historical")
      await expect(
        page.getByRole("button", { name: "Preparar mi solicitud · guía" }),
      ).toHaveCount(0);
    await page.getByRole("link", { name: /back/i }).first().click();
  }
});
