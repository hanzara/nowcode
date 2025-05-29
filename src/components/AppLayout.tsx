
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import NavItems from '@/components/NavItems';
import Dashboard from '@/components/Dashboard';
import LoanMarketplace from '@/components/LoanMarketplace';
import MyLoans from '@/components/MyLoans';
import Portfolio from '@/components/Portfolio';
import InvestmentInsights from '@/components/InvestmentInsights';
import Staking from '@/components/Staking';
import Wallet from '@/components/Wallet';
import Disputes from '@/components/Disputes';
import Settings from '@/components/Settings';
import AuthPage from '@/components/AuthPage';
import { ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

export type TabType = 'dashboard' | 'marketplace' | 'loans' | 'portfolio' | 'insights' | 'staking' | 'wallet' | 'disputes' | 'settings';

const AppLayout: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

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
              <NavItems 
                activeTab={activeTab} 
                onTabChange={handleTabChange} 
                collapsed={collapsed}
              />
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
            {activeTab === 'dashboard' && (
              <Dashboard 
                onApply={() => setActiveTab('marketplace')} 
              />
            )}
            {activeTab === 'marketplace' && (
              <LoanMarketplace 
                onSubmitApplication={() => setActiveTab('dashboard')} 
              />
            )}
            {activeTab === 'loans' && <MyLoans />}
            {activeTab === 'portfolio' && <Portfolio />}
            {activeTab === 'insights' && <InvestmentInsights />}
            {activeTab === 'staking' && <Staking />}
            {activeTab === 'wallet' && <Wallet />}
            {activeTab === 'disputes' && <Disputes />}
            {activeTab === 'settings' && <Settings />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
