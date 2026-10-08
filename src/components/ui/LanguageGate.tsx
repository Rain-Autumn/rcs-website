'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { Locale } from '@/content/i18n';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const options: Array<{ locale: Locale; code: string; label: string }> = [
  { locale: 'fr', code: 'FR', label: 'FRANÇAIS' },
  { locale: 'en', code: 'EN', label: 'ENGLISH' },
  { locale: 'nl', code: 'NL', label: 'NEDERLANDS' },
];

type GateStage = 'portal' | 'language';

export function LanguageGate() {
  const [stage, setStage] = useState<GateStage>('portal');
  const portalRef = useRef<HTMLElement>(null);
  const languageTitleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.add('language-gate-active');
    return () => document.body.classList.remove('language-gate-active');
  }, []);

  useEffect(() => {
    if (stage !== 'language') return;
    window.requestAnimationFrame(() => languageTitleRef.current?.focus());
  }, [stage]);

  const openLanguageSelection = () => {
    const portal = portalRef.current;

    if (!portal || reducedMotion) {
      setStage('language');
      return;
    }

    const content = portal.querySelector('.boot-content');

    gsap.killTweensOf([portal, content]);
    gsap
      .timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => setStage('language'),
      })
      .to(
        content,
        {
          opacity: 0,
          y: -8,
          scale: 0.992,
          duration: 0.24,
        },
        0,
      )
      .to(
        portal,
        {
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.34,
        },
        0.08,
      );
  };

  const rememberLocale = (locale: Locale) => {
    window.localStorage.setItem('rcs-locale', locale);
  };

  if (stage === 'portal') {
    return (
      <section
        ref={portalRef}
        className="boot-portal"
        aria-label="Raiju Cloud System welcome portal"
      >
        <div className="boot-frame-lines" aria-hidden="true" />
        <div className="boot-axis boot-axis--vertical" aria-hidden="true" />
        <div className="boot-axis boot-axis--horizontal" aria-hidden="true" />

        <div className="boot-content">
          <Image
            className="boot-mark"
            src="/icons/raiju-dragon-vector.svg"
            alt="Raiju Cloud System"
            width={113}
            height={121}
            priority
          />

          <h1 className="boot-brand">RAIJU CLOUD SYSTEM</h1>

          <p className="boot-summary">
            Independent technology, systems, infrastructure, artificial intelligence and
            documented research from Belgium.
          </p>

          <p className="boot-label">
            <span aria-hidden="true" />
            <strong>WELCOME PORTAL</strong>
            <span aria-hidden="true" />
          </p>

          <button
            className="boot-enter-button"
            type="button"
            onClick={openLanguageSelection}
          >
            <i className="boot-corner boot-corner--tl" aria-hidden="true" />
            <i className="boot-corner boot-corner--tr" aria-hidden="true" />
            <i className="boot-corner boot-corner--bl" aria-hidden="true" />
            <i className="boot-corner boot-corner--br" aria-hidden="true" />
            <span>ENTER</span>
          </button>

          <nav className="boot-language-links" aria-label="Direct language access">
            {options.map((option) => (
              <a
                key={option.locale}
                href={`/${option.locale}`}
                hrefLang={option.locale}
                lang={option.locale}
                onClick={() => rememberLocale(option.locale)}
              >
                {option.code}
              </a>
            ))}
          </nav>
        </div>

        <div className="boot-meta boot-meta--tl">RCS // PORTAL</div>
        <div className="boot-meta boot-meta--tr">SYSTEM READY</div>
        <div className="boot-meta boot-meta--bl">TECHNOLOGY / SYSTEMS / INTELLIGENCE</div>
        <div className="boot-meta boot-meta--br">BELGIUM</div>
      </section>
    );
  }

  return (
    <main className="language-gate" aria-label="Raiju Cloud System language access">
      <div className="language-gate__background" aria-hidden="true">
        <div className="boot-frame-lines" />
        <div className="boot-axis boot-axis--vertical" />
        <div className="boot-axis boot-axis--horizontal" />
        <div className="boot-content language-gate__portal-copy">
          <Image
            className="boot-mark"
            src="/icons/raiju-dragon-vector.svg"
            alt=""
            width={113}
            height={121}
            priority
          />
          <p className="boot-brand">RAIJU CLOUD SYSTEM</p>
          <p className="boot-label"><span /><strong>WELCOME PORTAL</strong><span /></p>
          <div className="boot-enter-button language-gate__ghost-enter"><span>ENTER</span></div>
        </div>
        <div className="boot-meta boot-meta--tl">RCS // PORTAL</div>
        <div className="boot-meta boot-meta--tr">SYSTEM READY</div>
        <div className="boot-meta boot-meta--bl">TECHNOLOGY / SYSTEMS / INTELLIGENCE</div>
        <div className="boot-meta boot-meta--br">BELGIUM</div>
      </div>

      <section className="language-panel" aria-labelledby="language-gate-title">
        <p className="language-panel__eyebrow">RCS CORE // LANGUAGE ACCESS</p>
        <h1 ref={languageTitleRef} id="language-gate-title" tabIndex={-1}>SELECT SYSTEM LANGUAGE</h1>
        <p className="language-panel__lead">Choose the interface language.</p>
        <div className="language-panel__options">
          {options.map((option) => (
            <a
              key={option.locale}
              href={`/${option.locale}`}
              hrefLang={option.locale}
              lang={option.locale}
              className="language-option"
              onClick={() => rememberLocale(option.locale)}
            >
              <span>{option.code}</span>
              <strong>{option.label}</strong>
              <i aria-hidden="true">↳</i>
            </a>
          ))}
        </div>
        <p className="language-panel__meta">FR / EN / NL · LANGUAGE CAN BE CHANGED AT ANY TIME</p>
      </section>
    </main>
  );
}
