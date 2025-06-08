
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import NavItems from '@/components/NavItems';
import { ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        <div className={cn(
          "relative bg-white border-r border-gray-200 transition-all duration-300 ease-in-out h-full",
          collapsed ? "w-16" : "w-64"
        )}>
          <Sidebar className="h-full">
            <SidebarContent className="h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h1 className={cn("font-semibold text-xl transition-opacity", 
                  collapsed ? "opacity-0 hidden" : "opacity-100 block")}>LendChain</h1>
                <button 
                  onClick={toggleSidebar}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
              </div>
              <NavItems collapsed={collapsed} />
              <div className="mt-auto p-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className={cn("w-full", collapsed && "px-2")}
                >
                  <LogOut size={16} />
                  {!collapsed && <span className="ml-2">Sign Out</span>}
                </Button>
              </div>
            </SidebarContent>
          </Sidebar>
        </div>

        <div className="flex-1 overflow-auto">
          <main className="p-6 h-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
