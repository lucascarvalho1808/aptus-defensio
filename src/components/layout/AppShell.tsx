'use client';

import { useState, type ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useSession } from "@/hooks/useSession";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  useSession();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebar} />

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu lateral"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={closeSidebar}
        />
      )}

      <div className="flex min-h-screen flex-col md:pl-[280px]">
        <main className="flex flex-1 flex-col px-5 py-6 sm:px-8 md:px-12 md:py-8 lg:px-[60px]">
          <Header
            title="Dashboard"
            onMenuClick={() => setIsSidebarOpen(true)}
          />

          <div className="flex flex-1 flex-col">{children}</div>
        </main>
      </div>
    </div>
  );
}