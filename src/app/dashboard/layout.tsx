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
import { FirebaseClientProvider } from '@/firebase';
import { ProtectedDashboardLayout } from './protected-layout';

// This is the Server Component that can read cookies
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
    <FirebaseClientProvider>
      <SidebarProvider defaultOpen={!defaultCollapsed}>
        <Sidebar>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <ProtectedDashboardLayout>
            {children}
          </ProtectedDashboardLayout>
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
