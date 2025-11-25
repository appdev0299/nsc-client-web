import '@/styles/tailwind.css';
import { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import { ApplicationLayout } from '@/app/(app)/application-layout';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s - Ncmaz',
    default: 'Ncmaz - Blog, News, Magazine template',
  },
  description: 'Ncmaz - Blog, News, Magazine template',
  keywords: ['Ncmaz', 'Blog', 'News', 'Magazine'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={notoSansThai.className}>
      <body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        {/* Use the ApplicationLayout which already includes Header2 (the designed Navbar) and Footer */}
        <ApplicationLayout headerStyle="header-2" headerHasBorder={false} showBanner={false}>
          {children}
        </ApplicationLayout>
      </body>
    </html>
  );
}
