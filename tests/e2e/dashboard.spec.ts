import { expect, test } from "@playwright/test";

test("desktop dashboard follows the 50/25/25 layout and real research anchors", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/fr");
  const even = await page
    .locator('[data-dashboard-panel="even"]')
    .boundingBox();
  const research = await page
    .locator('[data-dashboard-panel="research"]')
    .boundingBox();
  const security = await page
    .locator('[data-dashboard-panel="security"]')
    .boundingBox();
  expect(even).not.toBeNull();
  expect(research).not.toBeNull();
  expect(security).not.toBeNull();
  expect(even!.width).toBeCloseTo(research!.width, 0);
  expect(even!.x).toBeLessThan(research!.x);
  expect(research!.x).toBeCloseTo(security!.x, 0);
  expect(research!.y).toBeLessThan(security!.y);
  expect(even!.height).toBeCloseTo(research!.height + security!.height + 16, 0);
  await page.screenshot({
    path: testInfo.outputPath("rcs-dashboard-desktop.png"),
  });
  await page.locator('[data-dashboard-panel="research"] li a').first().click();
  const hash = new URL(page.url()).hash;
  await expect(page.locator(hash)).toBeVisible();
});

test("dashboard stacks on small screens without horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 760]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/en");
    const even = await page
      .locator('[data-dashboard-panel="even"]')
      .boundingBox();
    const research = await page
      .locator('[data-dashboard-panel="research"]')
      .boundingBox();
    expect(research!.y).toBeGreaterThanOrEqual(even!.y + even!.height);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth + 1,
      ),
    ).toBe(true);
    await expect(
      page.locator('[data-dashboard-panel="even"] img'),
    ).toBeVisible();
  }
});

test("security navigation preserves language and remains explanatory", async ({
  page,
}) => {
  await page.goto("/fr#securite");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en#securite$/);
  await expect(page.locator("#securite")).toContainText(
    "No conversation archiving.",
  );
});
