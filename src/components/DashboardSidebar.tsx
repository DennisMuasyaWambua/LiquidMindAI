'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  Landmark,
  BrainCircuit,
  LogOut,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/clients', label: 'Clients', icon: Users },
  { href: '/dashboard/renewals', label: 'Renewals', icon: FileText },
  { href: '/dashboard/growth', label: 'Growth', icon: TrendingUp },
  { href: '/dashboard/finance', label: 'Finance', icon: Landmark },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div className="bg-primary/10 text-primary p-2 rounded-lg">
            <BrainCircuit />
          </div>
          <h2 className="text-xl font-headline font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            ClarityFlow AI
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={
                    item.href === '/dashboard'
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                  }
                  tooltip={{ children: item.label }}
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
             <Link href="#" passHref legacyBehavior>
              <SidebarMenuButton asChild tooltip={{ children: 'Settings' }}>
                <a>
                  <Settings />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <Link href="/" passHref legacyBehavior>
              <SidebarMenuButton asChild tooltip={{ children: 'Logout' }}>
                <a>
                  <LogOut />
                  <span>Logout</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="size-8">
                <AvatarImage src="https://picsum.photos/seed/admin/100/100" alt="Admin" data-ai-hint="person face" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
                <p className="text-xs text-sidebar-foreground/70">admin@clarityflow.ai</p>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
