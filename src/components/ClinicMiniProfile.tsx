import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface Props {
    clinicId: string
    clinicName: string
    clinicAvatar?: string
    location?: string
    className?: string
    isPackage?: boolean
}

const ClinicMiniProfile: FC<Props> = ({
    clinicId,
    clinicName,
    clinicAvatar,
    location = 'Bangkok, Thailand',
    className,
    isPackage = false
}) => {
    // Only make it clickable for packages
    const href = isPackage ? `/clinics/${clinicId}` : `/author/${clinicId}`

    return (
        <Link
            href={href}
            className={clsx(
                'group relative flex items-center gap-3 transition-all',
                className
            )}
        >
            {/* Clinic Avatar/Logo */}
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-neutral-100 bg-white transition-all group-hover:border-primary-600 dark:border-neutral-700 dark:bg-neutral-800">
                {clinicAvatar ? (
                    <Image
                        src={clinicAvatar}
                        alt={clinicName}
                        fill
                        className="object-cover"
                        sizes="40px"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary-50 text-xs font-bold text-primary-600 dark:bg-primary-900/20">
                        {clinicName.substring(0, 2).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Clinic Info */}
            <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold text-neutral-900 transition-colors group-hover:text-primary-600 dark:text-neutral-100 dark:group-hover:text-primary-400">
                    {clinicName}
                </p>
                <p className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <MapPinIcon className="h-3 w-3" />
                    <span className="truncate">{location}</span>
                </p>
            </div>
        </Link>
    )
}

export default ClinicMiniProfile
