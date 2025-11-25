import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'th'; // fallback to default
  }

  return {
    locale,
    messages: (await import(`@/locales/${locale}/common.json`)).default
  };
});
