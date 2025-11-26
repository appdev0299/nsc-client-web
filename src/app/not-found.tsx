import React from 'react'

const Page404: React.FC = () => (
  <div className="nc-Page404">
    <div className="relative container py-16 lg:py-20">
      {/* HEADER */}
      <header className="mx-auto max-w-2xl space-y-7 text-center">
        <h2 className="text-7xl md:text-8xl">🪔</h2>
        <h1 className="text-8xl font-semibold tracking-widest md:text-9xl">404</h1>
        <span className="block text-sm font-medium tracking-wider text-neutral-800 sm:text-base dark:text-neutral-200">
          {`THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.`}
        </span>
        <a
          href="/"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Return Home Page
        </a>
      </header>
    </div>
  </div>
)

export default Page404
