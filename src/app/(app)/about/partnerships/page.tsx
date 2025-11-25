import BackgroundSection from '@/components/BackgroundSection'
import NcImage from '@/components/NcImage/NcImage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ความร่วมมือ',
}

const partners = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    name: `Partner ${i + 1}`,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop',
}))

const PagePartnerships = () => {
    return (
        <div className="nc-PagePartnerships relative">
            <div className="container relative space-y-16 py-16 lg:space-y-28 lg:py-28">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold sm:text-4xl">พันธมิตรของเรา</h2>
                    <span className="mt-2 block text-neutral-500 dark:text-neutral-400">
                        เราร่วมมือกับองค์กรชั้นนำเพื่อให้บริการด้านสุขภาพที่ดีที่สุด
                    </span>
                </div>

                <div className="relative py-16 lg:py-20">
                    <BackgroundSection />
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {partners.map((item) => (
                            <div key={item.id} className="flex items-center justify-center p-6 bg-white rounded-3xl dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative w-full aspect-w-3 aspect-h-2">
                                    <NcImage
                                        containerClassName="absolute inset-0"
                                        src={item.logo}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PagePartnerships
