'use client'

import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'
import { useTranslations } from 'next-intl'
import React from 'react'

export interface WidgetFooterMenu {
  id: string
  titleKey: string
  menus: {
    href: string
    labelKey: string
  }[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    titleKey: 'footer.services',
    menus: [
      { href: '/clinics', labelKey: 'nav.clinics' },
      { href: '/appointment', labelKey: 'nav.appointment' },
      { href: '/specialists', labelKey: 'nav.findSpecialist' },
      { href: '/packages', labelKey: 'nav.packages' },
    ],
  },
  {
    id: '2',
    titleKey: 'footer.aboutUs',
    menus: [
      { href: '/about/general', labelKey: 'nav.generalInfo' },
      { href: '/clinics', labelKey: 'nav.clinicInfo' },
      { href: '/about/partnerships', labelKey: 'nav.partnerships' },
      { href: '/about/careers', labelKey: 'nav.careers' },
      { href: '/contact', labelKey: 'nav.contact' },
      { href: '/news', labelKey: 'nav.news' },
    ],
  },
  {
    id: '3',
    titleKey: 'footer.healthKnowledge',
    menus: [
      { href: '/health-knowledge', labelKey: 'nav.healthKnowledge' },
    ],
  },
]

const Footer: React.FC = () => {
  const t = useTranslations()

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{t(menu.titleKey)}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      {/* footer */}
      <div className="nc-Footer relative border-t border-neutral-200 py-16 lg:py-28 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
          <div className="col-span-2 grid grid-cols-4 gap-5 md:col-span-4 lg:flex lg:flex-col lg:md:col-span-1">
            <div className="col-span-2 md:col-span-1">
              <Logo size="size-10" />
            </div>
            <div className="col-span-2 flex items-center md:col-span-3">
              <SocialsList1 />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
    </>
  )
}

export default Footer
