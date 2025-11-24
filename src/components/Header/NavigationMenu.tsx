'use client'

import { TNavigationItem } from '@/data/navigation'
import { Link } from '@/shared/link'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

export default function NavigationMenu({
    navigation,
    className,
}: {
    navigation: TNavigationItem[]
    className?: string
}) {
    const renderMenuItem = (item: TNavigationItem) => {
        // If item has children, render as dropdown
        if (item.type === 'dropdown' && item.children) {
            return (
                <Popover key={item.id} className="group relative">
                    <PopoverButton className="flex items-center gap-x-1 text-sm font-medium text-neutral-700 hover:text-neutral-950 focus:outline-hidden dark:text-neutral-300 dark:hover:text-neutral-100">
                        {item.name}
                        <ChevronDownIcon className="size-4 group-data-open:rotate-180" aria-hidden="true" />
                    </PopoverButton>

                    <PopoverPanel
                        transition
                        className="absolute left-0 top-full z-50 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-neutral-900/5 transition duration-200 data-closed:translate-y-1 data-closed:opacity-0 dark:bg-neutral-900 dark:ring-white/10"
                    >
                        <div className="space-y-1">
                            {item.children.map((child) => (
                                <Link
                                    key={child.id}
                                    href={child.href || '#'}
                                    className="block rounded-lg px-3 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                >
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    </PopoverPanel>
                </Popover>
            )
        }

        // Regular menu item without dropdown
        return (
            <Link
                key={item.id}
                href={item.href || '#'}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
                {item.name}
            </Link>
        )
    }

    return (
        <nav className={clsx('flex items-center gap-x-6', className)}>
            {navigation.map(renderMenuItem)}
        </nav>
    )
}
