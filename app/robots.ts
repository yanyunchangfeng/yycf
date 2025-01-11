import siteMetadata from '@/data/siteMetadata';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/*']
    },
    host: siteMetadata.siteUrl,
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`
  };
}
