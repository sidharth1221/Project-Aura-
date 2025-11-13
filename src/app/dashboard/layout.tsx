import * as React from 'react';
import { cookies } from 'next/headers';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { DashboardHeader } from '@/components/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = cookies().get('react-resizable-panels:layout');
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const collapsed = cookies().get('react-resizable-panels:collapsed');
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <SidebarProvider defaultOpen={!defaultCollapsed}>
      <Sidebar>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 pt-2 md:p-6 md:pt-2">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
