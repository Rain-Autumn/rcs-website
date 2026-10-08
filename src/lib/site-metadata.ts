import type { Metadata } from 'next';

export const RCS_SITE_URL = 'https://raijucloudsystem.com';

export const RCS_SOCIAL_IMAGE = {
  url: '/images/rcs-social-card.png',
  width: 1200,
  height: 630,
  alt: 'Raiju Cloud System — Technology, systems and research',
} as const;

type SocialMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale?: string;
};

export function socialMetadata({
  title,
  description,
  path,
  locale,
}: SocialMetadataOptions): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      url: new URL(path, RCS_SITE_URL).toString(),
      siteName: 'Raiju Cloud System',
      title,
      description,
      locale,
      images: [RCS_SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [RCS_SOCIAL_IMAGE.url],
    },
  };
}
