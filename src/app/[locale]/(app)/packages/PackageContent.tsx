'use client'

import { FC } from 'react'

interface PackageData {
    id: string
    name: string
    price: string
    description: string
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

const PackageContent: FC<Props> = ({ className, packageData }) => {
    const { description, clinic } = packageData

    return (
        <div className="container mt-12 pb-16 lg:pb-24">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Left Column: Details matching the Image column above */}
                <div className="prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                        Package Details
                    </h2>
                    <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                        {description}
                    </p>

                    <div className="mt-8 space-y-2 border-t border-neutral-200 pt-6 dark:border-neutral-700">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                            Service Benefits
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <svg
                                    className="size-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Professional healthcare service</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <svg
                                    className="size-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Experienced medical team</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <svg
                                    className="size-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>Flexible appointment scheduling</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Clinic Info (Optional placement, or can be empty) 
            Moving Clinic Info here to balance the layout if desired, 
            or keeping it with details. Let's put Clinic Info here to use the space.
        */}
                <div className="space-y-8">
                    {clinic && (
                        <div>
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                                Clinic Information
                            </h3>
                            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-800">
                                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                    {clinic.name}
                                </h4>
                                {clinic.address && (
                                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                        <span className="font-medium">Address:</span> {clinic.address}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PackageContent
