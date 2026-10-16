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
});
