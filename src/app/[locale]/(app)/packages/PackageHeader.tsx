'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { Divider } from '@/shared/divider'
import clsx from 'clsx'
import Image from 'next/image'
import { FC } from 'react'
import { useLocale } from 'next-intl'

interface PackageData {
    id: string
    name: string
    price: string
    description: string
    imageUrl?: string
    createdAt?: string
    clinic?: {
        id: string
        name: string
        address?: string
    }
}

interface Props {
    className?: string
    packageData: PackageData
}

const _placeholder_images = [
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2032&auto=format&fit=crop',
]

const PackageHeader: FC<Props> = ({ className, packageData }) => {
    const locale = useLocale()
    const { name, price, clinic, description, imageUrl } = packageData

    // Robust image selection: Use API image if available, otherwise hash ID for placeholder
    const imageIndex = Math.abs(packageData.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % _placeholder_images.length
    const featuredImage = (imageUrl && imageUrl.trim() !== '') ? imageUrl : _placeholder_images[imageIndex]

    // Common card style classes
    const cardStyle = "rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 lg:p-8"

    return (
        <>
            <div className="container">
                <Divider />
            </div>
            <header className={clsx('container mt-8 lg:mt-12 mb-16 lg:mb-24', className)}>
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
                    {/* Left Column: Image (Sticky) */}
                    <div className="relative w-full lg:sticky lg:top-24">
                        <div className="relative aspect-square w-full overflow-hidden rounded-3xl sm:aspect-16/9 lg:aspect-square">
                            <Image
                                alt={name}
                                className="object-cover"
                                src={featuredImage}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                fill
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Column: All Info */}
                    <div className="flex flex-col gap-6">
                        {/* 1. Main Info Card */}
                        <div className={cardStyle}>
                            <h1 className="text-2xl font-bold text-neutral-900 md:text-3xl dark:text-neutral-100">
                                {name}
                            </h1>

                            {clinic && (
                                <div className="mt-3 flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                                    <span className="text-sm font-medium">{clinic.name}</span>
                                </div>
                            )}

                            <div className="my-6 border-t border-neutral-100 dark:border-neutral-800"></div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{locale === 'th' ? 'ราคาแพ็กเกจ' : 'Package Price'}</p>
                                    <p className="text-3xl font-bold text-primary-600 dark:text-primary-500">
                                        ฿{parseInt(price).toLocaleString()}
                                    </p>
                                </div>
                                <ButtonPrimary href={`/booking?packageId=${packageData.id}`} className="w-full sm:w-auto px-8">
                                    {locale === 'th' ? 'ซื้อเลย' : 'Book Now'}
                                </ButtonPrimary>
                            </div>
                        </div>

                        {/* 2. Contact Card */}
                        <div className={clsx(cardStyle, "flex items-center justify-center !py-6")}>
                            <ButtonSecondary href="/contact" className="w-full flex items-center justify-center gap-2" outline>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                {locale === 'th' ? 'ติดต่อสอบถามเพิ่มเติม' : 'Contact Us'}
                            </ButtonSecondary>
                        </div>

                        {/* 3. Combined Details Card (Details + Benefits + Clinic) */}
                        <div className={cardStyle}>
                            {/* Section: Package Details */}
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">{locale === 'th' ? 'รายละเอียดแพ็กเกจ' : 'Package Details'}</h3>
                                <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400">
                                    <p>{description}</p>
                                </div>
                            </div>

                            <div className="my-8 border-t border-neutral-100 dark:border-neutral-800"></div>

                            {/* Section: Service Benefits */}
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">{locale === 'th' ? 'สิทธิประโยชน์' : 'Service Benefits'}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <svg className="size-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{locale === 'th' ? 'บริการสุขภาพมืออาชีพ' : 'Professional healthcare service'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <svg className="size-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{locale === 'th' ? 'ทีมแพทย์ผู้เชี่ยวชาญ' : 'Experienced medical team'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                                        <svg className="size-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{locale === 'th' ? 'นัดหมายได้สะดวก' : 'Flexible appointment scheduling'}</span>
                                    </div>
                                </div>
                            </div>

                            {clinic && (
                                <>
                                    <div className="my-8 border-t border-neutral-100 dark:border-neutral-800"></div>

                                    {/* Section: Clinic Information */}
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">{locale === 'th' ? 'ข้อมูลคลินิก' : 'Clinic Information'}</h3>
                                        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-4">
                                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{clinic.name}</h4>
                                            {clinic.address && <p className="text-sm text-neutral-500 mt-1">{clinic.address}</p>}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </header>
        </>
    )
}

export default PackageHeader
