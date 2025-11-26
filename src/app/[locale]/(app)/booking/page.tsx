'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import { Label, Field, Fieldset, Legend } from '@/shared/fieldset'
import { Radio, RadioGroup } from '@/shared/radio'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { DayPicker } from 'react-day-picker'
import "react-day-picker/style.css"
import '@/styles/datepicker-custom.css'
import BookingBottomBar from './BookingBottomBar'
import { useTranslations } from 'next-intl'

// Mock Data for Step 1 (Fallback)
const MOCK_PACKAGES = [
    {
        id: '1',
        name: 'โปรแกรมตรวจสุขภาพประจำปี VIP',
        price: 9500,
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
        description: 'ตรวจละเอียด 35 รายการ พร้อมอัลตราซาวด์ช่องท้องทั้งหมด',
    },
    {
        id: '2',
        name: 'โปรแกรมตรวจสุขภาพหัวใจ',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
        description: 'ตรวจคลื่นไฟฟ้าหัวใจ EKG และ Echo หัวใจ',
    },
    {
        id: '3',
        name: 'โปรแกรมคัดกรองมะเร็ง',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2032&auto=format&fit=crop',
        description: 'ตรวจหามะเร็งตับ มะเร็งลำไส้ และมะเร็งต่อมลูกหมาก',
    },
]

const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
]

// Placeholder images for fetched packages
const _placeholder_images = [
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2032&auto=format&fit=crop',
]

