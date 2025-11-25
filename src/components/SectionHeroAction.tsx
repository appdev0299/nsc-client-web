import NcImage from '@/components/NcImage/NcImage'
import { TPost } from '@/data/posts'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import { Calendar03Icon, Folder02Icon, UserListIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

interface Props {
    posts: TPost[]
    className?: string
}

const SectionHeroAction: FC<Props> = ({ posts, className }) => {
    const renderMain = () => {
        if (!posts.length) return null
        const { featuredImage, title, excerpt, handle } = posts[0]
        return (
            <div className="aspect-w-8 aspect-h-8 sm:aspect-w-10 lg:aspect-w-16">
                <NcImage
                    alt={title}
                    containerClassName="absolute inset-0 z-0 overflow-hidden rounded-[40px]"
                    src={featuredImage}
                    fill
                    sizes="(max-width: 1024px) 100vw, 90vw"
                />
                <span className="absolute inset-0 rounded-[40px] bg-black/50"></span>
                <div className="absolute inset-0 p-5 md:p-14 xl:p-20 2xl:p-28">
                    <div className="max-w-2xl">
                        <h2 className="text-xl font-semibold text-white sm:text-3xl lg:text-4xl">
                            <Link href={`/post/${handle}`}>{title}</Link>
                        </h2>
                        <span className="mt-3 block text-sm/6 text-neutral-300 sm:mt-5 sm:text-base/relaxed">
                            <span className="line-clamp-2">{excerpt}</span>
                        </span>
                        <div className="mt-5 sm:mt-8">
                            <ButtonSecondary href={`/post/${handle}`}>
                                <span>Read more</span>
                                <ArrowRightIcon className="size-6 rtl:rotate-180" />
                            </ButtonSecondary>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderActions = () => {
        const actions = [
            {
                name: 'แพ็กเกจ',
                desc: 'เลือกดูแพ็กเกจสุขภาพที่เหมาะสมกับคุณ',
                href: '/packages',
                icon: Folder02Icon,
                color: 'text-blue-500',
            },
            {
                name: 'นัดหมาย',
                desc: 'จองคิวนัดหมายล่วงหน้าได้ง่ายๆ',
                href: '/booking',
                icon: Calendar03Icon,
                color: 'text-green-500',
            },
            {
                name: 'ค้นหาผู้เชี่ยวชาญ',
                desc: 'ค้นหาแพทย์และผู้เชี่ยวชาญเฉพาะทาง',
                href: '/specialists',
                icon: UserListIcon,
                color: 'text-purple-500',
            },
        ]

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
