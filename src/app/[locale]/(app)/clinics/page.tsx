import { getClinicsFromApi } from '@/data/api'
import Avatar from '@/shared/Avatar'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'nav' })
    return {
        title: t('clinics'),
    }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const clinics = await getClinicsFromApi(locale)
    const t = await getTranslations({ locale, namespace: 'nav' })

    return (
        <div className="container py-16 lg:py-28">
            <div className="mb-10 lg:mb-14">
                <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">{t('clinics')}</h2>
                <span className="mt-3 block text-neutral-500 dark:text-neutral-400">
                    {locale === 'th'
                        ? 'พบกับเครือข่ายคลินิกของเราที่ให้บริการด้านสุขภาพชั้นนำ'
                        : 'Discover our network of clinics providing top-notch healthcare services.'}
                </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {clinics.map((clinic) => (
                    <div
                        key={clinic.id}
                        className="group relative flex flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white px-3 py-5 text-center transition-shadow hover:shadow-xl sm:px-6 sm:py-7 dark:border-neutral-700 dark:bg-neutral-900"
                    >
                        <Link href={`/clinics/${clinic.id}`} className="absolute inset-0" />
                        <Avatar className="size-24" src={clinic.logo} width={96} height={96} sizes="96px" />
                        <div className="mt-4">
                            <h2 className="text-lg font-medium">
                                <span className="line-clamp-1">{clinic.name}</span>
                            </h2>
                            <span className="mt-1 line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400">
                                {clinic.address || (locale === 'th' ? 'กรุงเทพมหานคร, ไทย' : 'Bangkok, Thailand')}
                            </span>
                        </div>
                        <div className="mt-6 flex items-center justify-center rounded-full bg-primary-50 px-4 py-2 text-xs font-medium text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                            {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'} <ArrowRightIcon className="ms-2 size-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
