import SectionGridPosts from '@/components/SectionGridPosts'
import { getPostsFromApi } from '@/data/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'News',
    description: 'Latest news and articles',
}

const PageNews = async () => {
    const posts = await getPostsFromApi()

    return (
        <div className="nc-PageNews relative">
            <div className="container relative space-y-16 py-16 lg:space-y-28 lg:py-28">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold sm:text-4xl">News & Articles</h2>
                    <span className="mt-2 block text-neutral-500 dark:text-neutral-400">
                        Stay updated with the latest health news and articles.
                    </span>
                </div>

                <SectionGridPosts
                    posts={posts}
                    postCardName="card11"
                    gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                />
            </div>
        </div>
    )
}

export default PageNews
