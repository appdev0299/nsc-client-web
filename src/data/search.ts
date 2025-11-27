import { getAuthors } from './authors'
import { getCategories, getTags } from './categories'
import { getAllPosts, TPost } from './posts'
import { getPostsFromApi, getClinicsFromApi, TClinic } from './api'
import { getPackages } from './packages'

export async function fetchGlobalSearchData(locale: string = 'th'): Promise<TPost[]> {
  const [posts, packages, clinics] = await Promise.all([
    getPostsFromApi(locale),
    getPackages(locale),
    getClinicsFromApi(locale)
  ])

  const postsWithHref = posts.map(post => ({
    ...post,
    href: `/post/${post.handle}`
  }))

  const packagesWithHref = packages.map(pkg => ({
    ...pkg,
    href: `/packages/${pkg.handle}` // Assuming handle is the ID or slug used in route
  }))

  const clinicPosts: TPost[] = clinics.map(clinic => ({
    id: clinic.id,
    title: clinic.name,
    handle: clinic.id,
    excerpt: clinic.description || '',
    date: new Date().toISOString(),
    readingTime: 0,
    commentCount: 0,
    viewCount: 0,
    bookmarkCount: 0,
    bookmarked: false,
    likeCount: 0,
    liked: false,
    postType: 'standard',
    status: 'published',
    href: `/clinics/${clinic.id}`,
    featuredImage: {
      src: clinic.coverImage || clinic.logo || '/images/placeholder.jpg',
      alt: clinic.name,
      width: 1920,
      height: 1080
    },
    author: {
      id: 'admin',
      name: 'Admin',
      handle: 'admin',
      avatar: {
        src: '/images/avatars/Image-1.png',
        alt: 'Admin',
        width: 100,
        height: 100
      }
    },
    categories: [{
      id: 'clinic',
      name: 'Clinic',
      handle: 'clinic',
      color: 'blue'
    }]
  }))

  return [...postsWithHref, ...packagesWithHref, ...clinicPosts]
}

export async function getSearchResults(query: string, type: 'posts' | 'categories' | 'tags' | 'authors', locale: string = 'th') {
  const recommendedSearches = locale === 'th'
    ? ['ตรวจสุขภาพ', 'วัคซีน', 'สุขภาพจิต', 'เบาหวาน', 'หัวใจ', 'ความดัน']
    : ['Checkup', 'Vaccine', 'Mental Health', 'Diabetes', 'Heart', 'Blood Pressure']

  switch (type) {
    case 'categories':
      return {
        query,
        categories: (await getCategories()).slice(0, 15).sort(() => Math.random() - 0.5),
        totalResults: 1500,
        recommendedSearches,
      }
    case 'tags':
      return {
        query,
        tags: (await getTags()).sort(() => Math.random() - 0.5),
        totalResults: 1000,
        recommendedSearches,
      }
    case 'authors':
      return {
        query,
        authors: (await getAuthors()).slice(0, 12).sort(() => Math.random() - 0.5),
        totalResults: 200,
        recommendedSearches,
      }
    default:
      const allItems = await fetchGlobalSearchData(locale)

      const filteredItems = allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(query.toLowerCase())
      )

      return {
        query,
        posts: filteredItems,
        totalResults: filteredItems.length,
        recommendedSearches,
      }
  }
}
