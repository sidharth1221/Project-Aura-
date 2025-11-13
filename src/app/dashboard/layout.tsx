'use client';

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
import { FirebaseClientProvider, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

// This component is now a client component because it uses client-side hooks
function ProtectedDashboardLayout({
  children,
  defaultLayout,
  defaultCollapsed,
}: {
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
  defaultCollapsed: boolean | undefined;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
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


// This remains a server component to read cookies
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Reading cookies must be done in a server component.
  // Since we cannot have both server and client logic in the same file that uses hooks,
  // we will pass these values as props. In a real app, you might fetch this data differently.
  const layout = cookies().get('react-resizable-panels:layout');
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const collapsed = cookies().get('react-resizable-panels:collapsed');
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  
  return (
    <FirebaseClientProvider>
      <ProtectedDashboardLayout
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
      >
        {children}
      </ProtectedDashboardLayout>
    </FirebaseClientProvider>
  );
}