function BookingContent() {
    const t = useTranslations('booking')
    const searchParams = useSearchParams()
    const packageId = searchParams.get('packageId')

    const [currentStep, setCurrentStep] = useState(1)
    const [isLoadingPackage, setIsLoadingPackage] = useState(false)

    // Centralized State
    const [bookingData, setBookingData] = useState({
        selectedPackage: null as any,
        selectedDate: new Date() as Date | null,
        selectedTime: '',
        userInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            note: '',
        },
        paymentMethod: 'qr_code'
    })

    const updateBookingData = (data: Partial<typeof bookingData>) => {
        setBookingData(prev => ({ ...prev, ...data }))
    }

    // State for packages
    const [packages, setPackages] = useState<any[]>([])

    // Fetch packages on mount
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await fetch('http://localhost:3000/packages')
                if (res.ok) {
                    const data = await res.json()
                    const mappedPackages = data.map((pkg: any, index: number) => ({
                        id: pkg.id,
                        name: pkg.name,
                        price: parseInt(pkg.price),
                        description: pkg.description,
                        image: pkg.imageUrl || _placeholder_images[index % _placeholder_images.length]
                    }))
                    setPackages(mappedPackages)
                }
            } catch (error) {
                console.error('Failed to fetch packages', error)
            }
        }
        fetchPackages()
    }, [])

    // Fetch package details if packageId is present
    useEffect(() => {
        const fetchPackage = async () => {
            if (!packageId) return

            setIsLoadingPackage(true)
            try {
                // Try to find in loaded packages first
                const existingPkg = packages.find(p => p.id === packageId)
                if (existingPkg) {
                    updateBookingData({ selectedPackage: existingPkg })
                    setCurrentStep(2)
                    setIsLoadingPackage(false)
                    return
                }

                // If not loaded yet or not found, fetch specific
                const res = await fetch(`http://localhost:3000/packages/${packageId}`)
                if (res.ok) {
                    const data = await res.json()
                    // Map API data to component format
                    const imageIndex = parseInt(data.id) % _placeholder_images.length || 0
                    const pkg = {
                        id: data.id,
                        name: data.name,
                        price: parseInt(data.price),
                        description: data.description,
                        image: data.imageUrl || _placeholder_images[imageIndex]
                    }
                    updateBookingData({ selectedPackage: pkg })
                    setCurrentStep(2)
                } else {
                    console.error('Failed to fetch package')
                }
            } catch (error) {
                console.error('Error fetching package:', error)
            } finally {
                setIsLoadingPackage(false)
            }
        }

        fetchPackage()
    }, [packageId, packages])

    const handleNext = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1)
    }

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const renderStepIndicator = () => {
        const steps = [
            t('steps.selectPackage'),
            t('steps.dateTime'),
            t('steps.information'),
            t('steps.payment'),
            t('steps.completion'),
        ]

        return (
            <div className="mb-12">
                <div className="mx-auto max-w-3xl relative">
                    <div className="flex items-center justify-between relative z-10">
                        {steps.map((step, index) => {
                            const stepNumber = index + 1
                            const isActive = stepNumber === currentStep
                            const isCompleted = stepNumber < currentStep

                            return (
                                <div key={index} className="flex flex-col items-center bg-white dark:bg-neutral-900 px-2">
                                    <div
                                        className={clsx(
                                            'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300',
                                            isActive
                                                ? 'border-primary-600 bg-primary-600 text-white'
                                                : isCompleted
                                                    ? 'border-green-500 bg-green-500 text-white'
                                                    : 'border-neutral-300 bg-white text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900'
                                        )}
                                    >
                                        {isCompleted ? (
                                            <CheckCircleIcon className="h-6 w-6" />
                                        ) : (
                                            stepNumber
                                        )}
                                    </div>
                                    <span
                                        className={clsx(
                                            'mt-2 text-[10px] sm:text-sm font-medium text-center leading-tight',
                                            isActive ? 'text-primary-600' : isCompleted ? 'text-green-500' : 'text-neutral-500'
                                        )}
                                    >
                                        {step}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Progress Bar Background */}
                    <div className="absolute top-5 left-0 h-[2px] w-full -translate-y-1/2 bg-neutral-200 dark:bg-neutral-700 -z-0 hidden sm:block" />

                    {/* Active Progress Bar */}
                    <div
                        className="absolute top-5 left-0 h-[2px] -translate-y-1/2 bg-green-500 transition-all duration-300 -z-0 hidden sm:block"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    />
                </div>
            </div>
        )
    }

    // --- Step 1: Select Package ---
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = ['All', 'Check-up', 'Heart', 'Cancer', 'Other']

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'All' ||
            (selectedCategory === 'Check-up' && pkg.name.includes('ตรวจสุขภาพ')) ||
            (selectedCategory === 'Heart' && pkg.name.includes('หัวใจ')) ||
            (selectedCategory === 'Cancer' && pkg.name.includes('มะเร็ง')) ||
            (selectedCategory === 'Other' && !pkg.name.includes('ตรวจสุขภาพ') && !pkg.name.includes('หัวใจ') && !pkg.name.includes('มะเร็ง'))

        return matchesSearch && matchesCategory
    })

    const renderStep1 = () => (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{t('step1.title')}</h2>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <Input
                        placeholder={t('step1.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64"
                    />
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={clsx(
                                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                                    selectedCategory === cat
                                        ? "bg-primary-600 text-white"
                                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPackages.length > 0 ? (
                    filteredPackages.map((pkg) => (
                        <div
                            key={pkg.id}
                            onClick={() => updateBookingData({ selectedPackage: pkg })}
                            className={clsx(
                                'cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-lg',
                                bookingData.selectedPackage?.id === pkg.id
                                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/10'
                                    : 'border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                            )}
                        >
                            <div className="relative aspect-video w-full">
                                <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{pkg.name}</h3>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">{pkg.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-bold text-primary-600">฿{pkg.price.toLocaleString()}</span>
                                    <div className={clsx(
                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center",
                                        bookingData.selectedPackage?.id === pkg.id ? "border-primary-600" : "border-neutral-300"
                                    )}>
                                        {bookingData.selectedPackage?.id === pkg.id && <div className="h-3 w-3 rounded-full bg-primary-600" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-neutral-500">
                        {t('step1.noPackages')}
                    </div>
                )}
            </div>
        </div>
    )

    // --- Step 2: Date & Time ---
    const renderStep2 = () => (
        <div className="space-y-12 animate-fade-in-up">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{t('step2.title')}</h2>
                <p className="text-neutral-500 dark:text-neutral-400">{t('step2.subtitle')}</p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 items-start">
                {/* Date Selection */}
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl shadow-neutral-200/50 dark:bg-neutral-900 dark:shadow-none border border-neutral-100 dark:border-neutral-800">
                        <div className="w-full flex justify-center custom-datepicker-wrapper">
                            <DayPicker
                                mode="single"
                                selected={bookingData.selectedDate || undefined}
                                onSelect={(date) => updateBookingData({ selectedDate: date || null })}
                                required
                                disabled={{ before: new Date() }}
                                className="border-0"
                            />
                        </div>
                    </div>
                </div>

                {/* Time Selection */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{t('step2.availableSlots')}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {TIME_SLOTS.map((time) => (
                            <button
                                key={time}
                                onClick={() => updateBookingData({ selectedTime: time })}
                                className={clsx(
                                    'rounded-xl py-3 text-sm font-medium transition-all duration-200 shadow-sm border',
                                    bookingData.selectedTime === time
                                        ? 'border-primary-600 bg-primary-600 text-white shadow-primary-600/30 shadow-md transform scale-105'
                                        : 'border-transparent bg-white text-neutral-600 hover:bg-neutral-50 hover:shadow-md dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                                )}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    // --- Step 3: Basic Information ---
    const renderStep3 = () => (
        <div className="mx-auto max-w-2xl space-y-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{t('step3.title')}</h2>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <Field>
                        <Label>{t('step3.firstName')}</Label>
                        <Input
                            placeholder={t('step3.placeholders.firstName')}
                            value={bookingData.userInfo.firstName}
                            onChange={(e) => updateBookingData({ userInfo: { ...bookingData.userInfo, firstName: e.target.value } })}
                        />
                    </Field>
                    <Field>
                        <Label>{t('step3.lastName')}</Label>
                        <Input
                            placeholder={t('step3.placeholders.lastName')}
                            value={bookingData.userInfo.lastName}
                            onChange={(e) => updateBookingData({ userInfo: { ...bookingData.userInfo, lastName: e.target.value } })}
                        />
                    </Field>
                </div>

                <Field>
                    <Label>{t('step3.email')}</Label>
                    <Input
                        type="email"
                        placeholder={t('step3.placeholders.email')}
                        value={bookingData.userInfo.email}
                        onChange={(e) => updateBookingData({ userInfo: { ...bookingData.userInfo, email: e.target.value } })}
                    />
                </Field>

                <Field>
                    <Label>{t('step3.phone')}</Label>
                    <Input
                        type="tel"
                        placeholder={t('step3.placeholders.phone')}
                        value={bookingData.userInfo.phone}
                        onChange={(e) => updateBookingData({ userInfo: { ...bookingData.userInfo, phone: e.target.value } })}
                    />
                </Field>

                <Field>
                    <Label>{t('step3.note')}</Label>
                    <Input
                        placeholder={t('step3.placeholders.note')}
                        value={bookingData.userInfo.note}
                        onChange={(e) => updateBookingData({ userInfo: { ...bookingData.userInfo, note: e.target.value } })}
                    />
                </Field>
            </div>
        </div>
    )

    // --- Step 4: Payment ---
    const renderStep4 = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{t('step4.title')}</h2>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
                <RadioGroup
                    value={bookingData.paymentMethod}
                    onChange={(val) => updateBookingData({ paymentMethod: val })}
                    className="space-y-4"
                >
                    <Field className="flex items-start sm:items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                        <Radio value="qr_code" color="indigo" />
                        <div className="flex-1">
                            <Label className="cursor-pointer">{t('step4.qrCode')}</Label>
                            <p className="text-sm text-neutral-500">{t('step4.qrCodeDesc')}</p>
                        </div>
                    </Field>
                    <Field className="flex items-start sm:items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                        <Radio value="credit_card" color="indigo" />
                        <div className="flex-1">
                            <Label className="cursor-pointer">{t('step4.creditCard')}</Label>
                            <p className="text-sm text-neutral-500">{t('step4.creditCardDesc')}</p>
                        </div>
                        <div className="flex gap-2">
                            {/* Mock Card Icons */}
                            <div className="h-6 w-10 bg-neutral-200 rounded"></div>
                            <div className="h-6 w-10 bg-neutral-200 rounded"></div>
                        </div>
                    </Field>
                    <Field className="flex items-start sm:items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                        <Radio value="bank_transfer" color="indigo" />
                        <div className="flex-1">
                            <Label className="cursor-pointer">{t('step4.bankTransfer')}</Label>
                            <p className="text-sm text-neutral-500">{t('step4.bankTransferDesc')}</p>
                        </div>
                    </Field>
                </RadioGroup>
            </div>
        </div>
    )

    // --- Step 5: Completion ---
    const renderStep5 = () => (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                <CheckCircleIcon className="h-12 w-12" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">{t('step5.success')}</h2>
            <p className="mb-8 max-w-md text-neutral-600 dark:text-neutral-400">
                {t.rich('step5.thankYou', {
                    email: bookingData.userInfo.email,
                    strong: (chunks) => <strong>{chunks}</strong>
                })}
            </p>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm dark:border-neutral-700 dark:bg-neutral-900 w-full max-w-md mb-8">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">{t('step5.detailsTitle')}</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-neutral-500">{t('step5.package')}</span>
                        <span className="font-medium text-right">{bookingData.selectedPackage?.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-500">{t('step5.dateTime')}</span>
                        <span className="font-medium">
                            {bookingData.selectedDate ? bookingData.selectedDate.toLocaleDateString('th-TH') : '-'} at {bookingData.selectedTime}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-500">{t('step5.customer')}</span>
                        <span className="font-medium">{bookingData.userInfo.firstName} {bookingData.userInfo.lastName}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t font-bold text-lg">
                        <span>{t('step5.totalPaid')}</span>
                        <span className="text-primary-600">฿{bookingData.selectedPackage?.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <ButtonPrimary href="/">{t('step5.backHome')}</ButtonPrimary>
        </div>
    )

    if (isLoadingPackage) {
        return <div className="flex h-screen items-center justify-center">{t('loading')}</div>
    }

    return (
        <div className="container py-10 lg:py-24 pb-32">
            <header className="mb-8 lg:mb-16 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-neutral-900 md:text-5xl dark:text-neutral-100 tracking-tight">
                    {t('title')}
                </h1>
                <p className="mt-4 text-base md:text-lg text-neutral-500 dark:text-neutral-400">
                    {t('subtitle')}
                </p>
            </header>

            {renderStepIndicator()}

            <div className="mx-auto max-w-4xl">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}
            </div>

            <BookingBottomBar
                bookingData={bookingData}
                currentStep={currentStep}
                onNext={handleNext}
                onBack={handleBack}
                isNextDisabled={
                    (currentStep === 1 && !bookingData.selectedPackage) ||
                    (currentStep === 2 && (!bookingData.selectedDate || !bookingData.selectedTime)) ||
                    (currentStep === 3 && (!bookingData.userInfo.firstName || !bookingData.userInfo.email || !bookingData.userInfo.phone))
                }
            />
        </div>
    )
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingContent />
        </Suspense>
    )
}
