import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

import { isLocale } from "@/content/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://raijucloudsystem.com"),

  icons: {
    icon: "/icons/raiju-dragon-vector.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f8f4",
  colorScheme: "light",
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
    <html lang={lang} data-scroll-behavior="smooth">
      <body className="portal-entered">{children}</body>
    </html>
  );
}
