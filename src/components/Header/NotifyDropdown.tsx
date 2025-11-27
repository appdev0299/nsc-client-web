'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { getPackages } from '@/data/packages'
import { getPostsFromApi } from '@/data/api'
import { useLocale } from 'next-intl'
import { formatDistanceToNow } from 'date-fns'
import { th, enUS } from 'date-fns/locale'

interface NotificationItem {
    name: string
    description: string
    href: string
    time: string
    isNew: boolean
    image?: string
}

export default function NotifyDropdown({ className }: { className?: string }) {
    const locale = useLocale()
    const [notifications, setNotifications] = useState<NotificationItem[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [packages, posts] = await Promise.all([
                    getPackages(locale),
                    getPostsFromApi(locale)
                ])

                const packageItems: NotificationItem[] = packages.map(pkg => ({
                    name: pkg.title,
                    description: pkg.excerpt || '',
                    href: `/packages/${pkg.handle}`,
                    time: pkg.date,
                    isNew: true, // You might want to calculate this based on date
                    image: pkg.featuredImage?.src
                }))

                const postItems: NotificationItem[] = posts.map(post => ({
                    name: post.title,
                    description: post.excerpt || '',
                    href: `/post/${post.handle}`,
                    time: post.date,
                    isNew: true,
                    image: post.featuredImage?.src
                }))

                const allItems = [...packageItems, ...postItems]
                    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
                    .slice(0, 5)

                setNotifications(allItems)
            } catch (error) {
                console.error('Failed to fetch notifications', error)
            }
        }

        fetchData()
    }, [locale])

    const formatTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), {
                addSuffix: true,
                locale: locale === 'th' ? th : enUS
            })
        } catch (e) {
            return ''
        }
    }

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
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {locale === 'th' ? 'การแจ้งเตือน' : 'Notifications'}
                    </h3>
                </div>
                <div className="space-y-1">
                    {notifications.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className={clsx(
                                'block rounded-lg px-3 py-2 transition hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                            )}
                        >
                            <div className="flex justify-between">
                                <p className="text-sm font-medium text-neutral-900 line-clamp-1 dark:text-neutral-100">{item.name}</p>
                                <p className="text-xs text-neutral-500 whitespace-nowrap ml-2 dark:text-neutral-400">{formatTime(item.time)}</p>
                            </div>
                            <p className="mt-1 text-xs text-neutral-500 line-clamp-2 dark:text-neutral-400">{item.description}</p>
                        </a>
                    ))}
                    {notifications.length === 0 && (
                        <div className="px-3 py-4 text-center text-sm text-neutral-500">
                            {locale === 'th' ? 'ไม่มีการแจ้งเตือนใหม่' : 'No new notifications'}
                        </div>
                    )}
                </div>
                <div className="mt-2 border-t border-neutral-100 px-3 py-2 dark:border-neutral-800">
                    <a href="/search?sort=most-recent" className="block text-center text-xs font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                        {locale === 'th' ? 'ดูทั้งหมด' : 'View all'}
                    </a>
                </div>
            </PopoverPanel>
        </Popover>
    )
}
