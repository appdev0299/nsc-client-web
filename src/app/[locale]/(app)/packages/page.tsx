'use client'

import { useState, useEffect } from 'react'
import Card7 from '@/components/PostCards/Card7'
import { TPost } from '@/data/posts'
import Input from '@/shared/Input'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useLocale } from 'next-intl'

interface Clinic {
    id: string
    name: string
}

const _placeholder_images = [
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2032&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop',
]

export default function PackagesPage() {
    const locale = useLocale()
    const [packages, setPackages] = useState<TPost[]>([])
    const [filteredPackages, setFilteredPackages] = useState<TPost[]>([])
    const [clinics, setClinics] = useState<Clinic[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedClinic, setSelectedClinic] = useState('all')
    const [isLoading, setIsLoading] = useState(true)

    // Fetch packages from API
    useEffect(() => {
        const fetchPackages = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(`http://localhost:3000/packages?lang=${locale}`)
                if (res.ok) {
                    const data = await res.json()

                    // Transform API data to TPost format
                    const transformedPackages: TPost[] = data.map((pkg: any, index: number) => ({
                        id: pkg.id,
                        title: pkg.name,
                        handle: pkg.id,
                        excerpt: pkg.description,
                        date: pkg.createdAt || new Date().toISOString(),
                        readingTime: 0,
                        commentCount: 0,
                        viewCount: 0,
                        bookmarkCount: 0,
                        bookmarked: false,
                        likeCount: 0,
                        liked: false,
                        postType: 'standard',
                        status: 'published',
                        featuredImage: {
                            src: _placeholder_images[index % _placeholder_images.length],
                            alt: pkg.name,
                            width: 1920,
                            height: 1080,
                        },
                        author: {
                            id: pkg.clinic?.id || 'clinic-1',
                            name: pkg.clinic?.name || (locale === 'th' ? 'คลินิกทั่วไป' : 'General Clinic'),
                            handle: pkg.clinic?.name?.toLowerCase().replace(/\s+/g, '-') || 'general-clinic',
                            avatar: {
                                src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
                                alt: 'Clinic',
                                width: 100,
                                height: 100,
                            },
                        },
                        categories: [
                            {
                                id: 'price',
                                name: `฿${parseInt(pkg.price).toLocaleString()}`,
                                handle: 'price',
                                color: 'green',
                            },
                        ],
                    }))

                    setPackages(transformedPackages)
                    setFilteredPackages(transformedPackages)

                    // Extract unique clinics
                    const uniqueClinics = Array.from(
                        new Map(
                            transformedPackages.map((pkg) => [pkg.author.id, { id: pkg.author.id, name: pkg.author.name }])
                        ).values()
                    )
                    setClinics(uniqueClinics)
                }
            } catch (error) {
                console.error('Error fetching packages:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPackages()
    }, [locale])

    // Apply filters whenever search or clinic filter changes
    useEffect(() => {
        let result = packages

        // Filter by search query
        if (searchQuery) {
            result = result.filter((pkg) =>
                pkg.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by clinic
        if (selectedClinic !== 'all') {
            result = result.filter((pkg) => pkg.author.id === selectedClinic)
        }

        setFilteredPackages(result)
    }, [searchQuery, selectedClinic, packages])

    return (
        <div className="container py-16 lg:py-24">
            {/* Header */}
            <header className="mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-neutral-900 md:text-5xl dark:text-neutral-100 tracking-tight">
                    {locale === 'th' ? 'แพ็กเกจสุขภาพทั้งหมด' : 'All Health Packages'}
                </h1>
                <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
                    {locale === 'th' ? 'พบกับแพ็กเกจตรวจสุขภาพที่ครอบคลุม ออกแบบมาเพื่อความเป็นอยู่ที่ดีของคุณ' : 'Discover comprehensive health packages designed for your well-being.'}
                </p>
            </header>

            {/* Search & Filter Controls */}
            <div className="mb-12 max-w-4xl mx-auto">
                <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                    {/* Search Input */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <Input
                            type="text"
                            placeholder={locale === 'th' ? 'ค้นหาแพ็กเกจตามชื่อ...' : 'Search packages by name...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-4 py-3 w-full rounded-2xl border-neutral-200 dark:border-neutral-700 focus:border-primary-600 dark:focus:border-primary-400"
                        />
                    </div>

                    {/* Clinic Filter Dropdown */}
                    <select
                        value={selectedClinic}
                        onChange={(e) => setSelectedClinic(e.target.value)}
                        className="px-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:border-primary-600 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-600/20 outline-none transition-colors cursor-pointer"
                    >
                        <option value="all">{locale === 'th' ? 'คลินิกทั้งหมด' : 'All Clinics'}</option>
                        {clinics.map((clinic) => (
                            <option key={clinic.id} value={clinic.id}>
                                {clinic.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Results Counter */}
                <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                    {locale === 'th' ? `แสดง ${filteredPackages.length} จาก ${packages.length} แพ็กเกจ` : `Showing ${filteredPackages.length} of ${packages.length} packages`}
                </div>
            </div>

            {/* Packages Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-neutral-500 dark:text-neutral-400">{locale === 'th' ? 'กำลังโหลดแพ็กเกจ...' : 'Loading packages...'}</div>
                </div>
            ) : filteredPackages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="text-neutral-500 dark:text-neutral-400 text-center">
                        <p className="text-lg font-medium mb-2">{locale === 'th' ? 'ไม่พบแพ็กเกจ' : 'No packages found'}</p>
                        <p className="text-sm">{locale === 'th' ? 'ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองของคุณ' : 'Try adjusting your search or filters'}</p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {filteredPackages.map((pkg) => (
                        <Card7 key={pkg.id} post={pkg} isPackage={true} />
                    ))}
                </div>
            )}
        </div>
    )
}
