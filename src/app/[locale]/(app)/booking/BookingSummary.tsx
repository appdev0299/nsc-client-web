import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

interface BookingData {
    selectedPackage: {
        id: string
        name: string
        price: number
        image: string
        description: string
    } | null
    selectedDate: Date | null
    selectedTime: string
    userInfo: {
        firstName: string
        lastName: string
        email: string
        phone: string
        note: string
    }
    paymentMethod: string
}

interface Props {
    bookingData: BookingData
    className?: string
}

const BookingSummary: React.FC<Props> = ({ bookingData, className = '' }) => {
    const { selectedPackage, selectedDate, selectedTime } = bookingData

    const totalPrice = selectedPackage ? selectedPackage.price : 0

    return (
        <div className={clsx('rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-800', className)}>
            <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Booking Summary</h3>

            {/* Package Details */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">Selected Package</h4>
                {selectedPackage ? (
                    <div className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-200">
                            <Image src={selectedPackage.image} alt={selectedPackage.name} fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">{selectedPackage.name}</p>
                            <p className="text-sm font-semibold text-primary-600 mt-1">฿{selectedPackage.price.toLocaleString()}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-neutral-400 italic">Select a package to continue</p>
                )}
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-700 my-4"></div>

            {/* Date & Time */}
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Date</span>
                    <span className={clsx('font-medium', selectedDate ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400 italic')}>
                        {selectedDate ? selectedDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Pending...'}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-neutral-500 dark:text-neutral-400">Time</span>
                    <span className={clsx('font-medium', selectedTime ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400 italic')}>
                        {selectedTime || 'Pending...'}
                    </span>
                </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-700 my-4"></div>

            {/* Total */}
            <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Total</span>
                <span className="text-xl font-bold text-primary-600">฿{totalPrice.toLocaleString()}</span>
            </div>
        </div>
    )
}

export default BookingSummary
