import ButtonPrimary from '@/shared/ButtonPrimary'

export default function NotFound() {
    return (
        <div className="container flex min-h-[60vh] flex-col items-center justify-center py-16">
            <div className="mx-auto max-w-md text-center">
                <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">404</h1>
                <h2 className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Package Not Found
                </h2>
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                    Sorry, we couldn't find the package you're looking for. It may have been removed or the link might be incorrect.
                </p>
                <div className="mt-8">
                    <ButtonPrimary className="px-6 py-3" href="/">
                        Back to Home
                    </ButtonPrimary>
                </div>
            </div>
        </div>
    )
}
