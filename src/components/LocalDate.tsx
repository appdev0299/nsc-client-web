'use client'

import { useLocale } from 'next-intl'
import { FC } from 'react'

interface Props {
  date: string
  className?: string
  options?: Intl.DateTimeFormatOptions
}

const LocalDate: FC<Props> = ({ date, className, options }) => {
  const locale = useLocale()

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const mergedOptions = options || defaultOptions
  const localeString = locale === 'th' ? 'th-TH' : 'en-US'

  return (
    <time dateTime={date} className={className}>
      {new Date(date).toLocaleDateString(localeString, mergedOptions)}
    </time>
  )
}

export default LocalDate
