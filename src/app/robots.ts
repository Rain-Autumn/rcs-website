import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://raijucloudsystem.com/sitemap.xml',
    host: 'https://raijucloudsystem.com',
  };
}
