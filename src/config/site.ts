import appInfoModule from '@/app-info.json';

import { PUBLIC_URL } from './env';

const siteUrl = PUBLIC_URL;

export type SiteConfig = {
  title: string;
  description: string;
  keywords: string[];
  versionInfo: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    website: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  title: 'NextJS AI Helper Chat',
  description: 'NextJS chat application',
  keywords: [
    // ...
    'next.js',
    'ai',
    'chat',
  ],
  versionInfo: appInfoModule.versionInfo,
  url: siteUrl,
  ogImage: `/static/opengraph-image.jpg`,
  links: {
    website: siteUrl, // 'https://next-ai-helper-chat.vercel.app/',
    github: 'https://github.com/lilliputten/next-ai-helper-chat',
  },
  mailSupport: 'lilliputten@gmail.com',
};
