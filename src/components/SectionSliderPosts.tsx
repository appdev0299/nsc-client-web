'use client'

import { ThemeContext } from '@/app/theme-provider'
import Card10 from '@/components/PostCards/Card10'
import Card10V2 from '@/components/PostCards/Card10V2'
import Card11 from '@/components/PostCards/Card11'
import Card4 from '@/components/PostCards/Card4'
import Card7 from '@/components/PostCards/Card7'
import Card9 from '@/components/PostCards/Card9'
import { TPost } from '@/data/posts'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import { HeadingWithSubProps } from '@/shared/Heading'
import HeadingWithSub from '@/shared/Heading'
import { NextPrev } from '@/shared/NextPrev'
import clsx from 'clsx'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { FC, useContext } from 'react'
import Link from 'next/link'

interface Props extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  posts: TPost[]
  postCardName?: 'card4' | 'card7' | 'card9' | 'card10' | 'card10V2' | 'card11'
  emblaOptions?: EmblaOptionsType
  isPackage?: boolean
  viewAllHref?: string
  hiddenAuthor?: boolean
}

const SectionSliderPosts: FC<Props> = ({
  heading,
  subHeading,
  dimHeading,
  className,
  posts,
  postCardName = 'card4',
  isPackage = false,
  viewAllHref,
  hiddenAuthor = false,
  emblaOptions = {
    slidesToScroll: 'auto',
  },
}) => {
  const theme = useContext(ThemeContext)
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...emblaOptions, direction: theme?.themeDir })
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)

  const renderCard = (item: TPost, index: number) => {
    switch (postCardName) {
      case 'card4':
        return <Card4 key={index} post={item} />
      case 'card7':
        return <Card7 key={index} post={item} isPackage={isPackage} />
      case 'card9':
        return <Card9 key={index} post={item} />
      case 'card10':
        return <Card10 key={index} post={item} />
      case 'card10V2':
        return <Card10V2 key={index} post={item} />
      case 'card11':
        return <Card11 key={index} post={item} hiddenAuthor={hiddenAuthor} />

      default:
        return null
    }
  }

  return (
    <div className={clsx('section-slider-posts relative', className)}>
      <div className="relative mb-12 flex flex-wrap items-end gap-4">
        <HeadingWithSub className="mb-0!" subHeading={subHeading} dimHeading={dimHeading}>
          {heading}
        </HeadingWithSub>

        <div className="ms-auto flex items-center gap-3">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-all hover:gap-2 dark:text-primary-400"
            >
              <span>ดูทั้งหมด</span>
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}

          <NextPrev
            onClickNext={onNextButtonClick}
            onClickPrev={onPrevButtonClick}
            nextDisabled={nextBtnDisabled}
            prevDisabled={prevBtnDisabled}
          />
        </div>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="-ms-5 embla__container sm:-ms-7">
          {posts.map((post, index) => (
            <div key={post.id} className="embla__slide basis-[86%] ps-5 sm:ps-7 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              {renderCard(post, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionSliderPosts
