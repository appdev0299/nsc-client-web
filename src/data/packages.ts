import { TPost } from './posts'

const _placeholder_images = [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2032&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop',
]

export async function getPackages(): Promise<TPost[]> {
    try {
        const res = await fetch('http://localhost:3000/packages', { cache: 'no-store' })

        if (!res.ok) {
            throw new Error('Failed to fetch packages')
        }

        const data = await res.json()

        return data.map((pkg: any, index: number) => ({
            id: pkg.id,
            title: pkg.name,
            handle: pkg.id,
            excerpt: pkg.description,
            date: pkg.createdAt || new Date().toISOString(),
            readingTime: 0,
            commentCount: 0,
            viewCount: 0,
            bookmarkCount: 0,
            bookmarked: false,
            likeCount: 0,
            liked: false,
            postType: 'standard',
            status: 'published',
            featuredImage: {
                src: _placeholder_images[index % _placeholder_images.length],
                alt: pkg.name,
                width: 1920,
                height: 1080,
            },
            author: {
                id: pkg.clinic?.id || 'clinic-1',
                name: pkg.clinic?.name || 'General Clinic',
                handle: 'general-clinic',
                avatar: {
                    src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
                    alt: 'Clinic',
                    width: 100,
                    height: 100,
                },
            },
            categories: [
                {
                    id: 'price',
                    name: `฿${parseInt(pkg.price).toLocaleString()}`,
                    handle: 'price',
                    color: 'green',
                },
            ],
        }))
    } catch (error) {
        console.error('Error fetching packages:', error)
        throw error
    }
}
