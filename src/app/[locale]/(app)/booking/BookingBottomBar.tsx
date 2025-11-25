import React from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'

interface Props {
    bookingData: any
    currentStep: number
    onNext: () => void
    onBack: () => void
    isNextDisabled: boolean
}

const BookingBottomBar: React.FC<Props> = ({ bookingData, currentStep, onNext, onBack, isNextDisabled }) => {
    const { selectedPackage, selectedDate, selectedTime } = bookingData
    const totalPrice = selectedPackage ? selectedPackage.price : 0

    if (currentStep === 5) return null // Hide on success page

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/90 px-4 py-4 backdrop-blur-md transition-all dark:border-neutral-700 dark:bg-neutral-900/90 md:px-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                {/* Summary Info (Desktop) */}
                <div className="hidden flex-col md:flex">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">Total Estimate</span>
                    <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-primary-600">฿{totalPrice.toLocaleString()}</span>
                        {selectedPackage && (
                            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 border-l border-neutral-300 pl-3 dark:border-neutral-600">
                                {selectedPackage.name}
                            </span>
                        )}
                    </div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                        {selectedDate ? selectedDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select Date'}
                        {selectedTime && ` • ${selectedTime}`}
                    </div>
                </div>

                {/* Summary Info (Mobile) */}
                <div className="flex flex-col md:hidden">
                    <span className="text-lg font-bold text-primary-600">฿{totalPrice.toLocaleString()}</span>
                    <span className="text-xs text-neutral-500 line-clamp-1 max-w-[150px]">{selectedPackage?.name || 'Select Package'}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <ButtonSecondary
                        onClick={onBack}
                        className={`px-4 py-2 sm:px-6 ${currentStep === 1 ? 'hidden' : ''}`}
                    >
                        Back
                    </ButtonSecondary>
                    <ButtonPrimary
                        onClick={onNext}
                        disabled={isNextDisabled}
                        className="px-6 py-2 sm:px-8 shadow-lg shadow-primary-600/30"
                    >
                        {currentStep === 4 ? 'Confirm Payment' : 'Next Step'}
                    </ButtonPrimary>
                </div>
            </div>
        </div>
    )
}

export default BookingBottomBar
