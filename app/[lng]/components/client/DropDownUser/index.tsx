'use client';

import React from 'react';
import { DropDownMenu } from '@/app/components';
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator
  // DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { logOut, logIn } from '@/app/utils';
import { useRouter } from 'next/navigation';
import { useNotesStore, useUserStore, DEFAULT_NOTES } from '@/app/store';
import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import {
  // BadgeCheck, Bell,
  ChevronsUpDown,
  // CreditCard,
  LogOut,
  LogIn
  // Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export const DropDownUser: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user, fetchUser } = useUserStore();
  const { setSearchNote } = useNotesStore();
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleLogOut = async () => {
    const { error } = await logOut();
    if (error) {
      return toast.error(`log Out ${error}`);
    }
    setSearchNote(DEFAULT_NOTES.searchNote);
    router.push('/');
    router.refresh();
  };
  const handleLogIn = async () => {
    const { error } = await logIn();
    if (error) {
      return toast.error(`log In ${error}`);
    }
  };
  const dropDownItems = React.useMemo(() => {
    if (user) {
      return (
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      );
    }
    return (
      <DropdownMenuItem onClick={handleLogIn}>
        <LogIn />
        Log in
      </DropdownMenuItem>
    );
  }, [user]);
  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <DropDownMenu
      open={open}
      onOpenChange={setOpen}
      dir="ltr"
      asChild
      content={
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={isMobile ? 'bottom' : 'right'}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">{children}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup> */}
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup> */}
          {/* <DropdownMenuSeparator /> */}
          {dropDownItems}
        </DropdownMenuContent>
      }
    >
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        {children}
        <ChevronsUpDown className="ml-auto size-4" />
      </SidebarMenuButton>
    </DropDownMenu>
  );
};
