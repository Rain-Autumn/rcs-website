import Image from 'next/image';
import type { RcsCopy } from '@/content/i18n';

export function HeroSection({ copy }: { copy: RcsCopy['hero'] }) {
  return (
    <section
      className="technical-panel hero-section rcs-core-hero"
      id="core"
      data-section="01"
    >
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">{copy.eyebrow}</p>

        <h1 className="rcs-core-title">
          <span>{copy.titleTop}</span>
          <span>{copy.titleBottom}</span>
        </h1>

        <p className="hero-role">{copy.role}</p>
        <p className="hero-lead">{copy.lead}</p>

        <div className="button-row">
          <a
            className="mechanical-button mechanical-button--dark"
            href="#divisions"
          >
            <span>{copy.primaryCta}</span>
            <span aria-hidden="true">↳</span>
          </a>

          <a className="mechanical-button" href="#projects">
            <span>{copy.secondaryCta}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="hero-visual" data-reveal>
        <div
          className="hero-scene hero-scene--emblem"
          aria-label={copy.sceneLabel}
        >
          <div className="raiju-emblem-core" aria-hidden="true">
            <span className="emblem-ring emblem-ring--outer" />
            <span className="emblem-ring emblem-ring--inner" />

            <span className="emblem-axis emblem-axis--x" />
            <span className="emblem-axis emblem-axis--y" />

            <span className="emblem-tick emblem-tick--n" />
            <span className="emblem-tick emblem-tick--e" />
            <span className="emblem-tick emblem-tick--s" />
            <span className="emblem-tick emblem-tick--w" />

            <div className="emblem-plate">
              <Image
                className="emblem-mark"
                src="/icons/raiju-dragon-vector.svg"
                width={113}
                height={121}
                alt=""
                priority
              />
            </div>
          </div>

          <div
            className="scene-calibration scene-calibration--a"
            aria-hidden="true"
          >
            {copy.sceneA}
          </div>

          <div
            className="scene-calibration scene-calibration--b"
            aria-hidden="true"
          >
            {copy.sceneB}
          </div>

          <div
            className="scene-calibration scene-calibration--c"
            aria-hidden="true"
          >
            RAIJU EMBLEM / CORE MARK
          </div>

          <div
            className="core-orbit-label core-orbit-label--one"
            aria-hidden="true"
          >
            WEB SYSTEMS
          </div>

          <div
            className="core-orbit-label core-orbit-label--two"
            aria-hidden="true"
          >
            INFRASTRUCTURE
          </div>

          <div
            className="core-orbit-label core-orbit-label--three"
            aria-hidden="true"
          >
            INTELLIGENCE
          </div>
        </div>

        <div className="system-facts">
          {copy.facts.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
