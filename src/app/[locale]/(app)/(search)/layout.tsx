
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridCategoryBox from '@/components/SectionGridCategoryBox'
import SectionSliderNewAuthors from '@/components/SectionSliderNewAuthors'
import SectionSubscribe2 from '@/components/SectionSubscribe2'
import { getAuthors } from '@/data/authors'
import { getCategories } from '@/data/categories'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = async ({ children }) => {
  const categories = await getCategories()
  const authors = await getAuthors()

  return (
    <>
      {children}


    </>
  )
}

export default Layout
