import { test, expect } from "@playwright/test";
test("inicio, búsqueda, ficha, favoritos persistentes, guía y navegación", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByText("¿Qué ayuda estás buscando?", { exact: false }),
  ).toBeVisible();
  await page.screenshot({
    path: ".validation/home-mobile.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Buscar ayudas →", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Buscar ayudas", exact: true })
    .fill("minimo vital");
  await expect(
    page.getByText("1 ayuda encontrada", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ver ayuda →", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Ingreso Mínimo Vital y complemento de infancia",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "☆ Guardar ayuda", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "★ Guardada · quitar de favoritos" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Preparar mi solicitud · guía" })
    .click();
  await page
    .getByRole("button", { name: "Ver mi orientación", exact: true })
    .click();
  await expect(page.getByRole("alert")).toContainText("Responde a todos");
  for (const button of await page
    .getByRole("button", { name: "No lo sé", exact: true })
    .all())
    await button.click();
  await page
    .getByRole("button", { name: "Ver mi orientación", exact: true })
    .click();
  await expect(
    page.getByText("Esta guía no determina elegibilidad ni importe.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.screenshot({
    path: ".validation/guide-mobile.png",
    fullPage: true,
  });
  await page.reload();
  await page
    .getByRole("button", { name: "Buscar ayudas →", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Buscar ayudas", exact: true })
    .fill("minimo vital");
  await page.getByRole("button", { name: "Ver ayuda →", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "★ Guardada · quitar de favoritos" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("simulador: validación, desglose y resultado invalidado al editar", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Buscar ayudas →", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Buscar ayudas", exact: true })
    .fill("parto");
  await page.getByRole("button", { name: "Ver ayuda →", exact: true }).click();
  await page
    .getByRole("button", { name: "Simular importe orientativo" })
    .click();
  for (const button of await page
    .getByRole("button", { name: "Sí", exact: true })
    .all())
    await button.click();
  await page.getByRole("button", { name: "Continuar con mis datos →" }).click();
  await page.getByRole("button", { name: "Calcular orientación" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Año del nacimiento o adopción" })
    .fill("2026");
  await page
    .getByRole("textbox", { name: "Número de hijos simultáneos" })
    .fill("2");
  await page
    .getByRole("textbox", { name: "Hijos con discapacidad reconocida" })
    .fill("1");
  await page.getByRole("button", { name: "Calcular orientación" }).click();
  await expect(
    page.getByText(/Estimación de pago único: 9.?768/),
  ).toBeVisible();
  await page.screenshot({
    path: ".validation/calculator-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Editar datos", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Número de hijos simultáneos" })
    .fill("3");
  await expect(page.getByText(/Estimación de pago único/)).toHaveCount(0);
});
test("categorías, filtros combinados, vacíos y orientación", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Energía", exact: true }).click();
  await expect(
    page.getByText("1 ayuda encontrada", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Mostrar filtros/ }).click();
  await page
    .getByRole("button", { name: "Convocatoria cerrada", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "No encontramos coincidencias" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Limpiar filtros", exact: true })
    .click();
  await expect(
    page.getByText("30 ayudas encontradas", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await page
    .getByRole("button", { name: "Orientarme según mi situación" })
    .click();
  await page.getByRole("button", { name: "Familias", exact: true }).click();
  await page
    .getByRole("button", { name: "Ver ayudas relacionadas", exact: true })
    .click();
  await expect(
    page.getByText("Prestación por parto o adopción múltiples", {
      exact: true,
    }),
  ).toBeVisible();
});
