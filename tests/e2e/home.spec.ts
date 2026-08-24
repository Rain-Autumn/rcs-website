import { expect, test } from "@playwright/test";

test("welcome portal opens the language gate then the French RCS directory", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("WELCOME PORTAL", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "ENTER" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "SELECT SYSTEM LANGUAGE" }),
  ).toHaveCount(0);

  await page.getByRole("button", { name: "ENTER" }).click();

  await expect(
    page.getByRole("heading", { name: "SELECT SYSTEM LANGUAGE" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /FRANÇAIS/ })).toBeVisible();
  await page.getByRole("button", { name: /FRANÇAIS/ }).click();

  await expect(page).toHaveURL(/\/fr/);
  await expect(
    page.getByRole("heading", { name: "Un système. Quatre espaces." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /RCS en détail/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /RCS Evidence Engine/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Research/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Team/i })).toBeVisible();
});

test("English and Dutch hubs render translated institutional copy", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(
    page.getByRole("heading", { name: "One system. Four spaces." }),
  ).toBeVisible();
  await page.goto("/nl");
  await expect(
    page.getByRole("heading", { name: "Eén systeem. Vier ruimtes." }),
  ).toBeVisible();
});

test("presentation retains the complete RCS Core content", async ({ page }) => {
  await page.goto("/fr/presentation");
  await expect(
    page
      .getByText("RCS CORE", { exact: true })
      .filter({ visible: true })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .getByText("DEBIAN 13", { exact: true })
      .filter({ visible: true })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .getByText("RAIJU EMBLEM / CORE MARK", { exact: true })
      .filter({ visible: true })
      .first(),
  ).toBeVisible();
});

test("mobile presentation has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fr/presentation");
  await page.locator("#intelligence").scrollIntoViewIfNeeded();
  await expect(page.getByRole("button", { name: /DRAGON ONE/i })).toBeVisible();
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBeFalsy();
});

test("Evidence Engine route explains the real architecture and links to Dragon One", async ({
  page,
}) => {
  await page.goto("/fr/squadron");
  await expect(
    page.getByRole("heading", {
      name: "L’IA coordonnée. Sous contrôle humain.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Agents éphémères" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Dragon Two" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /ESSAYER DRAGON ONE/i }).first(),
  ).toHaveAttribute("href", "https://evidence-engine.raijucloudsystem.com/");
});

test("mobile hub and Evidence Engine pages have no horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/fr", "/fr/squadron"]) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBeFalsy();
  }
});

test("mobile Research page has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fr/research");
  await expect(
    page.getByRole("heading", {
      name: "Recherche documentée. Résultats transparents.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /10\.5281\/zenodo\.21994886/ }),
  ).toHaveAttribute("href", "https://doi.org/10.5281/zenodo.21994886");
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBeFalsy();
});

test("team routes render Hugues Henrotte and certifications", async ({
  page,
}) => {
  await page.goto("/fr/team");
  await expect(
    page.getByRole("heading", { name: "Hugues Henrotte" }),
  ).toBeVisible();
  await expect(
    page.getByText("AWS Knowledge: Cloud Essentials - Training Badge"),
  ).toBeHidden();
  await page.getByText("AFFICHER", { exact: true }).first().click();
  await expect(
    page.getByText("AWS Knowledge: Cloud Essentials - Training Badge"),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Microsoft Applied Skills : Migrer des charges de travail SQL Server vers Azure SQL Database",
    ),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Microsoft Applied Skills : Créer un agent dans Microsoft Copilot Studio",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /ORCID iD 0009-0009-7729-6552/ }),
  ).toHaveAttribute("href", "https://orcid.org/0009-0009-7729-6552");
});

test("mobile Team page has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fr/team");
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBeFalsy();
});

test("private identity is never rendered", async ({ page }) => {
  for (const route of [
    "/",
    "/fr",
    "/fr/presentation",
    "/fr/squadron",
    "/en",
    "/nl",
  ]) {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText(
      ["Capitaine", "Autumn"].join(" "),
    );
  }
});
