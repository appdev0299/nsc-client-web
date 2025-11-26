'use client'

import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import { FC, useEffect, useState } from 'react'

interface Props extends ImageProps {
  containerClassName?: string
}

const NcImage: FC<Props> = ({
  containerClassName = 'relative',
  alt,
  className = 'object-cover size-full',
  sizes = '(max-width: 600px) 480px, 800px',
  src,
  ...args
}) => {
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    setImageSrc(src)
  }, [src])

  return (
    <div className={clsx('', containerClassName)}>
      {imageSrc && String(imageSrc).trim() ? (
        <Image
          className={className}
          alt={alt}
          sizes={sizes}
          src={imageSrc}
          {...args}
          onError={() => setImageSrc('/images/nurse-design.jpg')}
        />
      ) : null}
    </div>
  )
}

export default NcImage
