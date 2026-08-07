import type { RcsCopy } from '@/content/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function WebSection({ copy }: { copy: RcsCopy['web'] }) {
  return (
    <section className="technical-panel web-section" id="web" data-section="03">
      <SectionHeading index="03" label="WEB SYSTEMS" title={copy.title} lead={copy.lead} />
      <div className="capability-grid">
        {copy.cards.map(([technology, title, text], index) => (
          <article className="capability-card" key={technology} data-reveal>
            <p className="capability-code">MOD-{String(index + 1).padStart(2, '0')}</p>
            <span>{technology}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="capability-lines" aria-hidden="true"><i /><i /><i /><i /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
