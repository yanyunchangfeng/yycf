'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  //   BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
  //   BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname, useParams } from 'next/navigation';
import React from 'react';
import { useTranslation } from '@/app/i18n/client';
import { removeLocalePrefix } from '@/app/utils';

export const Header: React.FC<React.PropsWithChildren & { lng: string }> = ({ children, lng }) => {
  const pathName = usePathname();
  const pathWithoutLocale = removeLocalePrefix(pathName);
  const params = useParams();
  const { t } = useTranslation(lng, 'basic');
  const breamCrumbData = React.useMemo(() => {
    if (!pathWithoutLocale) return;
    const pathParts = pathWithoutLocale.split('/').filter((part) => part);
    const newBreadcrumbs = pathParts.map((part, index) => {
      const href = '/' + pathParts.slice(0, index + 1).join('/');
      let label: string | string[] = decodeURIComponent(part);

      if (params.id && part === params.id) {
        // 如果是动态路由的参数，替换为实际值
        label = params.id; // 动态替换 id
      }
      // 动态替换 slug 参数（slug 可能是一个数组）
      if (params.slug && params.slug.includes(part)) {
        label = part; // 替换 slug
      }
      return { label: label, href: `/${lng}${href}`, isLast: index === pathParts.length - 1 };
    });

    return [{ label: 'home', href: `/${lng}`, isLast: false }, ...newBreadcrumbs];
  }, [pathWithoutLocale, params, lng, pathName, t]);

  // const BreadItems = React.useMemo(() => { //切换会影响渲染 故注释
  const BreadItems = breamCrumbData?.map((item) => {
    if (breamCrumbData?.length === 1) {
      return (
        <BreadcrumbItem key={item.href}>
          <BreadcrumbPage suppressHydrationWarning>{t(item.label)}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }
    if (!item?.isLast) {
      return (
        <React.Fragment key={item.href}>
          <BreadcrumbItem>
            <BreadcrumbLink href={item.href} suppressHydrationWarning>
              {t(item.label)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </React.Fragment>
      );
    }
    return (
      <BreadcrumbItem key={item.href}>
        <BreadcrumbPage suppressHydrationWarning>{t(item.label)}</BreadcrumbPage>
      </BreadcrumbItem>
    );
  });
  // }, [breamCrumbData]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>{BreadItems}</BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </header>
  );
};
