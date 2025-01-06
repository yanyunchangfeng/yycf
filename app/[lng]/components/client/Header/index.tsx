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
import siteMetadata from '@/data/siteMetadata';
// import { Image } from 'lucide-react';

export const Header: React.FC<React.PropsWithChildren & { lng: string }> = ({ children, lng }) => {
  const pathName = usePathname();
  const pathWithoutLocale = removeLocalePrefix(pathName);
  const params = useParams();
  const { t, i18n } = useTranslation(lng, 'basic');
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
      return { label: label, href: `/${lng}${href}`, isLast: index === pathParts.length - 1, isFirst: false };
    });

    return [{ label: 'home', href: `/${lng}`, isLast: false, isFirst: true }, ...newBreadcrumbs];
  }, [pathWithoutLocale, params, lng, i18n.language]);

  const BreadItems = React.useMemo(() => {
    return breamCrumbData?.map((item) => {
      if (item?.isFirst) {
        return (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              <h2 className="text-xl">
                <BreadcrumbLink
                  href={item.href}
                  suppressHydrationWarning
                  title={siteMetadata.origin}
                  className="flex items-center gap-2 [&_svg]:size-6"
                >
                  {/* <Image /> */}
                  {siteMetadata.origin}
                </BreadcrumbLink>
              </h2>
            </BreadcrumbItem>
            {breamCrumbData.length !== 1 ? <BreadcrumbSeparator /> : null}
          </React.Fragment>
        );
      }
      if (!item?.isLast) {
        return (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href} suppressHydrationWarning title={siteMetadata.keywords.join(',')}>
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
  }, [breamCrumbData]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="[&_svg]:size-6" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>{BreadItems}</BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </header>
  );
};
