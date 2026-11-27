import type { Metadata, Viewport } from "next";
import "@/app/theme.css";
import "@/app/globals.css";

import { isLocale } from "@/content/i18n";
import { themeColors, themeInitScript } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL("https://raijucloudsystem.com"),

  icons: {
    icon: "/icons/raiju-dragon-vector.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: themeColors,
  colorScheme: "light dark",
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

  const lang = isLocale(locale) ? locale : "en";

  return (
    // The head script sets data-theme before paint, so React must not flag it.
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="portal-entered">{children}</body>
    </html>
  );
}
