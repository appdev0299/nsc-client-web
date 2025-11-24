import '@/styles/tailwind.css'
import { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import ThemeProvider from '../theme-provider'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';

const notoSansThai = Noto_Sans_Thai({
    subsets: ['thai', 'latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: {
        template: '%s - Ncmaz',
        default: 'Ncmaz - Blog, News, Magazine template',
    },
    description: 'Ncmaz - Blog, News, Magazine template',
    keywords: ['Ncmaz', 'Blog', 'News', 'Magazine'],
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client side
    const messages = await getMessages();

    return (
        <html lang={locale} className={notoSansThai.className}>
            <body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
                <ThemeProvider>
                    <NextIntlClientProvider messages={messages}>
                        <div>{children}</div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
