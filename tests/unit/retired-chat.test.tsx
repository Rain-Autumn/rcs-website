import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { OnePage } from "@/components/onepage/OnePage";
import { getOnePagePublications, languages } from "@/content/onepage";
import { onePageStructuredData } from "@/lib/structured-data";

describe("online chat retirement", () => {
  it.each(languages)(
    "%s does not advertise a retired web application",
    (locale) => {
      const publications = getOnePagePublications(locale);
      const graph = onePageStructuredData(locale, publications, []);
      const serialized = JSON.stringify(graph);
      expect(serialized).not.toContain("evidence-engine");
      expect(serialized).not.toContain('"WebApplication"');
      expect(serialized).toContain("ScholarlyArticle");

      const host = document.createElement("div");
      host.innerHTML = renderToStaticMarkup(
        <OnePage locale={locale} publications={publications} members={[]} />,
      );
      expect(host.querySelectorAll("h1")).toHaveLength(1);
      expect(host.querySelector("#hero-title")?.textContent).toBeTruthy();
      expect(host.querySelector('a[href*="evidence-engine"]')).toBeNull();
      expect(host.querySelector('a[href*="livechat"]')).toBeNull();
      expect(host.querySelector("iframe")).toBeNull();
      expect(host.querySelector("#recherches")).not.toBeNull();
      expect(host.querySelector("#securite")).toBeNull();
      expect(host.querySelector('a[href="#securite"]')).toBeNull();
      expect(host.textContent).not.toMatch(/RCS shield/i);
      expect(host.querySelector("#equipe")).not.toBeNull();
      expect(host.querySelector("#contact")).not.toBeNull();
    },
  );
});
