import BackgroundSection from '@/components/BackgroundSection'
import SectionHeroAction from '@/components/SectionHeroAction'
import SectionSliderPosts from '@/components/SectionSliderPosts'
import { getPostsFromApi, getCoverFromApi } from '@/data/api'
import { getPackages } from '@/data/packages'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
    title: 'Home',
    description: 'Home page of the application showcasing various sections and posts.',
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'home' })

    const posts = await getPostsFromApi(locale)
    const coverPosts = await getCoverFromApi(undefined, locale)
    const packages = await getPackages(locale)

    const heroTranslations = {
        readMore: t('hero.readMore'),
        packages: t('hero.packages'),
        packagesDesc: t('hero.packagesDesc'),
        appointment: t('hero.appointment'),
        appointmentDesc: t('hero.appointmentDesc'),
        findSpecialist: t('hero.findSpecialist'),
        findSpecialistDesc: t('hero.findSpecialistDesc'),
    }

    return (
        <div className="relative container space-y-16 pb-16 lg:space-y-24 lg:pb-24">
            <SectionHeroAction posts={coverPosts} translations={heroTranslations} />

            <div className="relative py-8 lg:py-12">
                <BackgroundSection />
                <SectionSliderPosts
                    postCardName="card7"
                    heading={t('sections.ourPackages')}
                    subHeading={t('sections.ourPackagesSub')}
                    posts={packages}
                    isPackage={true}
                    viewAllHref="/packages"
                />
            </div>

            <div className="relative py-8 lg:py-12">

                <SectionSliderPosts
                    postCardName="card11"
                    heading={t('sections.healthKnowledge')}
                    subHeading={t('sections.healthKnowledgeSub')}
                    posts={posts.slice(0, 12)}
                    viewAllHref="/health-knowledge"
                    hiddenAuthor={true}
                />
            </div>
        </div>
    )
}

export default Page
