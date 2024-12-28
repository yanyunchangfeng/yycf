'use client';
/* eslint-disable */
import * as React from 'react';
import {
  // addDays,
  format
} from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface CusDateRange {
  from?: string | Date;
  to?: string;
}
interface DatePickerRangeProps {
  // date: DateRange | undefined;
  date: CusDateRange;
  // setDate: (value: DateRange | undefined) => void;
  setDate: (value: CusDateRange) => void;
}
export const DatePickerRange: React.FC<DatePickerRangeProps & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  date,
  setDate
}) => {
  //   const [date, setDate] = React.useState<DateRange | undefined>({
  //     from: new Date(2022, 0, 20),
  //     to: addDays(new Date(2022, 0, 20), 20)
  //   });

  const handleChange = (date: any | undefined) => {
    const { from, to } = date ?? {};
    // 为了兼容 storage 序列化存储，需要将 Date 转为 ISOString
    setDate({
      ...date,
      from: typeof from === 'string' ? from : from?.toISOString(),
      to: typeof to === 'string' ? to : to?.toISOString()
    });
  };
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from as Date}
            selected={date as DateRange}
            onSelect={handleChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
