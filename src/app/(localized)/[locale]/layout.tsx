import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';

import { isLocale } from '@/content/i18n';
import { SceneTransitions } from '@/components/ui/SceneTransitions';

export const metadata: Metadata = {
  metadataBase: new URL('https://raijucloudsystem.com'),

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

export default async function LocalizedRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>) {
  const { locale } = await params;

  const lang = isLocale(locale)
    ? locale
    : 'en';

  return (
    <html lang={lang}>
      <body>
        <SceneTransitions />
        {children}
      </body>
    </html>
  );
}
