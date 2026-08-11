"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { sectionNavigation, type SiteMode } from "@/content/architecture";
import type { Locale, RcsCopy } from "@/content/i18n";

export function SiteHeader({
  locale,
  copy,
  mode = "presentation",
}: {
  locale: Locale;
  copy: RcsCopy;
  mode?: SiteMode;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("core");

  useEffect(() => {
    if (mode !== "presentation") return;
    const sections = copy.nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [copy.nav, mode]);

  const languageHref = (target: Locale) => {
    const section = sectionNavigation[locale].find(
      (item) => item.mode === mode,
    );
    return `/${target}${section?.path ?? ""}`;
  };

  const rememberLocale = (target: Locale) => {
    window.localStorage.setItem("rcs-locale", target);
  };

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", close);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`site-header site-header--${mode}`}>
      <a
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
          <small>RCS SYSTEM DIRECTORY</small>
        </span>
      </a>

      <nav className="section-nav" aria-label={copy.navLabel}>
        {sectionNavigation[locale].map((item) => (
          <a
            key={item.mode}
            href={`/${locale}${item.path}`}
            className={mode === item.mode ? "is-active" : undefined}
            aria-current={mode === item.mode ? "page" : undefined}
          >
            <span>{item.code}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-language" aria-label={copy.languageLabel}>
        {(["fr", "en", "nl"] as Locale[]).map((target) => (
          <a
            key={target}
            href={languageHref(target)}
            hrefLang={target}
            lang={target}
            className={locale === target ? "is-active" : undefined}
            onClick={() => rememberLocale(target)}
            aria-current={locale === target ? "page" : undefined}
          >
            {target.toUpperCase()}
          </a>
        ))}
      </div>

      {mode === "presentation" && (
        <button
          className="nav-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "CLOSE" : copy.menu}</span>
          <i aria-hidden="true" />
        </button>
      )}

      {mode === "presentation" && (
        <nav
          id="primary-navigation"
          className={open ? "primary-nav is-open" : "primary-nav"}
          aria-label={`${copy.navLabel} — ${sectionNavigation[locale][1].label}`}
        >
          <div className="nav-group">
            <p>
              <span>01</span>
              {sectionNavigation[locale][1].label}
            </p>
            <div className="nav-links">
              {copy.nav.map((item) => {
                const id = item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={active === id ? "is-active" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.index}</span>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      )}
      {open && (
        <button
          className="nav-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
