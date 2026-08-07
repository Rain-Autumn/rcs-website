import type { RcsCopy } from '@/content/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ProjectsSection({ copy }: { copy: RcsCopy['projects'] }) {
  return (
    <section className="technical-panel projects-section" id="projects" data-section="07">
      <SectionHeading index="07" label="RCS PROJECTS" title={copy.title} lead={copy.lead} />
      <div className="project-table">
        {copy.items.map((project) => (
          <article className="project-row" key={project.code} data-reveal>
            <div className="project-status"><span>{project.code}</span><small>{project.status}</small></div>
            <div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p></div>
            <div className="project-tech"><span>{copy.techLabel}</span><strong>{project.tech}</strong></div>
          </article>
        ))}
      </div>
    </section>
  );
}
