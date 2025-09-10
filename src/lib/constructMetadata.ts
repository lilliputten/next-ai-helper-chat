import { Metadata } from 'next';

import { SiteConfig, siteConfig } from '@/config/site';
import { defaultLanguage } from '@/constants';

interface TConstructMetadataParams
  extends Partial<Pick<SiteConfig, 'title' | 'description' | 'keywords'>> {
  // title?: string;
  // description?: string;
  // keywords: SiteConfig['keywords'];
  image?: string;
  icons?: string;
  noIndex?: boolean;
  locale?: string;
  url?: string;
}

/** Create html, oath, twitter and other meta data tags */
export function constructMetadata(params: TConstructMetadataParams = {}): Metadata {
  const {
    title = siteConfig.title,
    description = siteConfig.description,
    keywords = siteConfig.keywords,
    image = siteConfig.ogImage,
    icons = '/favicon.ico',
    noIndex = false,
    locale = defaultLanguage, // routing.defaultLocale as TLocale,
    url = siteConfig.url,
  } = params;
  return {
    title,
    description,
    keywords,
    authors: [
      {
        name: 'lilliputten',
      },
    ],
    creator: 'lilliputten',
    openGraph: {
      type: 'website',
      locale, // 'en',
      url,
      title,
      description,
      siteName: title,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@lilliputten',
    },
    icons,
    metadataBase: new URL(url),
    manifest: `${url}/site.webmanifest`,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
