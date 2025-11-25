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
        <div className="relative container space-y-28 pb-28 lg:space-y-32 lg:pb-32">
            <SectionHeroAction posts={posts.slice(0, 5)} />

            <div className="relative py-16 lg:py-20">
                <BackgroundSection />
                <SectionSliderPosts
                    postCardName="card7"
                    heading="Explore our packages"
                    subHeading="Discover our comprehensive health packages"
                    posts={packages}
                    isPackage={true}
                    viewAllHref="/packages"
                />
            </div>

            <div className="relative py-16 lg:py-20">
                <BackgroundSection />
                <SectionSliderPosts
                    postCardName="card11"
                    heading="Health Info"
                    subHeading="Discover our latest health articles"
                    posts={posts.slice(0, 12)}
                    viewAllHref="/health-knowledge"
                />
            </div>
        </div>
    )
}

export default Page
