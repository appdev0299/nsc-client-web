'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import NcImage from '@/components/NcImage/NcImage'
import Card7 from '@/components/PostCards/Card7'
import { TPost } from '@/data/posts'
import { MapPinIcon, PhoneIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import SpecialistCard, { Specialist } from '@/components/SpecialistCard'
import clsx from 'clsx'

interface Clinic {
    id: string
    name: string
    description: string
    address: string
    phone: string
    email: string
    openingHours: string
    coverImage: string
    logo: string
    rating: number
    location: string
    tagline: string
}

export default function ClinicProfilePage() {
    const params = useParams()
    const clinicId = params.id as string

    const [clinic, setClinic] = useState<Clinic | null>(null)
    const [packages, setPackages] = useState<TPost[]>([])
    const [staff, setStaff] = useState<Specialist[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('about')

    useEffect(() => {
        const fetchClinicData = async () => {
            setIsLoading(true)
            try {
                // 1. Fetch Clinic Details
                // Try fetching specific clinic first
                let clinicData = null;
                try {
                    const clinicRes = await fetch(`http://localhost:3000/clinics/${clinicId}`)
                    if (clinicRes.ok) {
                        clinicData = await clinicRes.json()
                    }
                } catch (e) {
                    console.warn("Direct fetch failed, trying list fetch")
                }

                // If direct fetch failed, try fetching list and finding
                if (!clinicData) {
                    const allClinicsRes = await fetch('http://localhost:3000/clinics')
                    if (allClinicsRes.ok) {
                        const allClinics = await allClinicsRes.json()
                        clinicData = allClinics.find((c: any) => c.id === clinicId)
                    }
                }

                if (clinicData) {
                    setClinic({
                        id: clinicData.id,
                        name: clinicData.name,
                        description: clinicData.description || 'ยินดีต้อนรับสู่คลินิกของเรา',
                        address: clinicData.address || 'กรุงเทพมหานคร, ประเทศไทย',
                        phone: clinicData.phone || 'ติดต่อสอบถามข้อมูลเพิ่มเติม',
                        email: clinicData.email || 'contact@clinic.com',
                        openingHours: clinicData.openingHours || 'จันทร์ - ศุกร์: 09:00 - 17:00 น.',
                        coverImage: clinicData.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop',
                        logo: clinicData.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
                        rating: 4.8,
                        location: 'กรุงเทพมหานคร, ประเทศไทย',
                        tagline: 'ผู้ดูแลสุขภาพที่คุณไว้วางใจ',
                    })
                }

                // 2. Fetch Packages for this clinic
                const packagesRes = await fetch('http://localhost:3000/packages')
                if (packagesRes.ok) {
                    const allPackages = await packagesRes.json()
                    const clinicPackages = allPackages.filter((pkg: any) => pkg.clinic?.id === clinicId)

                    const transformedPackages: TPost[] = clinicPackages.map((pkg: any, index: number) => ({
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
                            src: pkg.image || `https://images.unsplash.com/photo-${1576091160399 + index}?q=80&w=2070&auto=format&fit=crop`,
                            alt: pkg.name,
                            width: 1920,
                            height: 1080,
                        },
                        author: {
                            id: pkg.clinic?.id || clinicId,
                            name: pkg.clinic?.name || 'Clinic',
                            handle: pkg.clinic?.name?.toLowerCase().replace(/\s+/g, '-') || 'clinic',
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
                }

                // 3. Fetch Staff for this clinic
                try {
                    const staffRes = await fetch(`http://localhost:3000/staff`)
                    if (staffRes.ok) {
                        const allStaff = await staffRes.json()
                        // Filter staff for this clinic
                        const clinicStaff = allStaff.filter((s: any) => s.clinicId === clinicId || s.clinic?.id === clinicId)

                        // Transform staff data
                        const transformedStaff: Specialist[] = clinicStaff.map((s: any) => ({
                            id: s.id,
                            name: s.name,
                            specialty: s.specialty || 'General Practitioner',
                            image: s.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
                            clinic: {
                                id: clinicId,
                                name: clinicData?.name || 'Clinic'
                            },
                            role: s.role || 'Doctor'
                        }))
                        setStaff(transformedStaff)
                    }
                } catch (e) {
                    console.warn("Failed to fetch staff", e)
                }

            } catch (error) {
                console.error('Error fetching clinic data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (clinicId) {
            fetchClinicData()
        }
    }, [clinicId])

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-neutral-500 dark:text-neutral-400">กำลังโหลดข้อมูลคลินิก...</div>
            </div>
        )
    }

    if (!clinic) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-neutral-500 dark:text-neutral-400">ไม่พบข้อมูลคลินิก</div>
            </div>
        )
    }

    return (
        <div className="clinic-profile">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden bg-neutral-900">
                <NcImage
                    containerClassName="absolute inset-0"
                    src={clinic.coverImage}
                    alt={clinic.name}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />

                {/* Clinic Info Overlay */}
                <div className="container absolute bottom-0 left-0 right-0 pb-8">
                    <div className="flex items-end gap-6">
                        {/* Clinic Logo */}
                        <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl">
                            <NcImage
                                containerClassName="absolute inset-0"
                                src={clinic.logo}
                                alt={clinic.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Clinic Name & Info */}
                        <div className="flex-1 pb-2 text-white">
                            <h1 className="mb-2 text-4xl font-bold tracking-tight">{clinic.name}</h1>
                            <p className="mb-3 text-lg text-neutral-200">{clinic.tagline}</p>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <StarIcon className="h-5 w-5 text-yellow-400" />
                                    <span className="font-semibold">{clinic.rating}</span>
                                    <span className="text-sm text-neutral-300">คะแนน</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-neutral-300">
                                    <MapPinIcon className="h-4 w-4" />
                                    {clinic.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container py-16">
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tabs */}
                        <div className="flex items-center gap-8 border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto">
                            {['about', 'packages', 'staff'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={clsx(
                                        'relative py-4 text-base font-medium transition-colors whitespace-nowrap',
                                        activeTab === tab
                                            ? 'text-primary-600 dark:text-primary-500'
                                            : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                                    )}
                                >
                                    {tab === 'about' && 'เกี่ยวกับเรา'}
                                    {tab === 'packages' && 'แพ็กเกจสุขภาพ'}
                                    {tab === 'staff' && 'บุคลากรทางการแพทย์'}
                                    {activeTab === tab && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-600 dark:bg-primary-500" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="mt-8">
                            {activeTab === 'about' && (
                                <section className="animate-fade-in">
                                    <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">เกี่ยวกับเรา</h2>
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                            {clinic.description}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {activeTab === 'packages' && (
                                <section className="animate-fade-in">
                                    <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                        แพ็กเกจสุขภาพของเรา
                                    </h2>
                                    {packages.length === 0 ? (
                                        <p className="text-neutral-500 dark:text-neutral-400">ไม่มีแพ็กเกจให้บริการในขณะนี้</p>
                                    ) : (
                                        <div className="grid gap-6 sm:grid-cols-2 xl:gap-8">
                                            {packages.map((pkg) => (
                                                <Card7 key={pkg.id} post={pkg} isPackage={true} />
                                            ))}
                                        </div>
                                    )}
                                </section>
                            )}

                            {activeTab === 'staff' && (
                                <section className="animate-fade-in">
                                    <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                        บุคลากรทางการแพทย์
                                    </h2>
                                    {staff.length === 0 ? (
                                        <p className="text-neutral-500 dark:text-neutral-400">ยังไม่มีข้อมูลบุคลากรในขณะนี้</p>
                                    ) : (
                                        <div className="grid gap-6 sm:grid-cols-2 xl:gap-8">
                                            {staff.map((member) => (
                                                <SpecialistCard key={member.id} specialist={member} />
                                            ))}
                                        </div>
                                    )}
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Info Card */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">ข้อมูลการติดต่อ</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPinIcon className="h-5 w-5 flex-shrink-0 text-primary-600" />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">ที่อยู่</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{clinic.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <PhoneIcon className="h-5 w-5 flex-shrink-0 text-primary-600" />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">เบอร์โทรศัพท์</p>
                                        <a href={`tel:${clinic.phone}`} className="text-sm text-primary-600 hover:underline">
                                            {clinic.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <EnvelopeIcon className="h-5 w-5 flex-shrink-0 text-primary-600" />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">อีเมล</p>
                                        <a href={`mailto:${clinic.email}`} className="text-sm text-primary-600 hover:underline">
                                            {clinic.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <ClockIcon className="h-5 w-5 flex-shrink-0 text-primary-600" />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">เวลาทำการ</p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{clinic.openingHours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Map Embed */}
                        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                            <h3 className="mb-3 text-lg font-bold text-neutral-900 dark:text-neutral-100">แผนที่</h3>
                            <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                                <iframe
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.address)}&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
