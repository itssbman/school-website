"use client";

import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/portal/Sidebar";
import TopBar from "@/components/portal/TopBar";
import DemoBanner from "@/components/portal/DemoBanner";
import { ToastProvider } from "@/components/ui/Toast";

function getPageTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (!last || last === "portal") return "Dashboard";
  return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
}

function PortalShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DemoBanner />
      <div className="flex flex-1 min-h-0 overflow-hidden bg-[#FBFBFA]">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopBar
            title={title}
            onMobileMenuToggle={() => setMobileMenuOpen(true)}
          />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1280px] mx-auto p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <PortalShell>{children}</PortalShell>
      </ToastProvider>
    </SessionProvider>
  );
}
