import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { socialMetadata } from '@/lib/site-metadata';

const social = socialMetadata({
  title: 'Raiju Cloud System | RCS Core',
  description: 'Technology, systems, infrastructure and intelligence.',
  path: '/',
  locale: 'en_US',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://raijucloudsystem.com'),

  title: 'Raiju Cloud System | RCS Core',

  description:
    'Technology, systems, infrastructure and intelligence. Raiju Cloud System.',

  alternates: {
    canonical: '/',
    languages: {
      'fr-BE': '/fr',
      en: '/en',
      'nl-BE': '/nl',
      'x-default': '/',
    },
  },

  ...social,

  icons: {
    icon: '/icons/raiju-mark.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A09',
  colorScheme: 'dark light',
};

export default function PortalRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
