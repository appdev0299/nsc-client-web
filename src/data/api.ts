import { TPost } from './posts'

function getValidImageUrl(url: string | undefined | null): string {
    const fallback = 'https://images.unsplash.com/photo-1628155179117-685ec76c25f4?q=80&w=1000&auto=format&fit=crop';
    if (!url || typeof url !== 'string' || url.includes('example.com')) {
        return fallback;
    }
    return url;
}

export async function getPostsFromApi(): Promise<TPost[]> {
    try {
        const res = await fetch('http://localhost:3000/posts', {
            cache: 'no-store',
            next: { tags: ['posts'] }
        })

        if (!res.ok) {
            console.error('Failed to fetch posts:', res.status, res.statusText)
            return []
        }

        const data = await res.json()

        // Map the API data to ensure it matches TPost structure
        // We assume the API returns an array of objects that are compatible or need slight mapping
        return data.map((item: any) => ({
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
            postType: item.postType || 'standard',
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
                    src: getValidImageUrl(item.author?.avatar?.src || item.author?.avatar),
                    alt: item.author?.name || 'Admin',
                    width: 100,
                    height: 100
                }
            },
            categories: item.categories || [],
            tags: item.tags || [],
            audioUrl: item.audioUrl,
            videoUrl: item.videoUrl,
            galleryImgs: item.galleryImgs,
        }))
    } catch (error) {
        console.error('Error fetching posts from API:', error)
        return []
    }
}

export async function getPostByHandleFromApi(handle: string): Promise<TPost | null> {
    const posts = await getPostsFromApi()
    return posts.find((post) => post.handle === handle) || null
}
