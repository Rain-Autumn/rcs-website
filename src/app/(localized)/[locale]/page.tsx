import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { HeroSection } from '@/components/sections/HeroSection';
import { DivisionsSection } from '@/components/sections/DivisionsSection';
import { WebSection } from '@/components/sections/WebSection';
import { LinuxSection } from '@/components/sections/LinuxSection';
import { AiSection } from '@/components/sections/AiSection';
import { ResearchSection } from '@/components/sections/ResearchSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { DirectorSection } from '@/components/sections/DirectorSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { SmoothMotion } from '@/components/ui/SmoothMotion';
import { getCopy, isLocale, locales, type Locale } from '@/content/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = getCopy(locale);
  const url = `https://raijucloudsystem.com/${locale}`;

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr-BE': '/fr',
        en: '/en',
        'nl-BE': '/nl',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: copy.metadata.ogLocale,
      url,
      siteName: 'Raiju Cloud System',
      title: copy.metadata.title,
      description: copy.metadata.description,
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const copy = getCopy(locale);

  return (
    <>
      <a className="skip-link" href="#main">{copy.skipLink}</a>
      <SmoothMotion />
      <SiteHeader locale={locale} copy={copy} />
      <main id="main" tabIndex={-1}>
        <HeroSection copy={copy.hero} />
        <DivisionsSection copy={copy.divisions} />
        <WebSection copy={copy.web} />
        <LinuxSection copy={copy.infrastructure} />
        <AiSection copy={copy.intelligence} />
        <ResearchSection copy={copy.research} locale={locale} />
        <ProjectsSection copy={copy.projects} />
        <DirectorSection copy={copy.director} />
        <ContactSection copy={copy.contact} />
      </main>
      <footer className="site-footer">
        <span>RAIJU CLOUD SYSTEM</span>
        <span>RCS CORE</span>
        <span>{copy.footer}</span>
      </footer>
    </>
  );
}
