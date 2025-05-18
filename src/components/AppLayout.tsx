
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import NavItems from '@/components/NavItems';
import Dashboard from '@/components/Dashboard';
import LoanMarketplace from '@/components/LoanMarketplace';
import MyLoans from '@/components/MyLoans';
import Wallet from '@/components/Wallet';
import Disputes from '@/components/Disputes';
import Settings from '@/components/Settings';
import { ChevronRight, ChevronLeft } from "lucide-react";

export type TabType = 'dashboard' | 'marketplace' | 'loans' | 'wallet' | 'disputes' | 'settings';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [hasActiveLoan, setHasActiveLoan] = useState(false);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Function to simulate applying for a loan
  const applyForLoan = () => {
    setHasActiveLoan(true);
  };

  return (
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
          </SidebarContent>
        </Sidebar>
      </div>

      <div className="flex-1 overflow-auto">
        <main className="p-6 h-full">
          {activeTab === 'dashboard' && (
            <Dashboard 
              hasActiveLoan={hasActiveLoan} 
              onApply={() => setActiveTab('marketplace')} 
            />
          )}
          {activeTab === 'marketplace' && (
            <LoanMarketplace 
              onSubmitApplication={applyForLoan} 
            />
          )}
          {activeTab === 'loans' && <MyLoans hasActiveLoan={hasActiveLoan} />}
          {activeTab === 'wallet' && <Wallet />}
          {activeTab === 'disputes' && <Disputes />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
