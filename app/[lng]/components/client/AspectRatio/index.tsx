import Image, { ImageProps } from 'next/image';
import { AspectRatioProps } from '@radix-ui/react-aspect-ratio';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

export const AspectRatioImage: React.FC<ImageProps & AspectRatioProps> = ({
  className,
  ratio = 16 / 9,
  ...restProps
}) => {
  const classes = cn('', className);
  return (
    <div className={classes}>
      <AspectRatio ratio={ratio}>
        <Image {...restProps} className="h-full w-full rounded-md object-cover" />
      </AspectRatio>
    </div>
  );
};
