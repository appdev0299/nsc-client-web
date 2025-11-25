import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // Always show /th or /en in URL
  localeDetection: true   // Auto-detect from browser
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (_next/static)
  // - Image optimization files (_next/image)
  // - Favicon and other public files
  matcher: [
    '/',
    '/(th|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
