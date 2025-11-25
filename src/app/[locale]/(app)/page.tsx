import BackgroundSection from '@/components/BackgroundSection'
import SectionHeroAction from '@/components/SectionHeroAction'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { getPostsFromApi } from '@/data/api'
import { getPackages } from '@/data/packages'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Home',
    description: 'Home page of the application showcasing various sections and posts.',
}

const Page = async () => {
    const posts = await getPostsFromApi()
    const packages = await getPackages()

    return (
        <div className="relative container space-y-16 pb-16 lg:space-y-24 lg:pb-24">
            <SectionHeroAction posts={posts.slice(0, 5)} />

            <div className="relative py-8 lg:py-12">
                <BackgroundSection />
                <SectionSliderPosts
                    postCardName="card7"
                    heading="แพ็กเกจสุขภาพของเรา"
                    subHeading="พบกับแพ็กเกจสุขภาพที่ครอบคลุมทุกความต้องการของคุณ"
                    posts={packages}
                    isPackage={true}
                    viewAllHref="/packages"
                />
            </div>

            <div className="relative py-8 lg:py-12">

                <SectionSliderPosts
                    postCardName="card11"
                    heading="สาระน่ารู้ด้านสุขภาพ"
                    subHeading="บทความสุขภาพล่าสุดที่คุณไม่ควรพลาด"
                    posts={posts.slice(0, 12)}
                    viewAllHref="/health-knowledge"
                    hiddenAuthor={true}
                />
            </div>
        </div>
    )
}

export default Page
