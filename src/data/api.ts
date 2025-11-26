import { TPost } from './posts'

function getValidImageUrl(url: string | undefined | null): string {
    const fallback = '/images/nurse-design.jpg';
    if (!url || typeof url !== 'string' || url.includes('example.com')) {
        return fallback;
    }
    return url;
}

interface RawPost {
    id?: string | number
    title?: string
    handle?: string
    slug?: string
    excerpt?: string
    description?: string
    date?: string
    createdAt?: string
    readingTime?: number
    commentCount?: number
    viewCount?: number
    bookmarkCount?: number
    likeCount?: number
    postType?: string
    content?: string
    featuredImage?: { src?: string; alt?: string; width?: number; height?: number }
    imageUrl?: string
    coverImage?: string
    author?: { id?: string; name?: string; handle?: string; avatar?: string | { src: string } }
    categories?: any[]
    tags?: any[]
    audioUrl?: string
    videoUrl?: string
    galleryImgs?: string[]
    cover?: { apiEndpoint: string }
}

export async function getPostsFromApi(locale: string = 'th'): Promise<TPost[]> {
    try {
        const res = await fetch(`http://localhost:3000/posts?lang=${locale}`, {
            cache: 'no-store',
            next: { tags: ['posts'] }
        })

        if (!res.ok) {
            console.error('Failed to fetch posts:', res.status, res.statusText)
            return []
        }

        const data = await res.json()

        let items: RawPost[] = []
        if (Array.isArray(data)) {
            items = data
        } else if (data && Array.isArray(data.data)) {
            items = data.data
        } else {
            console.error('Posts API response is not an array:', data)
            return []
        }

        // Map the API data to ensure it matches TPost structure
        return items.map((item) => ({
            id: item.id?.toString() || Math.random().toString(),
            title: item.title || 'Untitled Post',
            handle: item.handle || item.slug || 'untitled-post',
            excerpt: item.excerpt || item.description || '',
            date: item.date || item.createdAt || new Date().toISOString(),
            readingTime: item.readingTime || 5,
            commentCount: item.commentCount || 0,
            viewCount: item.viewCount || 0,
            bookmarkCount: item.bookmarkCount || 0,
            bookmarked: false,
            likeCount: item.likeCount || 0,
            liked: false,
            postType: (item.postType as TPost['postType']) || 'standard',
            status: 'published',
            content: item.content || '',
            featuredImage: {
                src: getValidImageUrl(item.featuredImage?.src || item.imageUrl),
                alt: item.featuredImage?.alt || item.title || 'Post Image',
                width: item.featuredImage?.width || 1920,
                height: item.featuredImage?.height || 1080
            },
            author: {
                id: item.author?.id || 'admin',
                name: item.author?.name || 'Admin',
                handle: item.author?.handle || 'admin',
                avatar: {
                    src: getValidImageUrl(typeof item.author?.avatar === 'string' ? item.author.avatar : item.author?.avatar?.src),
                    alt: item.author?.name || 'Admin',
                    width: 100,
                    height: 100
                }
            },
            categories: item.categories || [],
            tags: item.tags || [],
            audioUrl: item.audioUrl,
            videoUrl: item.videoUrl,
            galleryImgs: item.galleryImgs || [],
            cover: item.cover || undefined,
        }))
    } catch (error) {
        console.error('Error fetching posts from API:', error)
        return []
    }
}

export async function getCoverFromApi(slug?: string, locale: string = 'th'): Promise<TPost[]> {
    try {
        const url = slug
            ? `http://localhost:3000/cover?slug=${slug}&lang=${locale}`
            : `http://localhost:3000/cover?lang=${locale}`;

        const res = await fetch(url, {
            cache: 'no-store',
            next: { tags: ['cover'] }
        })

        if (!res.ok) {
            console.error('Failed to fetch cover:', res.status, res.statusText)
            return []
        }

        const data = await res.json()

        let items: RawPost[] = []
        if (Array.isArray(data)) {
            items = data
        } else if (data && Array.isArray(data.data)) {
            items = data.data
        } else if (data && typeof data === 'object' && data.id) {
            items = [data]
        } else if (data && typeof data === 'object' && data.url) {
            // Handle specific cover image object structure
            items = [{
                id: 'cover-api',
                title: data.alt || 'Cover',
                excerpt: data.caption || '',
                featuredImage: {
                    src: data.url,
                    alt: data.alt
                },
                cover: {
                    apiEndpoint: data.url
                }
            }]
        } else if (Object.keys(data).length === 0) {
            return []
        } else {
            console.error('Cover API response is not valid:', data)
            return []
        }

        return items.map((item) => ({
            id: item.id?.toString() || Math.random().toString(),
            title: item.title || 'Untitled Cover',
            handle: item.handle || item.slug || 'untitled-cover',
            excerpt: item.excerpt || item.description || '',
            date: item.date || item.createdAt || new Date().toISOString(),
            readingTime: item.readingTime || 0,
            commentCount: item.commentCount || 0,
            viewCount: item.viewCount || 0,
            bookmarkCount: item.bookmarkCount || 0,
            bookmarked: false,
            likeCount: item.likeCount || 0,
            liked: false,
            postType: (item.postType as TPost['postType']) || 'standard',
            status: 'published',
            content: item.content || '',
            featuredImage: {
                src: getValidImageUrl(item.featuredImage?.src || item.imageUrl || item.coverImage),
                alt: item.featuredImage?.alt || item.title || 'Cover Image',
                width: item.featuredImage?.width || 1920,
                height: item.featuredImage?.height || 1080
            },
            author: {
                id: item.author?.id || 'admin',
                name: item.author?.name || 'Admin',
                handle: item.author?.handle || 'admin',
                avatar: {
                    src: getValidImageUrl(typeof item.author?.avatar === 'string' ? item.author.avatar : item.author?.avatar?.src),
                    alt: item.author?.name || 'Admin',
                    width: 100,
                    height: 100
                }
            },
            categories: item.categories || [],
            tags: item.tags || [],
            audioUrl: item.audioUrl,
            videoUrl: item.videoUrl,
            galleryImgs: item.galleryImgs || [],
            cover: item.cover || undefined,
        }))
    } catch (error) {
        console.error('Error fetching cover from API:', error)
        return []
    }
}

export async function getPostByHandleFromApi(handle: string, locale: string = 'th'): Promise<TPost | null> {
    const posts = await getPostsFromApi(locale)
    return posts.find((post) => post.handle === handle) || null
}

export interface TClinic {
    id: string
    name: string
    description?: string
    address?: string
    phoneNumber?: string
    email?: string
    website?: string
    logo?: string
    coverImage?: string
    images?: string[]
}

export async function getClinicsFromApi(locale: string = 'th'): Promise<TClinic[]> {
    try {
        const res = await fetch(`http://localhost:3000/clinics?lang=${locale}`, {
            cache: 'no-store',
            next: { tags: ['clinics'] }
        })

        if (!res.ok) {
            console.error('Failed to fetch clinics:', res.status, res.statusText)
            return []
        }

        const data = await res.json()
        return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            address: item.address,
            phoneNumber: item.phoneNumber,
            email: item.email,
            website: item.website,
            logo: getValidImageUrl(item.logo),
            coverImage: getValidImageUrl(item.coverImage),
            images: item.images?.map((img: string) => getValidImageUrl(img)) || []
        }))
    } catch (error) {
        console.error('Error fetching clinics from API:', error)
        return []
    }
}
