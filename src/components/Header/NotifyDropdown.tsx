'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const notifications = [
    {
        name: 'New medical package available',
        description: 'Check out our latest comprehensive health checkup.',
        href: '/packages',
        time: '5m ago',
        isNew: true,
    },
    {
        name: 'Health article: Mental Health',
        description: 'Read our new article about mental well-being.',
        href: '/health-knowledge',
        time: '2h ago',
        isNew: true,
    },
    {
        name: 'Clinic hours update',
        description: 'Our clinic hours have been updated for the holidays.',
        href: '/contact',
        time: '1d ago',
        isNew: false,
    },
]

export default function NotifyDropdown({ className }: { className?: string }) {
    return (
        <Popover className={clsx('relative', className)}>
            <PopoverButton className="group flex items-center justify-center rounded-full p-2 text-neutral-500 hover:bg-neutral-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" />
            </PopoverButton>

            <PopoverPanel
                transition
                className="absolute right-0 top-full z-50 mt-3 w-80 max-w-sm rounded-xl bg-white p-2 shadow-lg ring-1 ring-neutral-900/5 transition duration-200 data-closed:translate-y-1 data-closed:opacity-0 dark:bg-neutral-900 dark:ring-white/10"
            >
                <div className="px-3 py-2">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Notifications</h3>
                </div>
                <div className="space-y-1">
                    {notifications.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                'block rounded-lg px-3 py-2 transition hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                            )}
                        >
                            <div className="flex justify-between">
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.name}</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.time}</p>
                            </div>
                            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
                        </a>
                    ))}
                </div>
                <div className="mt-2 border-t border-neutral-100 px-3 py-2 dark:border-neutral-800">
                    <a href="/news" className="block text-center text-xs font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                        View all notifications
                    </a>
                </div>
            </PopoverPanel>
        </Popover>
    )
}
