import Image, { ImageProps } from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import clsx from 'clsx';

export const AspectRatioImage: React.FC<ImageProps> = ({ className, ...restProps }) => {
  const classes = clsx('w-[300px]', className);
  return (
    <div className={classes}>
      <AspectRatio ratio={16 / 9}>
        <Image {...restProps} className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
  );
};
