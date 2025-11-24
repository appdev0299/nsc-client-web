import { useTranslations } from 'next-intl';
import { Link } from '@/shared/link';

export default function HomePage() {
    const t = useTranslations('home');

    return (
        <div className="container py-16">
            <h1 className="text-4xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
                {t('hero.subtitle')}
            </p>

            <div className="space-y-4">
                <p className="text-neutral-500">
                    ✅ Multi-language system is working!
                </p>
                <p className="text-neutral-500">
                    Current locale: <strong>{useTranslations.name}</strong>
                </p>

                <div className="flex gap-4">
                    <Link href="/packages" className="text-primary-600 hover:underline">
                        View Packages
                    </Link>
                    <Link href="/specialists" className="text-primary-600 hover:underline">
                        Find Specialists
                    </Link>
                </div>
            </div>
        </div>
    );
}
