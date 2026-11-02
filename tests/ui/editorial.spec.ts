import { test, expect } from "@playwright/test";
test("revisión editorial en móvil: portada, mosaico, ficha y recorrido", async ({
  page,
}) => {
  await page.goto("/");
  await page.screenshot({ path: ".validation/editorial-home.png" });
  await page
    .getByRole("button", { name: "Becas y estudios", exact: true })
    .scrollIntoViewIfNeeded();
  await page.screenshot({ path: ".validation/editorial-categories.png" });
  await page
    .getByRole("button", { name: "Empezar simulación →" })
    .scrollIntoViewIfNeeded();
  await page.screenshot({ path: ".validation/editorial-simulator-promo.png" });
  await page.getByRole("button", { name: "Empezar simulación →" }).click();
  await page.screenshot({ path: ".validation/editorial-guide.png" });
  await page.getByRole("button", { name: "Continuar con mis datos →" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await page.reload();
  await page
    .getByRole("textbox", { name: "Buscar desde Inicio" })
    .fill("parto");
  await page
    .getByRole("button", { name: "Buscar ayudas →", exact: true })
    .click();
  await expect(
    page.getByText("1 ayuda encontrada", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver ayuda →" }).click();
  await page.screenshot({ path: ".validation/editorial-detail.png" });
  await page
    .getByRole("heading", { name: "Cuantía", exact: true })
    .scrollIntoViewIfNeeded();
  await page.screenshot({ path: ".validation/editorial-detail-body.png" });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.reload();
  const firstTile = await page
    .getByRole("button", { name: "Desempleo", exact: true })
    .boundingBox();
  const secondTile = await page
    .getByRole("button", { name: "Ayudas sociales", exact: true })
    .boundingBox();
  expect(firstTile?.y).toBe(secondTile?.y);
  await page.screenshot({ path: ".validation/editorial-home-320.png" });
  await page
    .getByRole("button", { name: "Emprendimiento", exact: true })
    .scrollIntoViewIfNeeded();
  await page.screenshot({ path: ".validation/editorial-categories-320.png" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
