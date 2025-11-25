import ArchiveSortByListBox from '@/components/ArchiveSortByListBox'
import ArchiveTabs from '@/components/ArchiveTabs'
import Card11 from '@/components/PostCards/Card11'
import PaginationWrapper from '@/components/PaginationWrapper'
import { getPostsFromApi } from '@/data/api'
import Input from '@/shared/Input'
import { Folder02Icon, LicenseIcon, Search01Icon, Tag02Icon, UserListIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ความรู้ด้านสุขภาพ',
    description: 'พบกับบทความสุขภาพล่าสุดของเรา',
}

const filterTabs = [
    {
        name: 'บทความ',
        value: 'posts',
        icon: LicenseIcon,
    },
    { name: 'หมวดหมู่', value: 'categories', icon: Folder02Icon },
    { name: 'แท็ก', value: 'tags', icon: Tag02Icon },
    { name: 'ผู้เขียน', value: 'authors', icon: UserListIcon },
]

const sortByOptions = [
    { name: 'ล่าสุด', value: 'most-recent' },
    { name: 'คัดสรรโดยแอดมิน', value: 'curated-by-admin' },
    { name: 'ได้รับความนิยมสูงสุด', value: 'most-appreciated' },
    { name: 'มีการพูดถึงมากที่สุด', value: 'most-discussed' },
    { name: 'เข้าชมมากที่สุด', value: 'most-viewed' },
    { name: 'ถูกใจมากที่สุด', value: 'most-liked' },
]

const Page = async () => {
    const posts = await getPostsFromApi()

    return (
        <div className="health-knowledge-page">
            {/* HEADER */}
            <div className="start-0 top-0 right-0 h-24 w-full bg-primary-100/50 2xl:h-28 dark:bg-white/10" />
            <div className="container">
                <header className="mx-auto -mt-8 flex max-w-2xl flex-col">
                    <form className="relative">
                        <label htmlFor="s">
                            <span className="sr-only">Search</span>
                            <Input
                                id="s"
                                name="s"
                                type="search"
                                placeholder="ค้นหาบทความสุขภาพ..."
                                className="rounded-full shadow-lg"
                                sizeClass="ps-14 py-5 pe-5 md:ps-16"
                            />
                            <span className="absolute start-5 top-1/2 -translate-y-1/2 transform text-2xl md:start-6">
                                <HugeiconsIcon icon={Search01Icon} size={24} />
                            </span>
                        </label>
                    </form>
                    <p className="mt-4 block text-center text-sm text-neutral-500 dark:text-neutral-400">
                        สำรวจคลังความรู้ด้านสุขภาพที่ครอบคลุมของเรา
                    </p>
                </header>
            </div>

            <div className="container py-16 lg:pt-20">
                <div className="flex flex-wrap items-center gap-4">
                    <ArchiveTabs tabs={filterTabs} />
                    <ArchiveSortByListBox className="ms-auto shrink-0" filterOptions={sortByOptions} />
                </div>

                {/* LOOP ITEMS */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4">
                    {posts.map((post) => (
                        <Card11 key={post.id} post={post} />
                    ))}
                </div>

                {/* PAGINATIONS */}
                <PaginationWrapper className="mt-20" />
            </div>
        </div>
    )
}

export default Page
