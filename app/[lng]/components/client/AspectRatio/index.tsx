import Image, { ImageProps } from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

export const AspectRatioImage: React.FC<ImageProps> = ({ className, ...restProps }) => {
  const classes = cn('w-[320px]', className);
  return (
    <div className={classes}>
      <AspectRatio ratio={16 / 9}>
        <Image {...restProps} className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
  );
};
