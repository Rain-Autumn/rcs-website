import { expect, test } from "@playwright/test";

test("research introduction is readable across desktop, tablet and small phones", async ({
  page,
}, testInfo) => {
  for (const width of [320, 390, 760, 1024, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/fr");
    const hero = page.locator("[data-research-hero]");
    await expect(hero).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(hero.locator("h1")).toContainText("Explorer l’intelligence");
    const decoration = hero.locator("[data-circuit-decoration]");
    await expect(decoration).toHaveAttribute("aria-hidden", "true");
    await expect(decoration).toHaveCSS("pointer-events", "none");
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width + 1);
    for (const anchor of await hero.locator('a[href^="#"]').all()) {
      const href = await anchor.getAttribute("href");
      await expect(page.locator(href!)).toHaveCount(1);
      await expect(anchor).toBeVisible();
    }
    if ([390, 1440].includes(width)) {
      await page.screenshot({
        path: testInfo.outputPath(`research-home-${width}.png`),
      });
    }
  }
});

test("retired chat has no local page, API or online links in any language", async ({
  page,
  request,
}) => {
  for (const locale of ["fr", "en", "nl"]) {
    const response = await page.goto(`/${locale}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("[data-research-hero] h1")).toBeVisible();
    await expect(
      page.locator('a[href*="evidence-engine"], a[href*="livechat"]'),
    ).toHaveCount(0);
    const legacy = await request.get(`/${locale}/evidence-engine`, {
      maxRedirects: 0,
    });
    expect(legacy.status()).toBe(404);
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(jsonLd.join(" ")).not.toContain("evidence-engine");
  }
  for (const path of [
    "/livechat",
    "/chat",
    "/api/chat",
    "/api/commander-auth",
  ]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(404);
  }
});

test("translated research titles stay within a small phone viewport", async ({
  page,
}, testInfo) => {
  const titles = {
    fr: "Explorer l’intelligence artificielle.",
    en: "Exploring artificial intelligence.",
    nl: "Kunstmatige intelligentie verkennen.",
  };
  await page.setViewportSize({ width: 320, height: 900 });
  for (const [locale, title] of Object.entries(titles)) {
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toHaveText(title);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(321);
    if (locale !== "fr") {
      await page.screenshot({
        path: testInfo.outputPath(`research-home-${locale}-320.png`),
      });
    }
  }
});

test("skip and hero links remain operable with reduced motion", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fr");
  const skip = page.getByRole("link", {
    name: "Aller au contenu",
    exact: true,
  });
  // Mobile Safari does not traverse links with Tab unless full keyboard access is enabled.
  if (testInfo.project.use.isMobile) await skip.focus();
  else await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  const links = page.locator('[data-research-hero] a[href^="#"]');
  await links.first().focus();
  await expect(links.first()).toBeFocused();
  await expect(
    page.locator(
      "[data-circuit-decoration] a, [data-circuit-decoration] button",
    ),
  ).toHaveCount(0);
});
