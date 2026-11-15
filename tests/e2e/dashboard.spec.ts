import { expect, test } from "@playwright/test";

test("desktop research uses the space released by the retired panels", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/fr");
  const research = await page
    .locator('[data-dashboard-panel="research"]')
    .boundingBox();
  const dashboard = await page.locator("[data-dashboard]").boundingBox();
  expect(research).not.toBeNull();
  expect(dashboard).not.toBeNull();
  await expect(page.locator('[data-dashboard-panel="even"]')).toHaveCount(0);
  await expect(page.locator('[data-dashboard-panel="security"]')).toHaveCount(
    0,
  );
  expect(research!.width).toBeCloseTo(dashboard!.width, 0);
  expect(research!.x).toBeCloseTo(dashboard!.x, 0);
  await page.screenshot({
    path: testInfo.outputPath("rcs-dashboard-desktop.png"),
  });
  await page.locator('[data-dashboard-panel="research"] li a').first().click();
  const hash = new URL(page.url()).hash;
  await expect(page.locator(hash)).toBeVisible();
});

test("research remains readable on small screens without horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 760]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/en");
    const research = await page
      .locator('[data-dashboard-panel="research"]')
      .boundingBox();
    expect(research).not.toBeNull();
    expect(research!.x).toBeGreaterThanOrEqual(0);
    expect(research!.x + research!.width).toBeLessThanOrEqual(width + 1);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth + 1,
      ),
    ).toBe(true);
    await expect(page.locator('[data-dashboard-panel="even"]')).toHaveCount(0);
  }
});

test("Shield is absent from navigation and language links drop its inactive anchor", async ({
  page,
}) => {
  await page.goto("/fr#securite");
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);
  for (const locale of ["fr", "en", "nl"]) {
    await page.goto(`/${locale}`);
    await expect(page.locator("#securite")).toHaveCount(0);
    await expect(page.locator('a[href="#securite"]')).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(/RCS shield/i);
  }
});
