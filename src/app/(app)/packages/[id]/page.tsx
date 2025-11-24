import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PackageHeader from '../PackageHeader'
import PackageContent from '../PackageContent'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params

    try {
        const res = await fetch(`http://localhost:3000/packages/${id}`, { cache: 'no-store' })

        if (!res.ok) {
            return {
                title: 'Package not found',
                description: 'Package not found',
            }
        }

        const packageData = await res.json()

        return {
            title: `${packageData.name} - Health Package`,
            description: packageData.description,
        }
    } catch (error) {
        return {
            title: 'Package not found',
            description: 'Package not found',
        }
    }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    try {
        const res = await fetch(`http://localhost:3000/packages/${id}`, { cache: 'no-store' })

        if (!res.ok) {
            notFound()
        }

        const packageData = await res.json()

        return (
            <div className="package-detail-page">
                <PackageHeader packageData={packageData} />
            </div>
        )
    } catch (error) {
        notFound()
    }
}

export default Page
