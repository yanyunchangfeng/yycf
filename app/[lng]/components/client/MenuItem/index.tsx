'use client';
import { useTranslation } from '@/app/i18n/client';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { removeLocalePrefix } from '@/app/utils';
import { usePathname } from 'next/navigation';
import React from 'react';
import { type MENUITEMS } from '@/app/shared';

interface MenuItemProps {
  title: string;
  url: string;
  icon: (typeof MENUITEMS)[0]['icon'];
}
export const MenuItem: React.FC<{ lng: string } & MenuItemProps> = ({ lng, ...item }) => {
  const { t } = useTranslation(lng, 'basic');
  const pathName = usePathname();
  const pathWithoutLocale = removeLocalePrefix(pathName);
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        asChild
        tooltip={t(item.title)}
        isActive={pathWithoutLocale === item.url || pathWithoutLocale.startsWith(`${item.url}/`)}
      >
        <a href={`/${lng}${item.url}`}>
          <item.icon />
          <span suppressHydrationWarning>{t(item.title)}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
