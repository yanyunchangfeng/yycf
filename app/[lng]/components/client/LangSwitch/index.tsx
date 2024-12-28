'use client';

import React from 'react';
import { useParams, useRouter, useSelectedLayoutSegments } from 'next/navigation';
import siteMetadata from '@/data/siteMetadata';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';
import { SidebarMenuButton } from '@/components/ui/sidebar';

const { languages } = siteMetadata;

export const LangSwitch = () => {
  const urlSegments = useSelectedLayoutSegments();
  const router = useRouter();
  const params = useParams();
  const [locale] = React.useState<string>(params?.lng as string);

  const handleLocaleChange = (newLocale: string) => {
    const newUrl = `/${newLocale}/${urlSegments.join('/')}`;
    return newUrl;
  };
  const handleLinkClick = (newLocale: string) => {
    const resolvedUrl = handleLocaleChange(newLocale);
    router.push(resolvedUrl);
  };
  const items = React.useMemo(() => {
    return languages.map((current) => {
      return (
        <DropdownMenuCheckboxItem
          key={current}
          checked={current === locale}
          onCheckedChange={() => handleLinkClick(current)}
        >
          {current.charAt(0).toUpperCase() + locale.slice(1)}
        </DropdownMenuCheckboxItem>
      );
    });
  }, [languages]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline" size="icon"> */}
        <SidebarMenuButton variant={'outline'} className="justify-center">
          <span>{locale.charAt(0).toUpperCase() + locale.slice(1)}</span>
          <span className="sr-only">Toggle language</span>
          {/* </Button> */}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{items}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSwitch;
