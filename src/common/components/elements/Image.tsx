'use client';

import clsx from 'clsx';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

import cn from '@/common/libs/cn';

type ImageProps = {
  rounded?: string;
} & NextImageProps;

const Image = (props: ImageProps) => {
  const { alt, src, className, rounded, ...rest } = props;

  return (
    <div className={clsx('overflow-hidden', rounded)}>
      <NextImage
        className={cn('duration-700 ease-in-out', rounded, className)}
        src={src}
        alt={alt}
        loading='lazy'
        quality={100}
        {...rest}
      />
    </div>
  );
};
export default Image;
