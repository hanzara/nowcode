
import React from 'react';
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarProvider, useSidebar, SidebarTrigger } from "@/components/ui/sidebar";
import NavItems from '@/components/NavItems';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppSidebarContent: React.FC = () => {
  const { signOut } = useAuth();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className="h-full bg-white border-r border-gray-200">
      <SidebarContent className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className={cn(
            "font-semibold text-xl transition-opacity whitespace-nowrap", 
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}>LendChain</h1>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100 hidden md:block"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <div className="flex-1">
          <NavItems collapsed={collapsed} />
        </div>
        <div className="mt-auto p-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className={cn("w-full flex justify-center", collapsed ? "px-2" : "")}
          >
            <LogOut size={16} />
            {!collapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        <AppSidebarContent />
        <div className="flex-1 flex flex-col overflow-auto">
          <header className="flex items-center justify-between p-4 border-b bg-white md:hidden">
            <h1 className="font-semibold text-xl">LendChain</h1>
            <SidebarTrigger />
          </header>
          <main className="p-6 h-full flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
