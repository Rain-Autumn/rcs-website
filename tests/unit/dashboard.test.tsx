import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Dashboard, dashboardCopy } from "@/components/onepage/Dashboard";
import { getOnePagePublications, languages, EE_URL } from "@/content/onepage";

describe("RCS dashboard", () => {
  it.each(languages)(
    "%s preserves genuine product links and bounded security claims",
    (locale) => {
      const host = document.createElement("div");
      const publications = getOnePagePublications(locale);
      host.innerHTML = renderToStaticMarkup(
        <Dashboard locale={locale} publications={publications} />,
      );
      expect(
        Array.from(host.querySelectorAll("[data-dashboard-panel]")).map(
          (node) => node.getAttribute("data-dashboard-panel"),
        ),
      ).toEqual(["even", "research", "security"]);
      expect(
        host.querySelector(`a[href="${EE_URL}"]`)?.getAttribute("rel"),
      ).toBe("noopener noreferrer");
      expect(host.querySelector("iframe, input, form")).toBeNull();
      expect(host.querySelector("#securite")?.textContent).toContain(
        "RCS shield",
      );
      expect(host.querySelector("#securite")?.textContent).toContain(
        dashboardCopy[locale].stage,
      );
      for (const publication of publications.slice(0, 2))
        expect(
          host.querySelector(`a[href="#${publication.id}"]`)?.textContent,
        ).toContain(publication.title);
      expect(host.querySelector('a[href="#recherches"]')).not.toBeNull();
      expect(host.querySelector('a[href="#contact"]')).not.toBeNull();
      expect(host.querySelector("img")?.getAttribute("alt")).toBe(
        dashboardCopy[locale].mascot,
      );
    },
  );
  it("handles an empty research list without invented publications", () => {
    const html = renderToStaticMarkup(
      <Dashboard locale="fr" publications={[]} />,
    );
    expect(html).toContain(dashboardCopy.fr.empty);
    expect(html).not.toContain('href="#RCS-RP-');
  });
  it("keeps translated keys consistent", () => {
    for (const locale of languages)
      expect(Object.keys(dashboardCopy[locale]).sort()).toEqual(
        Object.keys(dashboardCopy.fr).sort(),
      );
  });
});
