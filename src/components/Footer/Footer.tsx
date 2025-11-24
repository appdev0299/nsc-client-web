import { CustomLink } from '@/data/types'
import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'
import React from 'react'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    title: 'บริการ',
    menus: [
      { href: '/clinics/bd2a07b5-d294-4604-b78f-c7aa21ce293c', label: 'คลินิกพยาบาลชุมชนอบอุ่น' },
      { href: '/clinics/b2cd8439-1224-47a2-9a88-1cf0a02628b2', label: 'คลินิกใจสบาย' },
      { href: '/clinics/804f5d20-5e79-45c6-8565-12963dc065f9', label: 'คลินิกครอบครัวอุ่นสุข' },
      { href: '/appointment', label: 'นัดหมาย' },
      { href: '/find-expert', label: 'ค้นหาผู้เชี่ยวชาญ' },
      { href: '/packages', label: 'แพ็กเกจ' },
    ],
  },
  {
    id: '2',
    title: 'เกี่ยวกับเรา',
    menus: [
      { href: '/about/general', label: 'ข้อมูลทั่วไป' },
      { href: '/about/clinics', label: 'ข้อมูลคลินิก' },
      { href: '/about/partnerships', label: 'ความร่วมมือ' },
      { href: '/about/careers', label: 'การรับสมัคร' },
      { href: '/contact', label: 'ติดต่อเรา' },
      { href: '/news', label: 'ข่าวสาร' },
    ],
  },
  {
    id: '3',
    title: 'ความรู้ด้านสุขภาพ',
    menus: [
      { href: '/health-knowledge', label: 'บทความสุขภาพ' },
    ],
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
              >
                {item.label}
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
