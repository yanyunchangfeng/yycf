'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  // DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';

export function ModeToggle() {
  const { setTheme, theme, themes } = useTheme();

  const themeItems = React.useMemo(() => {
    return themes.map((currentTheme) => {
      return (
        <DropdownMenuCheckboxItem
          key={currentTheme}
          checked={theme === currentTheme}
          onCheckedChange={() => setTheme(currentTheme)}
        >
          {currentTheme}
        </DropdownMenuCheckboxItem>
      );
    });
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{themeItems}</DropdownMenuContent>
    </DropdownMenu>
  );
}
