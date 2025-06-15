
import React from 'react';
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarProvider, useSidebar, SidebarTrigger } from "@/components/ui/sidebar";
import NavItems from '@/components/NavItems';
import Footer from '@/components/Footer';
import { ChevronRight, ChevronLeft, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppSidebarContent: React.FC = () => {
  const { signOut, user } = useAuth();
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className="h-full bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-sm">
      <SidebarContent className="h-full flex flex-col">
        {/* Header with improved branding */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className={cn(
            "flex items-center gap-3 transition-all duration-300", 
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LC</span>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LendChain
              </h1>
              <p className="text-xs text-gray-500">DeFi Lending Platform</p>
            </div>
          </div>
          <Button 
            onClick={toggleSidebar}
            variant="ghost"
            size="sm"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden md:flex"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* User info section */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-blue-100">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 truncate">
                  {user?.email?.split('@')[0] || 'User'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 px-2 py-4">
          <NavItems collapsed={collapsed} />
        </div>

        {/* Enhanced footer */}
        <div className="mt-auto p-4 border-t border-gray-200 bg-white/30 backdrop-blur-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className={cn(
              "w-full flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all duration-200",
              collapsed ? "px-2" : ""
            )}
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebarContent />
        <div className="flex-1 flex flex-col overflow-auto">
          {/* Mobile header with better styling */}
          <header className="flex items-center justify-between p-4 border-b bg-white/80 backdrop-blur-sm shadow-sm md:hidden">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LC</span>
              </div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LendChain
              </h1>
            </div>
            <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-lg transition-colors" />
          </header>

          {/* Main content with enhanced styling */}
          <main className="p-6 h-full flex flex-col bg-gradient-to-br from-gray-50/50 to-white/50">
            <div className="flex-1 animate-fade-in">
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
