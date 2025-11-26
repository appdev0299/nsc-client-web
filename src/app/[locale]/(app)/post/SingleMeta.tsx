import LocalDate from '@/components/LocalDate'
import { TPost, TPostDetail } from '@/data/posts'
import Avatar from '@/shared/Avatar'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props extends Pick<TPost | TPostDetail, 'date' | 'author' | 'readingTime'> {
  className?: string
}

const SingleMeta: FC<Props> = ({ className, date, author, readingTime }) => {
  const isAdmin = author?.handle === 'admin'

  return (
    <div className={clsx('single-meta relative flex shrink-0 flex-wrap items-center text-sm', className)}>
      {!isAdmin && (
        <>
          <Avatar className={'size-10 sm:size-11'} src={author.avatar.src} width={44} height={44} sizes="44px" />
          <div className="ms-3">
            <p className="block font-semibold">{author.name}</p>
            <div className="mt-1.5 flex items-center gap-x-2 text-xs">
              <span>
                <LocalDate date={date} options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
              </span>
              <span>•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
          <Link href={`/author/${author.handle}`} className="absolute inset-0" />
        </>
      )}

      {isAdmin && (
        <div className="flex items-center gap-x-2 text-xs">
          <span>
            <LocalDate date={date} options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
          </span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
      )}
    </div>
  )
}

export default SingleMeta
