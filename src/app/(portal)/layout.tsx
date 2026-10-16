import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { socialMetadata } from "@/lib/site-metadata";

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
  themeColor: "#f8f8f4",
  colorScheme: "light",
};

export default function PortalRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
