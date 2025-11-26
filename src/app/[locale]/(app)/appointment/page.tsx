import React from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { useTranslations } from 'next-intl'

export default function AppointmentPage() {
    const t = useTranslations('appointment')

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">{t('title')}</h1>
            <p className="mt-4 text-xl text-neutral-500 dark:text-neutral-400">{t('comingSoon')}</p>
            <div className="mt-8">
                <ButtonPrimary href="/">{t('returnHome')}</ButtonPrimary>
            </div>
        </div>
    )
}
