import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { cookies } from 'next/headers';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const layout = cookies().get('sidebar_state');
  const defaultOpen = layout ? layout.value === 'true' : true;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <div className="flex flex-col w-full">
        <DashboardHeader />
        <SidebarInset>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
