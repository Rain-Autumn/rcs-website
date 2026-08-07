'use client';

import { useState } from 'react';
import type { RcsCopy } from '@/content/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ContactSection({ copy }: { copy: RcsCopy['contact'] }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact@raijucloudsystem.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="technical-panel contact-section" id="contact" data-section="09">
      <SectionHeading index="09" label="CONTACT" title={copy.title} lead={copy.lead} />
      <div className="contact-grid" data-reveal>
        <dl>
          <div><dt>{copy.labels.director}</dt><dd>Hugues Henrotte</dd></div>
          <div><dt>{copy.labels.system}</dt><dd>Raiju Cloud System / RCS Core</dd></div>
          <div><dt>{copy.labels.email}</dt><dd><a href="mailto:contact@raijucloudsystem.com">contact@raijucloudsystem.com</a></dd></div>
          <div><dt>{copy.labels.phone}</dt><dd><a href="tel:+32499160882">0499 16 08 82</a></dd></div>
          <div><dt>{copy.labels.web}</dt><dd><a href="https://raijucloudsystem.com/">raijucloudsystem.com</a></dd></div>
        </dl>
        <div className="contact-actions">
          <a className="mechanical-button mechanical-button--dark" href="mailto:contact@raijucloudsystem.com?subject=Raiju%20Cloud%20System%20-%20Project"><span>{copy.projectContact}</span><span aria-hidden="true">↳</span></a>
          <a className="mechanical-button" href="mailto:contact@raijucloudsystem.com?subject=Raiju%20Cloud%20System%20-%20Technical"><span>{copy.technicalContact}</span><span aria-hidden="true">↳</span></a>
          <button className="mechanical-button" type="button" onClick={copyEmail}><span>{copied ? copy.copied : copy.copyEmail}</span><span aria-hidden="true">⎘</span></button>
        </div>
      </div>
    </section>
  );
}
