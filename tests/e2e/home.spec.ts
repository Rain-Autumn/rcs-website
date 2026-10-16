import { expect, test } from "@playwright/test";

test("root opens the single French landing page without an entry gate", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/fr$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "L’IA, de l’idée",
  );
  await expect(
    page.getByRole("button", { name: "ENTER", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator("main > section")).toHaveCount(3);
  await expect(
    page.getByRole("link", { name: "Ouvrir Evidence Engine", exact: true }),
  ).toHaveAttribute("href", "https://evidence-engine.raijucloudsystem.com/");
});
test("research filters, empty state and reset work", async ({ page }) => {
  await page.goto("/fr");
  await page
    .getByRole("button", { name: "Intelligence artificielle", exact: true })
    .click();
  await expect(page.locator("#recherches article")).toHaveCount(2);
  await page.getByRole("searchbox").fill("zzzz-no-result");
  await expect(
    page.getByText("Aucune publication ne correspond."),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Réinitialiser les filtres", exact: true })
    .click();
  await expect(page.locator("#recherches article")).toHaveCount(4);
});
test("team logos use the Arkenstone variant only for the founder", async ({
  page,
}) => {
  await page.goto("/fr#equipe");
  await expect(
    page.locator("#RCS-TM-001 [data-emblem=arkenstone]"),
  ).toHaveCount(1);
  await expect(page.locator("#RCS-TM-002 [data-emblem=rcs] img")).toBeVisible();
  await expect(
    page.locator("#RCS-TM-002 [data-emblem=arkenstone]"),
  ).toHaveCount(0);
  await page.locator("#RCS-TM-001 summary").click();
  await expect(
    page.getByText("Build an AI Agent", { exact: true }),
  ).toBeVisible();
});
test("language links preserve the current section", async ({ page }) => {
  await page.goto("/fr#recherches");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en#recherches$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "NL", exact: true }).click();
  await expect(page).toHaveURL(/\/nl#recherches$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "nl");
});
test("legacy routes lead to the correct home anchors", async ({ page }) => {
  for (const [route, anchor] of [
    ["presentation", "accueil"],
    ["research", "recherches"],
    ["team", "equipe"],
    ["evidence-engine", "accueil"],
    ["squadron", "accueil"],
  ]) {
    await page.goto("/fr/" + route);
    await expect(page).toHaveURL(new RegExp("/fr#" + anchor + "$"));
  }
});
test("mobile landing remains readable and its menu closes on navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fr");
  await page
    .getByRole("button", { name: "Ouvrir le menu", exact: true })
    .click();
  await page.getByRole("link", { name: "Équipe", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Ouvrir le menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
    ),
  ).toBe(false);
});
test("public landing does not expose administration forms", async ({
  page,
}) => {
  await page.goto("/fr");
  await expect(page.locator("input[type=password]")).toHaveCount(0);
  await page.goto("/fr/admin");
  await expect(page.locator("input[type=password]")).toHaveCount(2);
});
