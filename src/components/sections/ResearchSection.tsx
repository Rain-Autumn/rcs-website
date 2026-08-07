import type { RcsCopy } from '@/content/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';
import type { Locale } from '@/content/i18n';

export function ResearchSection({ copy, locale }: { copy: RcsCopy['research']; locale: Locale }) {
  return (
    <section className="technical-panel research-section" id="research" data-section="06">
      <SectionHeading index="06" label="RESEARCH / EXPERIMENTAL" title={copy.title} lead={copy.lead} />
      <div className="service-list research-list">
        {copy.items.map(([index, title, description]) => (
          <article key={index} className="service-row research-row" data-reveal>
            <span>{index}</span><h3>{title}</h3><p>{description}</p>
          </article>
        ))}
      </div>
      <div className="button-row"><Link className="mechanical-button mechanical-button--dark" href={`/${locale}/research`}><span>RCS RESEARCH PROGRAM</span><span aria-hidden="true">↗</span></Link></div>
    </section>
  );
}
