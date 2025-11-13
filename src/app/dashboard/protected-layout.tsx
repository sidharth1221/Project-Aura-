'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { DashboardHeader } from '@/components/dashboard-header';

// This is the Client Component that handles authentication
export function ProtectedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
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
    <>
      <DashboardHeader />
      <main className="flex-1 overflow-auto p-4 pt-2 md:p-6 md:pt-2">
        {children}
      </main>
    </>
  );
}
