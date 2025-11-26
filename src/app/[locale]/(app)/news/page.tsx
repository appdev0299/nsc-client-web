import SectionGridPosts from '@/components/SectionGridPosts'
import { getPostsFromApi } from '@/data/api'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'news' })

    return {
        title: t('title'),
        description: t('subtitle'),
    }
}

const PageNews = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params
    const posts = await getPostsFromApi(locale)
    const t = await getTranslations({ locale, namespace: 'news' })

    return (
        <div className="nc-PageNews relative">
            <div className="container relative space-y-16 py-16 lg:space-y-28 lg:py-28">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold sm:text-4xl">{t('title')}</h2>
                    <span className="mt-2 block text-neutral-500 dark:text-neutral-400">
                        {t('subtitle')}
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
