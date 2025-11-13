'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { AuraTwinLogo } from '@/components/icons';
import {
  LayoutDashboard,
  ShieldCheck,
  Settings,
  LifeBuoy,
  Zap,
  Sun,
  Users,
  Award
} from 'lucide-react';

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <AuraTwinLogo className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-headline text-lg font-semibold tracking-tight">
              AuraTwin
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/dashboard')}
            tooltip={{ children: 'Dashboard' }}
          >
            <Link href="/dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
         <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard/coach')}
                tooltip={{ children: 'AI Energy Coach' }}
            >
                <Link href="/dashboard/coach">
                    <Zap />
                    <span>AI Energy Coach</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard/solar-potential')}
                tooltip={{ children: 'Solar Potential' }}
            >
                <Link href="/dashboard/solar-potential">
                    <Sun />
                    <span>Solar Potential</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard/missions')}
                tooltip={{ children: 'Missions' }}
            >
                <Link href="/dashboard/missions">
                    <Award />
                    <span>Missions</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard/community')}
                tooltip={{ children: 'Community' }}
            >
                <Link href="/dashboard/community">
                    <Users />
                    <span>Community</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive('/dashboard/anonymize')}
            tooltip={{ children: 'Anonymize Data' }}
          >
            <Link href="/dashboard/anonymize">
              <ShieldCheck />
              <span>Anonymize Data</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: 'Help' }}>
              <LifeBuoy />
              <span>Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: 'Settings' }}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
