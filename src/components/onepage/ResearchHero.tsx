import { copy } from "@/content/onepage";
import type { Locale } from "@/content/i18n";
import styles from "./ResearchHero.module.css";

const circuitPaths = [
  "M80 492H202L264 430H388L456 362H580L748 194H820",
  "M152 540H282L324 498H422L470 450H608L770 288H820",
  "M20 420H160L222 358H342L406 294H526L676 144H820",
  "M108 340H216L278 278H390L450 218H578L704 92H820",
  "M192 258H306L354 210H462L526 146H636L732 50H820",
  "M292 168H398L444 122H552L614 60H710L770 0",
  "M370 90H476L516 50H614L664 0",
  "M242 540V466L314 394H438L510 322H630L760 192H820",
  "M410 540V486L482 414H616L684 346V268L778 174H820",
  "M570 540V484L646 408H726L792 342V256",
  "M664 540V498L746 416H798V372",
  "M486 0V52L438 100H338",
];

const circuitNodes = [
  [80, 492],
  [20, 420],
  [108, 340],
  [192, 258],
  [292, 168],
  [370, 90],
  [338, 100],
  [242, 540],
  [792, 256],
];

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ResearchHero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className={styles.hero} data-research-hero>
      <div className={styles.decoration} aria-hidden="true">
        <svg
          className={styles.circuits}
          viewBox="0 0 800 540"
          fill="none"
          aria-hidden="true"
          focusable="false"
          data-circuit-decoration
        >
          {circuitPaths.map((path) => (
            <path key={path} d={path} />
          ))}
          {circuitNodes.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
          ))}
        </svg>
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t.heroEyebrow}</p>
        <h1 id="hero-title" className={styles.title}>
          {t.heroTitle}
        </h1>
        <p className={styles.description}>{t.heroDescription}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href="#equipe">
            {t.heroDiscover}
          </a>
          <a className={styles.secondary} href="#recherches">
            <span>{t.exploreResearch}</span>
            <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}
