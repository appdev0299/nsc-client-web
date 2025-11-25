import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { Noto_Sans_Thai } from 'next/font/google';
import { ApplicationLayout } from '@/app/[locale]/(app)/application-layout';
import type { Metadata } from 'next';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: '%s - NSC Clinic',
    default: 'NSC Clinic - Comprehensive Healthcare Center',
  },
  description: 'Comprehensive healthcare services, online doctor appointments',
  keywords: ['NSC Clinic', 'Healthcare', 'Medical', 'Clinic'],
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Await params in Next.js 15+
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={notoSansThai.className}>
      <body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        <NextIntlClientProvider messages={messages}>
          <ApplicationLayout headerStyle="header-2" headerHasBorder={false} showBanner={false}>
            {children}
          </ApplicationLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
