'use client'

import * as Headless from '@headlessui/react'
import { Link as I18nLink } from '@/i18n/routing'
import { type LinkProps } from 'next/link'
import React, { forwardRef } from 'react'

export const Link = forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  const closeHeadless = Headless.useClose()

  return (
    <Headless.DataInteractive>
      <I18nLink
        {...props}
        ref={ref}
        onClick={(e) => {
          if (props.onClick) {
            props.onClick(e)
          }
          // Close the headlessui menu and aside
          closeHeadless()
        }}
      />
    </Headless.DataInteractive>
  )
})
