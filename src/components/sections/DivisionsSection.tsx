import type { RcsCopy } from '@/content/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function DivisionsSection({ copy }: { copy: RcsCopy['divisions'] }) {
  return (
    <section className="technical-panel divisions-section" id="divisions" data-section="02">
      <SectionHeading index="02" label="RCS DIVISIONS" title={copy.title} lead={copy.lead} />
      <div className="division-grid">
        {copy.items.map((item, index) => (
          <article className="division-card" key={item.code} data-reveal>
            <div className="division-card__index">
              <span>{item.code}</span>
              <i aria-hidden="true">0{index + 1}</i>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <small>{item.capabilities}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
