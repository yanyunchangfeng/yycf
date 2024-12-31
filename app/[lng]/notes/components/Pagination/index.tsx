/* eslint-disable */
import { useNotesStore } from '@/app/store';
import React from 'react';
import { Button } from '@/components/ui/button';
import { PageSelect } from '@/app/notes/components/PageSelect';
import { Pagination } from '@/app/components';

export const PaganitionContainer: React.FC = () => {
  const { notes, fetchNotes, pending } = useNotesStore();
  const { pageNo, pageSize, totalPages, totalCount } = notes;

  const renderPageButton = (pageNo: number) => (
    <Button key={pageNo} disabled={pageNo === notes.pageNo} onClick={() => fetchNotes({ pageNo, pageSize })}>
      {pageNo}
    </Button>
  );
  const renderRange2Buttons = () => {
    const buttons = [];
    const range = 2;
    if (notes.totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      if (pageNo > range + 1) {
        buttons.push(renderPageButton(1));
      }

      // 显示省略号（如果需要）
      if (pageNo > range + 2) {
        buttons.push(<span key="start-ellipsis">...</span>);
      }

      // 当前页前后的页码按钮
      for (let i = Math.max(1, pageNo - range); i <= Math.min(totalPages, pageNo + range); i++) {
        buttons.push(renderPageButton(i));
      }

      // 显示省略号（如果需要）
      if (pageNo < totalPages - range - 1) {
        buttons.push(<span key="end-ellipsis">...</span>);
      }

      // 显示末页按钮
      if (pageNo < totalPages - range) {
        buttons.push(renderPageButton(totalPages));
      }
    }
    return buttons;
  };
  const renderRange1Buttons = () => {
    const range = 1;
    const buttons = [];
    // 显示前一页按钮
    if (pageNo > 1) {
      buttons.push(renderPageButton(pageNo - range)); // 显示前一页
    }

    // 显示当前页按钮
    buttons.push(renderPageButton(pageNo)); // 显示当前页

    // 显示后一页按钮
    if (pageNo < totalPages) {
      buttons.push(renderPageButton(pageNo + range)); // 显示后一页
    }

    return buttons;
  };

  const pages = React.useMemo(() => {
    return (
      <>
        <span>{totalCount} </span>
        {pageNo > 1 && <Button onClick={() => fetchNotes({ pageNo: 1, pageSize })}>first</Button>}
        {pageNo > 1 && (
          <Button
            className="rounded-md shadow-md  hover:bg-red-600 bg-red-500 text-white px-4 py-2"
            onClick={() => fetchNotes({ pageNo: pageNo - 1, pageSize })}
          >
            &lt;
          </Button>
        )}
        {renderRange1Buttons()}

        {pageNo < totalPages && <Button onClick={() => fetchNotes({ pageNo: pageNo + 1, pageSize })}>&gt;</Button>}
        {pageNo !== totalPages && <Button onClick={() => fetchNotes({ pageNo: totalPages, pageSize })}>last</Button>}
      </>
    );
  }, [notes]);

  if (pending) return null;
  if (totalPages === 0) return null;

  const onPageChange = (pageNo: number) => {
    fetchNotes({ pageNo, pageSize });
  };
  return (
    <div className="flex justify-center gap-1 items-center mt-2 flex-wrap">
      <Pagination
        className="m-0 w-auto"
        current={pageNo}
        onPageChange={onPageChange}
        pages={totalPages}
        total={totalCount}
      />
      <PageSelect />
    </div>
  );
};
