import { expect, test } from "@playwright/test";

test.describe("crawlable public research", () => {
  test.use({ javaScriptEnabled: false });

  for (const locale of ["fr", "en", "nl"]) {
    test(`${locale} exposes RP003 in server HTML and opens its canonical article`, async ({
      page,
      request,
    }, testInfo) => {
      const path = `/${locale}/research/rp-003`;
      const canonical = `https://raijucloudsystem.com${path}`;
      const home = await page.goto(`/${locale}`);
      expect(home?.status()).toBe(200);
      const card = page.locator("#RCS-RP-003");
      const localLink = card.locator(`a[href="${path}"]`);
      await expect(localLink).toBeVisible();
      await expect(localLink).not.toHaveAttribute("rel", /nofollow/);
      await expect(
        card.locator('a[href="https://doi.org/10.5281/zenodo.23373563"]'),
      ).toHaveAttribute("target", "_blank");
      await card.screenshot({
        path: testInfo.outputPath(`rp003-${locale}.png`),
      });

      await localLink.click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        canonical,
      );
      const directives = await page
        .locator('meta[name="robots"], meta[name="googlebot"]')
        .evaluateAll((nodes) =>
          nodes.map((node) => node.getAttribute("content") ?? "").join(","),
        );
      expect(directives).not.toMatch(/noindex|nofollow/i);
      const article = await request.get(path, { maxRedirects: 0 });
      expect(article.status()).toBe(200);
      expect(article.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex/i);
      expect(await article.text()).toContain("<h1>");
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth + 1,
        ),
      ).toBe(true);
    });
  }

  test("sitemap contains only the six public canonical URLs", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const urls = [
      ...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g),
    ].map((match) => match[1]);
    expect(urls.sort()).toEqual(
      ["fr", "en", "nl"]
        .flatMap((locale) => [
          `https://raijucloudsystem.com/${locale}`,
          `https://raijucloudsystem.com/${locale}/research/rp-003`,
        ])
        .sort(),
    );
    for (const url of urls) {
      const page = await request.get(new URL(url).pathname, {
        maxRedirects: 0,
      });
      expect(page.status(), url).toBe(200);
      expect(page.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex/i);
      expect(await page.text()).toContain(
        `<link rel="canonical" href="${url}"`,
      );
    }
  });
});
