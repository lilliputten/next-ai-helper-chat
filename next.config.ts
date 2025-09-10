import { NextConfig } from 'next';

import {
  primaryColor,
  primaryForegroundColor,
  secondaryColor,
  secondaryForegroundColor,
} from './src/config/themeColors';

const scssVariables = `
$primaryColor: ${primaryColor};
$secondaryColor: ${secondaryColor};
$primaryForegroundColor: ${primaryForegroundColor};
$secondaryForegroundColor: ${secondaryForegroundColor};
`;

const nextConfig = {
  /* experimental: {
   *   optimizePackageImports: ['@tailwindcss/oxide'],
   * },
   */
  sassOptions: {
    additionalData: scssVariables,
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    remotePatterns: [],
  },
} satisfies NextConfig;

export default nextConfig;
