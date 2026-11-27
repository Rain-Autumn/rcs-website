import { expect, test } from "@playwright/test";

const theme = (page: import("@playwright/test").Page) =>
  page.evaluate(() => document.documentElement.dataset.theme);
const background = (page: import("@playwright/test").Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("dark mode", () => {
  test("follows the system preference without a stored choice", async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/fr");
    expect(await theme(page)).toBe("dark");
    expect(await background(page)).not.toBe("rgb(248, 248, 244)");
    await context.close();
  });

  test("the toggle switches, persists and keeps the founder badge untouched", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/fr");
    expect(await theme(page)).toBe("light");
    expect(await background(page)).toBe("rgb(248, 248, 244)");

    await page.getByRole("button", { name: "Passer en mode sombre" }).click();
    expect(await theme(page)).toBe("dark");
    await page.reload();
    expect(await theme(page)).toBe("dark");
    await expect(
      page.getByRole("button", { name: "Passer en mode clair" }),
    ).toHaveAttribute("aria-pressed", "true");

    // Line illustrations and team dragons are inverted; the arkenstone badge is not.
    const filters = await page.evaluate(() =>
      [...document.querySelectorAll("img")].map((img) => ({
        src: img.getAttribute("src") ?? "",
        badge: img.parentElement?.className.includes("arkenstone") ?? false,
        filter: getComputedStyle(img).filter,
      })),
    );
    const badge = filters.filter((item) => item.badge);
    expect(badge.length).toBeGreaterThan(0);
    expect(badge.every((item) => item.filter === "none")).toBe(true);
    expect(
      filters
        .filter((item) => item.src.includes("/images/onepage-"))
        .every((item) => item.filter.includes("invert")),
    ).toBe(true);

    await page.getByRole("button", { name: "Passer en mode clair" }).click();
    await page.reload();
    expect(await theme(page)).toBe("light");
  });
});
