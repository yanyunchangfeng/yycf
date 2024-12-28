import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Pagination as DefaultPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
  // PaginationNext,
  // PaginationPrevious
} from '@/components/ui/pagination';
import { useSidebar } from '@/components/ui/sidebar';
import React from 'react';

interface PaginationProps {
  current: number;
  pages: number;
  total: number;
  onPageChange: (pageNo: number) => void;
}

export const Pagination: React.FC<PaginationProps & React.ComponentProps<'nav'>> = ({
  current,
  onPageChange,
  pages,
  total,
  ...restProps
}) => {
  const { isMobile } = useSidebar();
  const handleChange = React.useCallback((pageNo: number) => {
    onPageChange(pageNo);
  }, []);

  const paginationItems = React.useMemo(() => {
    const totalItem = (
      <PaginationItem>
        <span>{total}</span>
      </PaginationItem>
    );
    const prevItem = (
      <PaginationItem>
        {current === 1 ? (
          <Button disabled variant="ghost" size="icon">
            <ChevronLeft />
            {/* Previous */}
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => handleChange(current - 1)}>
            <ChevronLeft />
            {/* Previous */}
          </Button>
          // <PaginationPrevious onClick={() => handleChange(current - 1)} className="cursor-pointer" />
        )}
      </PaginationItem>
    );
    const firstItem = (
      <PaginationItem>
        {current !== 1 ? (
          <PaginationLink onClick={() => handleChange(1)} className="cursor-pointer">
            1
          </PaginationLink>
        ) : null}
      </PaginationItem>
    );
    const beforeEllipsisItem =
      current > 1 + 1 ? (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      ) : null;
    const currentItem = (
      <PaginationItem>
        <PaginationLink isActive className="cursor-pointer">
          {current}
        </PaginationLink>
      </PaginationItem>
    );
    const afterEllipsisItem =
      current < pages - 1 ? (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      ) : null;
    const lastItem = (
      <PaginationItem>
        {current !== pages ? (
          <PaginationLink onClick={() => handleChange(pages)} className="cursor-pointer">
            {pages}
          </PaginationLink>
        ) : null}
      </PaginationItem>
    );
    const nextItem =
      current === pages ? (
        <Button disabled variant="ghost" size="icon">
          {/* Next */}
          <ChevronRight />
        </Button>
      ) : (
        // <PaginationNext onClick={() => handleChange(current + 1)} className="cursor-pointer" />
        <Button variant="ghost" onClick={() => handleChange(current + 1)} size="icon">
          {/* Next */}
          <ChevronRight />
        </Button>
      );
    if (isMobile) {
      return (
        <>
          {prevItem}
          {firstItem}
          {/* {beforeEllipsisItem} */}
          {currentItem}
          {/* {afterEllipsisItem} */}
          {lastItem}
          {nextItem}
        </>
      );
    }
    return (
      <>
        {totalItem}
        {prevItem}
        {firstItem}
        {beforeEllipsisItem}
        {currentItem}
        {afterEllipsisItem}
        {lastItem}
        {nextItem}
      </>
    );
  }, [isMobile, current, pages, total]);
  return (
    <DefaultPagination {...restProps}>
      <PaginationContent>{paginationItems}</PaginationContent>
    </DefaultPagination>
  );
};
