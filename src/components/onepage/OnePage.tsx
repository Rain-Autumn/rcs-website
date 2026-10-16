"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  copy,
  EE_URL,
  filterPublications,
  languages,
  type OnePagePublication,
  type PublicationCategory,
} from "@/content/onepage";
import type { Locale } from "@/content/i18n";
import type { TeamMember } from "@/types/team";
import styles from "./OnePage.module.css";

export type OnePageMember = TeamMember & { role: string; bio: string };
const c = (...names: string[]) =>
  names
    .filter(Boolean)
    .map((name) => styles[name] ?? name)
    .join(" ");
const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () =>
  ["#accueil", "#recherches", "#equipe", "#contact"].includes(
    window.location.hash,
  )
    ? window.location.hash
    : "";
const serverHash = () => "";

function Arrow({
  direction = "up-right",
}: {
  direction?: "up-right" | "down" | "up";
}) {
  const paths = {
    "up-right": "M5 19 19 5M5 5h14v14",
    down: "M12 4v16m-6-6 6 6 6-6",
    up: "M12 20V4m-6 6 6-6 6 6",
  };

  return (
    <span className={c("arrow-icon")} aria-hidden="true">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d={paths[direction]} />
      </svg>
    </span>
  );
}

export function OnePage({
  locale,
  publications,
  members,
}: {
  locale: Locale;
  publications: OnePagePublication[];
  members: OnePageMember[];
}) {
  const t = copy[locale];
  const [category, setCategory] = useState<PublicationCategory>("all");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const hash = useSyncExternalStore(subscribeHash, getHash, serverHash);
  const visible = filterPublications(publications, category, query);

  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("contact@raijucloudsystem.com");
      setCopyStatus(t.copied);
    } catch {
      setCopyStatus(t.copyFailed);
    }
  }

  return (
    <div className={`${styles.page} rcs-onepage-root`}>
      <a className={c("skip-link")} href="#main">
        {t.skip}
      </a>
      <header className={c("site-header")}>
        <div className={c("header-inner")}>
          <a
            className={c("brand")}
            href="#accueil"
            aria-label="Raiju Cloud System"
          >
            <Image
              src="/icons/raiju-dragon-vector.svg"
              width={35}
              height={38}
              alt=""
              priority
            />
            <span>
              raiju<span className={c("brand-light")}>cloudsystem</span>
              <small>INDEPENDENT AI &amp; RESEARCH</small>
            </span>
          </a>
          <nav
            className={c("main-nav", menuOpen ? "is-open" : "")}
            id="main-navigation"
            aria-label={t.navLabel}
          >
            {(
              [
                ["recherches", t.navResearch],
                ["equipe", t.navTeam],
                ["contact", t.navContact],
              ] as const
            ).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={hash === `#${id}` ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className={c("header-actions")}>
            <div
              className={c("languages")}
              role="group"
              aria-label="FR / EN / NL"
            >
              {languages.map((target) => (
                <Link
                  key={target}
                  href={`/${target}${hash}`}
                  hrefLang={target}
                  lang={target}
                  prefetch={false}
                  aria-current={target === locale ? "page" : undefined}
                >
                  {target.toUpperCase()}
                </Link>
              ))}
            </div>
            <a
              className={c("header-chat")}
              href={EE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.headerChat}</span>
              <Arrow />
            </a>
            <button
              ref={menuButton}
              type="button"
              className={c("menu-toggle")}
              aria-controls="main-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.menuClose : t.menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section
          className={c("hero", "section-shell")}
          id="accueil"
          aria-labelledby="hero-title"
        >
          <div className={c("hero-top")}>
            <div className={c("hero-heading")}>
              <p className={c("eyebrow")}>
                <span className={c("tiny-square")} aria-hidden="true" />
                <span>{t.heroEyebrow}</span>
              </p>
              <h1 id="hero-title">
                <span>{t.heroLine1}</span>
                <br />
                <span className={c("muted-title")}>{t.heroLine2}</span>
                <span className={c("title-cursor")} aria-hidden="true" />
              </h1>
            </div>
            <div className={c("hero-intro")}>
              <p>{t.heroDescription}</p>
              <div className={c("hero-buttons")}>
                <a
                  className={c("button", "button-dark")}
                  href={EE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t.openEE}</span>
                  <Arrow />
                </a>
                <a className={c("text-link")} href="#recherches">
                  <span>{t.exploreResearch}</span>
                  <Arrow direction="down" />
                </a>
              </div>
              <span className={c("experimental")}>
                <span aria-hidden="true" />
                <span>{t.experimental}</span>
              </span>
            </div>
          </div>
          <figure className={c("hero-art")}>
            <Image
              src="/images/rcs-onepage-hero.svg"
              width={1440}
              height={560}
              priority
              alt={t.heroAlt}
            />
            <figcaption>
              <span>
                FIG. 01 <span className={c("caption-divider")}>/</span>{" "}
                {t.artCaption}
              </span>
              <span className={c("art-signature")}>
                RCS <span aria-hidden="true">✳</span> BELGIUM
              </span>
            </figcaption>
          </figure>
          <div className={c("hero-bottom")}>
            <span>{t.heroBottom}</span>
            <a href="#recherches">
              <span>{t.scroll}</span>
              <Arrow direction="down" />
            </a>
          </div>
        </section>

        <section
          className={c("research", "section-shell")}
          id="recherches"
          aria-labelledby="research-title"
        >
          <div className={c("section-heading")}>
            <div>
              <p className={c("eyebrow")}>
                <span className={c("section-number")}>01 /</span>
                <span>{t.libraryLabel}</span>
              </p>
              <h2 id="research-title">{t.researchTitle}</h2>
            </div>
            <p className={c("section-intro")}>{t.researchIntro}</p>
          </div>
          <div className={c("library-toolbar")}>
            <div
              className={c("filters")}
              role="group"
              aria-label={t.filtersLabel}
            >
              {(
                [
                  ["all", t.filterAll],
                  ["ai", t.filterAI],
                  ["systems", t.filterSystems],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                >
                  {label}
                  {value === "all" && (
                    <span className={c("filter-count")}>
                      {String(publications.length).padStart(2, "0")}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <label className={c("search-field")}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
              <span className={c("sr-only")}>{t.searchLabel}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
                autoComplete="off"
              />
            </label>
          </div>
          <p className={c("sr-only")} role="status" aria-live="polite">
            {t.results(visible.length)}
          </p>
          <div className={c("research-grid")}>
            {visible.length ? (
              visible.map((publication) => {
                const featured = publication.id === publications[0]?.id;
                return (
                  <article
                    key={publication.id}
                    id={publication.id}
                    className={c(
                      "research-card",
                      featured ? "research-card--featured" : "",
                    )}
                  >
                    <div className={c("research-cover")} aria-hidden="true">
                      <span className={c("cover-number")}>
                        {publication.id}
                      </span>
                      <Image
                        src={`/images/onepage-${publication.art}.svg`}
                        width={350}
                        height={285}
                        alt=""
                      />
                      <span className={c("cover-mark")}>RCS / RESEARCH</span>
                    </div>
                    <div className={c("research-card-body")}>
                      <div className={c("article-meta")}>
                        <span className={c("article-category")}>
                          {publication.category === "ai"
                            ? t.categoryAI
                            : t.categorySystems}
                        </span>
                        {featured ? (
                          <span className={c("featured-label")}>
                            {t.latest}
                          </span>
                        ) : (
                          <span>{publication.id.replace("RCS-", "")}</span>
                        )}
                      </div>
                      <h3>{publication.title}</h3>
                      <p>{publication.summary}</p>
                      <div className={c("article-tags")}>
                        {publication.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className={c("article-links")}>
                        <a
                          href={publication.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${t.readStudy} — ${publication.id}`}
                        >
                          <span>{t.readStudy}</span>
                          <Arrow />
                        </a>
                        <span className={c("article-year")}>
                          {publication.year} /{" "}
                          {publication.id.replace("RCS-", "")}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className={c("empty-state")}>
                <span aria-hidden="true">⌕</span>
                <h3>{t.noResults}</h3>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("all");
                    setQuery("");
                  }}
                >
                  {t.reset}
                </button>
              </div>
            )}
          </div>
          <div className={c("library-foot")}>
            <span>
              <span className={c("tiny-square")} aria-hidden="true" />
              {t.libraryFoot}
            </span>
            <a
              className={c("text-link")}
              href="https://orcid.org/0009-0009-7729-6552"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.orcidLink}</span>
              <Arrow />
            </a>
          </div>
        </section>

        <section
          className={c("people", "section-shell")}
          id="equipe"
          aria-labelledby="team-title"
        >
          <div className={c("section-heading")}>
            <div>
              <p className={c("eyebrow")}>
                <span className={c("section-number")}>02 /</span>
                <span>{t.teamLabel}</span>
              </p>
              <h2 id="team-title">{t.teamTitle}</h2>
            </div>
            <p className={c("section-intro")}>{t.teamIntro}</p>
          </div>
          <div className={c("team-grid")}>
            {members.map((member) => {
              const founder = member.id === "RCS-TM-001";
              const jacob = member.id === "RCS-TM-002";
              const role = founder
                ? t.huguesRole
                : jacob
                  ? t.jacobRole
                  : member.role;
              const bio = founder
                ? t.huguesBio
                : jacob
                  ? t.jacobBio
                  : member.bio;
              return (
                <article
                  className={c("person-card")}
                  key={member.id}
                  id={member.id}
                >
                  <div className={c("person-identity")}>
                    <div
                      className={c(
                        "person-mark",
                        founder ? "person-mark--arkenstone" : "",
                      )}
                      data-emblem={founder ? "arkenstone" : "rcs"}
                      aria-hidden="true"
                    >
                      <Image
                        src="/icons/raiju-dragon-vector.svg"
                        alt=""
                        width={80}
                        height={86}
                      />
                    </div>
                    <div>
                      <h3>{member.name}</h3>
                      <p className={c("person-role")}>{role}</p>
                    </div>
                  </div>
                  <p className={c("person-bio")}>{bio}</p>
                  <div className={c("person-tags")}>
                    {(founder
                      ? ["AI ENGINEERING", "RESEARCH", "LINUX"]
                      : member.specialties.slice(0, 4)
                    ).map((specialty) => (
                      <span key={specialty}>{specialty}</span>
                    ))}
                  </div>
                  {member.certifications.length > 0 && (
                    <details className={c("credentials")}>
                      <summary>
                        <span>{t.huguesCredentials}</span>
                        <span className={c("credentials-count")}>
                          {String(member.certifications.length).padStart(
                            2,
                            "0",
                          )}
                        </span>
                        <span className={c("details-plus")} aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <ul>
                        {member.certifications.map((credential, index) => (
                          <li key={`${credential.provider}-${index}`}>
                            <strong>{credential.provider}</strong>
                            <span>
                              {credential.credentialUrl ? (
                                <a
                                  href={credential.credentialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {credential.title} <Arrow />
                                </a>
                              ) : (
                                credential.title
                              )}
                              {credential.credentialId && (
                                <small>{credential.credentialId}</small>
                              )}
                            </span>
                            <small>{credential.issued}</small>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                  {member.orcid && (
                    <a
                      className={c("person-link")}
                      href={member.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ORCID <Arrow />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
          <div className={c("contact-panel")} id="contact">
            <div className={c("contact-copy")}>
              <p className={c("eyebrow")}>
                <span className={c("tiny-square")} aria-hidden="true" />
                {t.contactLabel}
              </p>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactIntro}</p>
            </div>
            <div className={c("contact-actions")}>
              <a
                className={c("email-link")}
                href="mailto:contact@raijucloudsystem.com"
              >
                contact@raijucloudsystem.com
                <Arrow />
              </a>
              <button
                className={c("copy-email")}
                type="button"
                onClick={copyEmail}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="8" y="8" width="12" height="12" rx="1" />
                  <path d="M16 8V4H4v12h4" />
                </svg>
                <span>{t.copyEmail}</span>
              </button>
              <p role="status" aria-live="polite">
                {copyStatus}
              </p>
            </div>
            <span className={c("contact-decoration")} aria-hidden="true">
              <Arrow />
            </span>
          </div>
        </section>
      </main>
      <footer className={c("site-footer", "section-shell")}>
        <div className={c("footer-top")}>
          <a className={c("brand", "footer-brand")} href="#accueil">
            <Image
              src="/icons/raiju-dragon-vector.svg"
              width={28}
              height={30}
              alt=""
            />
            <span>
              raiju<span className={c("brand-light")}>cloudsystem</span>
            </span>
          </a>
          <a className={c("text-link", "back-top")} href="#accueil">
            <span>{t.backTop}</span>
            <Arrow direction="up" />
          </a>
        </div>
        <div className={c("footer-bottom")}>
          <span>© 2026 RAIJU CLOUD SYSTEM</span>
          <span>INDEPENDENT AI &amp; RESEARCH</span>
          <span>BELGIUM / FR · EN · NL</span>
        </div>
      </footer>
    </div>
  );
}
