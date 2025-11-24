import React, { FC } from 'react'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import clsx from 'clsx'

export interface Specialist {
    id: string
    name: string
    specialty: string
    image: string
    clinic: {
        id: string
        name: string
    }
    role?: string
}

interface Props {
    className?: string
    specialist: Specialist
}

const SpecialistCard: FC<Props> = ({ className, specialist }) => {
    const { name, specialty, image, clinic } = specialist

    return (
        <div className={clsx('group relative flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-xl dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700', className)}>
            <Avatar
                src={image}
                alt={name}
                square
                className="h-24 w-24 ring-2 ring-white dark:ring-neutral-900 shadow-md"
            />

            <div className="mt-5 space-y-1">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{name}</h3>
                <p className="text-sm text-primary-600 font-medium uppercase tracking-wider">{specialty}</p>
            </div>

            <div className="mt-3 mb-8">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                    <span>at</span>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">{clinic.name}</span>
                </p>
            </div>

            <div className="mt-auto w-full">
                <ButtonPrimary
                    href={`/specialists/${specialist.id}`}
                    className="w-full py-3 text-sm font-medium shadow-lg shadow-primary-600/20"
                >
                    View Profile
                </ButtonPrimary>
            </div>
        </div>
    )
}

export default SpecialistCard
