import SectionHero from '@/components/SectionHero'
import rightImg from '@/images/about-hero-right.png'
import { Button } from '@/shared/Button'
import Input from '@/shared/Input'
import { Divider } from '@/shared/divider'
import SectionFounder from './SectionFounder'
import SectionStatistic from './SectionStatistic'
import { useTranslations } from 'next-intl'

const PageAbout = ({ }) => {
  const t = useTranslations('about')

  return (
    <div className={`nc-PageAbout relative`}>
      <div className="relative container space-y-16 py-16 lg:space-y-28 lg:py-28">
        <SectionHero
          rightImg={rightImg}
          heading={t('hero.heading')}
          btnText={t('hero.btnText')}
          subHeading={t('hero.subHeading')}
        />
        <Divider />
        <SectionFounder />
        <Divider />
        <SectionStatistic />

        <div className="py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:col-span-7 lg:text-5xl">
              {t('newsletter.title')}
            </h2>
            <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
              <div className="flex gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder={t('newsletter.emailPlaceholder')}
                  autoComplete="email"
                />
                <Button type="submit">{t('newsletter.subscribe')}</Button>
              </div>
              <p className="mt-4 text-sm/6">
                {t('newsletter.privacy')}{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  privacy&nbsp;policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageAbout
