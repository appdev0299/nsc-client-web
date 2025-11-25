import BackgroundSection from '@/components/BackgroundSection'
import Card11 from '@/components/PostCards/Card11'
import SectionHero3 from '@/components/SectionHero3'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { getAllPosts } from '@/data/posts'
import { getPackages } from '@/data/packages'
import HeadingWithSub from '@/shared/Heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page of the application showcasing various sections and posts.',
}

const Page = async () => {
  const posts = await getAllPosts()
  const packages = await getPackages()

  return (
    <div className="relative container space-y-28 pb-28 lg:space-y-32 lg:pb-32">
      <SectionHero3 posts={posts.slice(0, 5)} />

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

      <div>
        <HeadingWithSub subHeading="Discover our latest health articles">Health Info</HeadingWithSub>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
          {posts.slice(0, 12).map((post) => (
            <Card11 key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
