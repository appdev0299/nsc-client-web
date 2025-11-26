'use client'

import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { useTransition } from 'react'

export default function LanguageSwitcher({ className }: { className?: string }) {
    const locale = useLocale() as Locale
    const router = useRouter()
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const searchParams = useSearchParams()

    const handleLanguageChange = (newLocale: Locale) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            router.replace(`${pathname}?${params.toString()}`, { locale: newLocale })
        })
    }

    return (
        <div className={clsx('menu-item group relative', className)}>
            <button className="flex items-center gap-x-1 text-sm font-medium text-neutral-700 hover:text-neutral-950 focus:outline-hidden dark:text-neutral-300 dark:hover:text-neutral-100">
                {localeNames[locale]}
                <ChevronDownIcon className="size-4 group-hover:rotate-180 transition-transform duration-200" aria-hidden="true" />
            </button>

            <div className="sub-menu absolute right-0 top-full z-50 w-40 pt-3">
                <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-neutral-900/5 dark:bg-neutral-900 dark:ring-white/10">
                    <div className="space-y-1">
                        {locales.map((loc) => (
                            <button
                                key={loc}
                                onClick={() => handleLanguageChange(loc)}
                                disabled={isPending}
                                className={clsx(
                                    'block w-full text-left rounded-lg px-3 py-2 text-sm',
                                    locale === loc
                                        ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                                        : 'font-normal text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/50'
                                )}
                            >
                                <div className="font-medium">{localeNames[loc]}</div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {loc === 'th' ? 'ไทย' : 'English'}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
