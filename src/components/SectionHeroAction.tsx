'use client'

import NcImage from '@/components/NcImage/NcImage'
import { TPost } from '@/data/posts'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC, useState, useEffect, useMemo } from 'react'
import { Calendar03Icon, Folder02Icon, UserListIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

export interface HeroTranslations {
    readMore: string
    packages: string
    packagesDesc: string
    appointment: string
    appointmentDesc: string
    findSpecialist: string
    findSpecialistDesc: string
}

interface Props {
    posts: TPost[]
    className?: string
    translations: HeroTranslations
}

const SectionHeroAction: FC<Props> = ({ posts, className, translations }) => {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        if (posts.length <= 1) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % posts.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [posts.length])

    const renderMain = () => {
        if (!posts.length) return null

        return (
            <div className="aspect-w-8 aspect-h-8 sm:aspect-w-10 lg:aspect-w-16 relative group overflow-hidden rounded-[40px]">
                <div
                    className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {posts.map((post, index) => {
                        const { featuredImage, title, cover } = post
                        const displayImage = cover?.apiEndpoint
                            ? (cover.apiEndpoint.startsWith('http') ? cover.apiEndpoint : `http://localhost:3000${cover.apiEndpoint}`)
                            : featuredImage

                        return (
                            <div key={index} className="relative w-full h-full flex-shrink-0">
                                <NcImage
                                    alt={title}
                                    containerClassName="absolute inset-0 z-0 overflow-hidden"
                                    src={displayImage}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 90vw"
                                />
                            </div>
                        )
                    })}
                </div>

                {/* Navigation Dots */}
                {posts.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2 sm:bottom-8">
                        {posts.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 w-2 rounded-full transition-all ${index === currentSlide ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const actions = useMemo(() => [
        {
            name: translations.packages,
            desc: translations.packagesDesc,
            href: '/packages',
            icon: Folder02Icon,
            color: 'text-blue-500',
        },
        {
            name: translations.appointment,
            desc: translations.appointmentDesc,
            href: '/appointment',
            icon: Calendar03Icon,
            color: 'text-green-500',
        },
        {
            name: translations.findSpecialist,
            desc: translations.findSpecialistDesc,
            href: '/specialists',
            icon: UserListIcon,
            color: 'text-purple-500',
        },
    ], [translations])

    const renderActions = () => {
        return (
            <div className="mt-6 grid transform gap-4 sm:grid-cols-2 md:-mt-20 md:grid-cols-3 lg:gap-8 lg:px-14 xl:px-20 2xl:px-28">
                {actions.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="group relative flex flex-col items-center rounded-3xl border border-neutral-200 bg-white p-6 text-center shadow-2xl transition-shadow hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
                    >
                        <div className={`mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-800 ${item.color}`}>
                            <HugeiconsIcon icon={item.icon} size={32} />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{item.name}</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                    </Link>
                ))}
            </div>
        )
    }

    return (
        <div className={clsx('section-hero-3', className)}>
            {posts.length > 0 && renderMain()}
            {renderActions()}
        </div>
    )
}

export default SectionHeroAction
