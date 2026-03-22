"use client";

import { usePathname } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { UserMenu } from "@/components/user-menu";
import { PatientSearchBar } from "@/components/patient-search-bar";

const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center justify-between gap-4 border-b px-4">
          <SidebarTrigger />
          <PatientSearchBar />
          <UserMenu />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
