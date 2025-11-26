import { getCommentsByPostId } from '@/data/posts'
import { getPostByHandleFromApi } from '@/data/api'
import { Metadata } from 'next'
import SingleContentContainer from '../SingleContentContainer'
import SingleHeaderContainer from '../SingleHeaderContainer'

export async function generateMetadata({ params }: { params: Promise<{ handle: string, locale: string }> }): Promise<Metadata> {
  const { handle, locale } = await params
  const post = await getPostByHandleFromApi(handle, locale)
  if (!post) {
    return {
      title: 'Post not found',
      description: 'Post not found',
    }
  }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

const Page = async ({ params }: { params: Promise<{ handle: string, locale: string }> }) => {
  const { handle, locale } = await params
  const post = await getPostByHandleFromApi(handle, locale)
  if (!post) {
    return <div>Post not found</div>
  }
  const comments = await getCommentsByPostId(post.id)


  return (
    <>
      <div className="single-post-page">
        <SingleHeaderContainer post={post} />

        <div className="container mt-12">
          <div className="mx-auto max-w-4xl">
            <SingleContentContainer post={post} comments={comments} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
