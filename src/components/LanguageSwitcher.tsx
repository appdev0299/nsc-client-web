'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/request';
import clsx from 'clsx';

const languageNames: Record<string, string> = {
    en: 'EN',
    th: 'TH'
};

export default function LanguageSwitcher({ className }: { className?: string }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        // Remove current locale from pathname
        const pathWithoutLocale = pathname.replace(`/${locale}`, '');
        // Navigate to new locale
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    return (
        <div className={clsx('flex items-center gap-1 rounded-full border border-neutral-200 p-1 dark:border-neutral-700', className)}>
            {locales.map((loc) => (
                <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={clsx(
                        'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                        locale === loc
                            ? 'bg-primary-600 text-white'
                            : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
                    )}
                >
                    {languageNames[loc]}
                </button>
            ))}
        </div>
    );
}
