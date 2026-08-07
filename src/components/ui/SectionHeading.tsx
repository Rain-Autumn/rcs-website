type Props = {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: string;
};

export function SectionHeading({ index, label, title, lead }: Props) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">
        {index} {'//'} {label}
      </p>
      <h2>{title}</h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </div>
  );
}
