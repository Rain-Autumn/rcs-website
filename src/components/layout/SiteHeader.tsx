"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteMode } from "@/content/architecture";
import { copy as onePageCopy } from "@/content/onepage";
import type { Locale, RcsCopy } from "@/content/i18n";

/** Shared header for retained research documents; links back to the single landing. */
export function SiteHeader({
  locale,
  copy,
}: {
  locale: Locale;
  copy: RcsCopy;
  mode?: SiteMode;
}) {
  const pathname = usePathname();
  const route = (pathname ?? "/" + locale).replace(/^\/(fr|en|nl)(?=\/|$)/, "");
  const t = onePageCopy[locale];
  return (
    <header className="site-header site-header--research">
      <Link
        className="brand-lockup"
        href={`/${locale}`}
        aria-label="Raiju Cloud System"
      >
        <Image
          src="/icons/raiju-dragon-vector.svg"
          alt=""
          width={34}
          height={37}
          priority
        />
        <span>
          <strong>RAIJU CLOUD SYSTEM</strong>
          <small>AI &amp; RESEARCH</small>
        </span>
      </Link>
      <nav className="section-nav" aria-label={copy.navLabel}>
        {[
          ["recherches", t.navResearch],
          ["equipe", t.navTeam],
          ["contact", t.navContact],
        ].map(([id, label]) => (
          <Link key={id} href={`/${locale}#${id}`}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-language" aria-label={copy.languageLabel}>
        {(["fr", "en", "nl"] as Locale[]).map((target) => (
          <Link
            key={target}
            href={`/${target}${route}`}
            hrefLang={target}
            lang={target}
            prefetch={false}
            className={locale === target ? "is-active" : undefined}
            aria-current={locale === target ? "page" : undefined}
          >
            {target.toUpperCase()}
          </Link>
        ))}
      </div>
    </header>
  );
}
