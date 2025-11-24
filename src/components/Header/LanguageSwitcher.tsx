'use client'

import { Link } from '@/shared/link'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

interface Language {
    id: string
    name: string
    description: string
    href: string
    active?: boolean
}

export default function LanguageSwitcher({
    languages,
    className,
}: {
    languages: Language[]
    className?: string
}) {
    const activeLanguage = languages.find((lang) => lang.active) || languages[0]

    return (
        <Popover className={clsx('group relative', className)}>
            <PopoverButton className="flex items-center gap-x-1 text-sm font-medium text-neutral-700 hover:text-neutral-950 focus:outline-hidden dark:text-neutral-300 dark:hover:text-neutral-100">
                {activeLanguage.name}
                <ChevronDownIcon className="size-4 group-data-open:rotate-180" aria-hidden="true" />
            </PopoverButton>

            <PopoverPanel
                transition
                className="absolute right-0 top-full z-50 mt-3 w-40 rounded-xl bg-white p-2 shadow-lg ring-1 ring-neutral-900/5 transition duration-200 data-closed:translate-y-1 data-closed:opacity-0 dark:bg-neutral-900 dark:ring-white/10"
            >
                <div className="space-y-1">
                    {languages.map((language) => (
                        <Link
                            key={language.id}
                            href={language.href}
                            className={clsx(
                                'block rounded-lg px-3 py-2 text-sm',
                                language.active
                                    ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                                    : 'font-normal text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800/50'
                            )}
                        >
                            <div className="font-medium">{language.name}</div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400">{language.description}</div>
                        </Link>
                    ))}
                </div>
            </PopoverPanel>
        </Popover>
    )
}
