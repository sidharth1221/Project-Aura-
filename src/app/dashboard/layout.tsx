import * as React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { DashboardHeader } from '@/components/components/dashboard-header';
import { FirebaseClientProvider, useUser } from '@/firebase';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { getAuth } from 'firebase/auth';

// This is a workaround to get the user on the server side.
// In a real app, you'd use a server-side auth library.
const getInitialUser = async () => {
  // This is a bit of a hack to check auth on the server.
  // In a real app, you would have a proper server-side session management.
  const apps = getApps();
  if (!apps.length) {
    initializeApp(firebaseConfig);
  }
  const auth = getAuth();
  // This is not a reliable way to get the current user on the server.
  // It might be null even if the user is logged in on the client.
  // For protected routes, middleware is a better approach.
  return auth.currentUser;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = cookies().get('react-resizable-panels:layout');
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const collapsed = cookies().get('react-resizable-panels:collapsed');
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  // This is a server-side check.
  // It's not fully reliable without proper session management.
  // const user = await getInitialUser();
  // if (!user) {
  //   redirect('/login');
  // }
  
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

function useRouter() {
  const [router, setRouter] = React.useState({
    push: (path: string) => {
      if (typeof window !== 'undefined') {
        window.location.href = path;
      }
    },
  });
  return router;
}
