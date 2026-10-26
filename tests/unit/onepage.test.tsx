import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { OnePage } from "@/components/onepage/OnePage";
import {
  copy,
  filterPublications,
  getOnePagePublications,
  languages,
} from "@/content/onepage";
import { localizedMember, officialTeamMembers } from "@/content/team";

describe("approved onepage", () => {
  it("keeps four publications with their confirmed DOIs in each language", () => {
    for (const locale of languages) {
      const items = getOnePagePublications(locale);
      expect(items).toHaveLength(4);
      expect(new Set(items.map((item) => item.doi)).size).toBe(4);
      expect(items.find((item) => item.id === "RCS-RP-003")?.doi).toBe(
        "10.5281/zenodo.23373563",
      );
      expect(items.find((item) => item.id === "RCS-RP-004")?.doi).toBe(
        "10.5281/zenodo.23411388",
      );
    }
  });
  it("supports categories, accents, multiple words and no results", () => {
    const items = getOnePagePublications("fr");
    expect(filterPublications(items, "ai", "")).toHaveLength(2);
    expect(filterPublications(items, "systems", "")).toHaveLength(2);
    expect(filterPublications(items, "all", "espace disque")[0].id).toBe(
      "RCS-RP-003",
    );
    expect(filterPublications(items, "all", "mémoire")[0].id).toBe(
      "RCS-RP-004",
    );
    expect(filterPublications(items, "all", "zzzzzz")).toHaveLength(0);
  });
  it.each(languages)(
    "%s SSR links the local RP003 article without replacing its confirmed DOI",
    (locale) => {
      const publications = getOnePagePublications(locale);
      const localPath = `/${locale}/research/rp-003`;
      expect(publications.filter((item) => item.localHref)).toHaveLength(1);
      expect(
        publications.find((item) => item.id === "RCS-RP-003")?.localHref,
      ).toBe(localPath);
      const host = document.createElement("div");
      host.innerHTML = renderToStaticMarkup(
        <OnePage locale={locale} publications={publications} members={[]} />,
      );
      const card = host.querySelector("#RCS-RP-003");
      const localLink = card?.querySelector(`a[href="${localPath}"]`);
      expect(localLink?.textContent).toContain(copy[locale].readOnSite);
      expect(localLink?.getAttribute("aria-label")).toContain(
        publications.find((item) => item.id === "RCS-RP-003")!.title,
      );
      expect(localLink?.hasAttribute("target")).toBe(false);
      for (const item of publications) {
        const doiLink = host.querySelector(`a[href="${item.href}"]`);
        expect(doiLink?.getAttribute("rel")).toBe("noopener noreferrer");
        expect(doiLink?.getAttribute("target")).toBe("_blank");
      }
    },
  );
  it("has the same copy keys across locales", () => {
    for (const locale of languages)
      expect(Object.keys(copy[locale]).sort()).toEqual(
        Object.keys(copy.fr).sort(),
      );
  });
  it("SSR renders the product, publications, actual people and founder-only Arkenstone", () => {
    const members = officialTeamMembers.map((member) =>
      localizedMember(member, "fr"),
    );
    const html = renderToStaticMarkup(
      <OnePage
        locale="fr"
        publications={getOnePagePublications("fr")}
        members={members}
      />,
    );
    expect(html.match(/<section\b/g) || []).toHaveLength(3);
    expect(html).toContain("https://evidence-engine.raijucloudsystem.com/");
    expect(html).toContain("Hugues Henrotte");
    expect(html).toContain("Jacob Matthews");
    expect(html.match(/data-emblem="arkenstone"/g) || []).toHaveLength(1);
    expect(html.match(/data-emblem="rcs"/g) || []).toHaveLength(1);
    expect(html).not.toContain("person-monogram");
    expect(html).not.toContain("PROTOTYPE LOCAL");
    expect(html).not.toContain("<form");
    for (const item of getOnePagePublications("fr"))
      expect(html).toContain(item.href);
  });

  it.each(languages)(
    "%s renders decorative arrows as monochrome SVGs instead of platform emoji",
    (locale) => {
      const members = officialTeamMembers.map((member) =>
        localizedMember(member, locale),
      );
      const host = document.createElement("div");
      host.innerHTML = renderToStaticMarkup(
        <OnePage
          locale={locale}
          publications={getOnePagePublications(locale)}
          members={members}
        />,
      );

      expect(host.textContent).not.toMatch(/[\u2197\u2191\u2193]/u);

      const arrows = host.querySelectorAll('[class*="arrow-icon"] > svg');
      expect(arrows.length).toBeGreaterThan(0);
      for (const arrow of arrows) {
        expect(arrow.getAttribute("width")).toBe("1em");
        expect(arrow.getAttribute("height")).toBe("1em");
        expect(arrow.getAttribute("fill")).toBe("none");
        expect(arrow.getAttribute("stroke")).toBe("currentColor");
        expect(arrow.getAttribute("focusable")).toBe("false");
        expect(arrow.closest('[aria-hidden="true"]')).not.toBeNull();
        expect(arrow.querySelector("path")?.getAttribute("d")).toBeTruthy();
        expect(arrow.querySelector("title")).toBeNull();
      }

      const decoration = host.querySelector('[class*="contact-decoration"]');
      expect(decoration?.getAttribute("aria-hidden")).toBe("true");
      expect(
        decoration?.querySelector('[class*="arrow-icon"] svg path'),
      ).not.toBeNull();

      const email = host.querySelector(
        'a[href="mailto:contact@raijucloudsystem.com"]',
      );
      expect(email?.textContent?.trim()).toBe("contact@raijucloudsystem.com");
      expect(
        email?.querySelector('[class*="arrow-icon"] > svg'),
      ).not.toBeNull();

      const externalArrow = email?.querySelector("path")?.getAttribute("d");
      const researchArrow = host
        .querySelector('#accueil a[href="#recherches"] path')
        ?.getAttribute("d");
      const backToTopArrow = host
        .querySelector('footer a[class*="back-top"] path')
        ?.getAttribute("d");
      expect(researchArrow).toBeTruthy();
      expect(backToTopArrow).toBeTruthy();
      expect(new Set([externalArrow, researchArrow, backToTopArrow]).size).toBe(
        3,
      );
      expect(decoration?.querySelector("path")?.getAttribute("d")).toBe(
        externalArrow,
      );

      for (const member of members) {
        for (const credential of member.certifications) {
          if (!credential.credentialUrl) continue;
          const link = Array.from(host.querySelectorAll("details a")).find(
            (candidate) =>
              candidate.getAttribute("href") === credential.credentialUrl,
          );
          expect(link, credential.title).toBeDefined();
          expect(link?.textContent?.trim()).toBe(credential.title);
          expect(link?.getAttribute("target")).toBe("_blank");
          expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
          expect(
            link?.querySelector('[class*="arrow-icon"] > svg'),
          ).not.toBeNull();
        }
      }
    },
  );
});
