import { Popover as DefaultPopover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import React from 'react';

interface PopoverProps {
  content: React.ReactNode;
  className?: string;
}
export const Popover: React.FC<PopoverProps & PopoverPrimitive.PopoverProps> = ({
  children,
  content,
  className,
  ...restProps
}) => {
  const classes = clsx(className);
  return (
    <DefaultPopover {...restProps}>
      <PopoverTrigger className={classes}>{children}</PopoverTrigger>
      <PopoverContent className="whitespace-pre-line">{content}</PopoverContent>
    </DefaultPopover>
  );
};
