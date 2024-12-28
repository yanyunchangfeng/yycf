'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { DropDownUser, ModeToggle } from '@/app/components';
import { Button } from '@/components/ui/button';

export const Navigation: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-center gap-2  py-4">
      <DropDownUser />
      <Button onClick={() => router.push('/notes', { scroll: false })} variant="link">
        notes
      </Button>
      <Button onClick={() => router.push('/blog', { scroll: false })} variant="link">
        blog
      </Button>
      {/* App Router 的默认行为是滚动到新路由的顶部，
    或者在前进后退导航时维持之前的滚动距离。
    如果你想要禁用这个行为，你可以给 <Link> 组件传递一个 scroll={false}属性，
    或者在使用 router.push和 router.replace的时候，设置 scroll: false */}
      {/* ?redirect=false 通过searchParams可以使用中间件区分要不要重定向 */}
      <Button onClick={() => router.push('/', { scroll: false })} variant="link">
        home
      </Button>
      <ModeToggle />
    </nav>
  );
};
