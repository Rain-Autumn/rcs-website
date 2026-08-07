import type { RcsCopy } from '@/content/i18n';

export function DirectorSection({ copy }: { copy: RcsCopy['director'] }) {
  return (
    <section className="technical-panel director-section" id="director" data-section="08">
      <div className="director-grid" data-reveal>
        <div className="director-index-panel">
          <p className="eyebrow">{copy.eyebrow}</p>
          <div className="director-code" aria-hidden="true">RCS<br />DIR-01</div>
        </div>
        <div className="director-copy">
          <p className="director-role">{copy.role}</p>
          <h2>{copy.title}</h2>
          <p className="director-lead">{copy.lead}</p>
          <p>{copy.body}</p>
          <div className="button-row">
            <a className="mechanical-button mechanical-button--dark" href="/CV-Hugues-Henrotte-RCS-2026.pdf" target="_blank" rel="noopener"><span>{copy.viewCv}</span><span aria-hidden="true">↗</span></a>
            <a className="mechanical-button" href="/CV-Hugues-Henrotte-RCS-2026.pdf" download><span>{copy.downloadCv}</span><span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
