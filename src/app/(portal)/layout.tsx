import type { Metadata, Viewport } from "next";
import "@/app/theme.css";
import "@/app/globals.css";
import { socialMetadata } from "@/lib/site-metadata";
import { themeColors, themeInitScript } from "@/lib/theme";

const social = socialMetadata({
  title: "Raiju Cloud System — AI & Research",
  description: "Applied AI engineering and research.",
  path: "/",
  locale: "en_US",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://raijucloudsystem.com"),

  title: "Raiju Cloud System — AI & Research",

  description: "Applied AI engineering and research. Raiju Cloud System.",

  alternates: {
    canonical: "/",
    languages: {
      "fr-BE": "/fr",
      en: "/en",
      "nl-BE": "/nl",
      "x-default": "/fr",
    },
  },

  ...social,

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

export default function PortalRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The head script sets data-theme before paint, so React must not flag it.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
