'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Input from '@/shared/Input'
import { HugeiconsIcon } from '@hugeicons/react'
import { Search01Icon, UserListIcon, StethoscopeIcon, Hospital01Icon, UserCircleIcon } from '@hugeicons/core-free-icons'
import SpecialistCard, { Specialist } from '@/components/SpecialistCard'
import ArchiveTabs from '@/components/ArchiveTabs'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

function SpecialistsContent() {
    const locale = useLocale()
    const t = useTranslations('specialists')
    const [specialists, setSpecialists] = useState<Specialist[]>([])
    const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>([])

    // Initial default tab based on locale
    const defaultTabs = [
        { name: t('allSpecialists'), value: 'all', icon: UserListIcon },
    ]

    const [tabs, setTabs] = useState(defaultTabs)
    const [isLoading, setIsLoading] = useState(true)

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const searchQuery = searchParams.get('s') || ''
    const activeTab = searchParams.get('tab') || 'all'

    // Fetch data
    useEffect(() => {
        const fetchSpecialists = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`http://localhost:3000/staff?lang=${locale}`)
                if (res.ok) {
                    const data = await res.json()
                    const mapped: Specialist[] = data.map((item: any) => ({
                        id: item.id || Math.random().toString(),
                        name: item.name || 'Unknown Name',
                        specialty: item.specialization || item.role || 'Specialist',
                        image: item.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070',
                        clinic: {
                            id: item.clinic?.id || 'clinic-1',
                            name: item.clinic?.name || t('generalClinic')
                        },
                        role: (item.role || item.specialization || '').toLowerCase()
                    }))
                    setSpecialists(mapped)

                    // Dynamic Tab Generation
                    const uniqueRoles = new Set<string>()
                    mapped.forEach(s => {
                        if (s.role) uniqueRoles.add(s.role)
                    })

                    const generatedTabs = [
                        { name: t('allSpecialists'), value: 'all', icon: UserListIcon }
                    ]

                    // Sort roles alphabetically for better UX
                    Array.from(uniqueRoles).sort().forEach(role => {
                        // Determine Icon
                        let icon = UserCircleIcon
                        if (role.includes('doctor') || role.includes('physician') || role.includes('dr')) icon = StethoscopeIcon
                        else if (role.includes('nurse')) icon = Hospital01Icon

                        // Capitalize Name
                        const name = role.charAt(0).toUpperCase() + role.slice(1)

                        // Add if not already present (though we started with unique set)
                        generatedTabs.push({
                            name: name,
                            value: role, // value matches the lowercase role from data
                            icon: icon
                        })
                    })

                    setTabs(generatedTabs)
                }
            } catch (error) {
                console.error('Failed to fetch specialists', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchSpecialists()
    }, [locale, t])

    // Filter logic
    useEffect(() => {
        let result = specialists

        // 1. Search Filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase()
            result = result.filter(s =>
                s.name.toLowerCase().includes(lowerQuery) ||
                s.clinic.name.toLowerCase().includes(lowerQuery) ||
                s.specialty.toLowerCase().includes(lowerQuery)
            )
        }

        // 2. Tab Filter (Generic)
        if (activeTab !== 'all') {
            result = result.filter(s => {
                const role = (s.role || '').toLowerCase()
                const specialty = s.specialty.toLowerCase()

                // Check if the role or specialty contains the active tab value
                // e.g. activeTab="doctor" matches role="doctor" or specialty="cardiologist doctor"
                return role.includes(activeTab) || specialty.includes(activeTab)
            })
        }

        setFilteredSpecialists(result)
    }, [searchQuery, activeTab, specialists])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        if (e.target.value) {
            params.set('s', e.target.value)
        } else {
            params.delete('s')
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="search-page">
            {/* HEADER */}
            <div className="start-0 top-0 right-0 h-24 w-full bg-primary-100/50 2xl:h-28 dark:bg-white/10" />
            <div className="container">
                <header className="mx-auto -mt-8 flex max-w-2xl flex-col">
                    <div className="relative">
                        <label htmlFor="s">
                            <span className="sr-only">Search</span>
                            <Input
                                id="s"
                                name="s"
                                type="search"
                                placeholder={t('searchPlaceholder')}
                                className="rounded-full shadow-lg"
                                sizeClass="ps-14 py-5 pe-5 md:ps-16"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <span className="absolute start-5 top-1/2 -translate-y-1/2 transform text-2xl md:start-6">
                                <HugeiconsIcon icon={Search01Icon} size={24} />
                            </span>
                        </label>
                    </div>
                    <p className="mt-4 block text-sm text-center text-neutral-500">
                        {t('foundCount', { count: filteredSpecialists.length })}
                    </p>
                </header>
            </div>

            <div className="container py-16 lg:pt-20">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <ArchiveTabs tabs={tabs} />
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredSpecialists.map(specialist => (
                            <SpecialistCard key={specialist.id} specialist={specialist} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function SpecialistsPage() {
    const locale = useLocale()
    return (
        <Suspense fallback={<div>{locale === 'th' ? 'กำลังโหลด...' : 'Loading...'}</div>}>
            <SpecialistsContent />
        </Suspense>
    )
}
