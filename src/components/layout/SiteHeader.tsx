'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Locale, RcsCopy } from '@/content/i18n';

export function SiteHeader({ locale, copy, mode = 'presentation' }: { locale: Locale; copy: RcsCopy; mode?: 'presentation' | 'research' | 'team' }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('core');

  useEffect(() => {
    if (mode !== 'presentation') return;
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
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.2, 0.45, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [copy.nav, mode]);

  const languageHref = (target: Locale) => {
    const suffix = mode === 'research' ? '/research' : mode === 'team' ? '/team' : '#core';
    return `/${target}${suffix}`;
  };

  const rememberLocale = (target: Locale) => {
    window.localStorage.setItem('rcs-locale', target);
  };

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    document.body.classList.add('menu-open');
    return () => { document.removeEventListener('keydown', close); document.body.classList.remove('menu-open'); };
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand-lockup" href={`/${locale}#core`} aria-label="Raiju Cloud System, RCS Core">
        <Image src="/icons/raiju-dragon-vector.svg" alt="" width={34} height={37} priority />
        <span>
          <strong>RAIJU CLOUD SYSTEM</strong>
          <small>RCS CORE</small>
        </span>
      </a>

      <div className="header-language" aria-label={copy.languageLabel}>
        {(['fr', 'en', 'nl'] as Locale[]).map((target) => (
          <a
            key={target}
            href={languageHref(target)}
            hrefLang={target}
            lang={target}
            className={locale === target ? 'is-active' : undefined}
            onClick={() => rememberLocale(target)}
            aria-current={locale === target ? 'page' : undefined}
          >
            {target.toUpperCase()}
          </a>
        ))}
      </div>

      <button
        className="nav-toggle"
        type="button"
        aria-controls="primary-navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? 'CLOSE' : copy.menu}</span>
        <i aria-hidden="true" />
      </button>

      <nav
        id="primary-navigation"
        className={open ? 'primary-nav is-open' : 'primary-nav'}
        aria-label={copy.navLabel}
      >
        <div className="nav-group">
          <p><span>01</span> PRÉSENTATION</p>
          <div className="nav-links">{copy.nav.map((item) => {
          const id = item.href.slice(1);
          return (
            <a
              key={item.href}
              href={mode === 'presentation' ? item.href : `/${locale}${item.href}`}
              className={mode === 'presentation' && active === id ? 'is-active' : undefined}
              onClick={() => setOpen(false)}
            >
              <span>{item.index}</span>
              {item.label}
            </a>
          );
        })}</div></div>
        <div className="nav-group nav-group--research">
          <p><span>02</span> RESEARCH</p>
          <a className={mode === 'research' ? 'is-active research-entry' : 'research-entry'} href={`/${locale}/research`} onClick={() => setOpen(false)}>
            <span>RCS-R</span> RESEARCH PROGRAM <b aria-hidden="true">↗</b>
          </a>
        </div>
        <div className="nav-group nav-group--team">
          <p><span>03</span> TEAM</p>
          <a className={mode === 'team' ? 'is-active research-entry' : 'research-entry'} href={`/${locale}/team`} onClick={() => setOpen(false)}>
            <span>RCS-T</span> TEAM DIRECTORY <b aria-hidden="true">↗</b>
          </a>
        </div>
      </nav>
      {open && <button className="nav-backdrop" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  );
}
