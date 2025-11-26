import ButtonPrimary from '@/shared/ButtonPrimary'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'about.careers' })

    return {
        title: t('title'),
    }
}

const PageCareers = () => {
    const t = useTranslations('about.careers')

    const jobs = [
        {
            id: 1,
            title: t('jobs.seniorMedicalOfficer'),
            department: t('departments.medical'),
            location: t('locations.bangkok'),
            type: t('types.fullTime'),
        },
        {
            id: 2,
            title: t('jobs.registeredNurse'),
            department: t('departments.nursing'),
            location: t('locations.bangkok'),
            type: t('types.fullTime'),
        },
        {
            id: 3,
            title: t('jobs.healthcareAdministrator'),
            department: t('departments.management'),
            location: t('locations.bangkok'),
            type: t('types.fullTime'),
        },
        {
            id: 4,
            title: t('jobs.physicalTherapist'),
            department: t('departments.physicalTherapy'),
            location: t('locations.bangkok'),
            type: t('types.partTime'),
        },
    ]

    return (
        <div className="nc-PageCareers relative">
            <div className="container relative space-y-16 py-16 lg:space-y-28 lg:py-28">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold sm:text-4xl">{t('heading')}</h2>
                    <span className="mt-2 block text-neutral-500 dark:text-neutral-400">
                        {t('subtitle')}
                    </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
                        >
                            <div className="mb-4">
                                <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-primary-900/30 dark:text-primary-300">
                                    {job.department}
                                </span>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">{job.title}</h3>
                            <div className="mb-6 flex flex-col gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                                <span>{job.location}</span>
                                <span>{job.type}</span>
                            </div>
                            <div className="mt-auto">
                                <ButtonPrimary href="#">{t('applyButton')}</ButtonPrimary>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PageCareers
