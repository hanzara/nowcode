
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
import BillPayments from '@/components/BillPayments';
import SavingsGoals from '@/components/SavingsGoals';
import QRPayments from '@/components/QRPayments';
import TransactionAnalytics from '@/components/TransactionAnalytics';
import MobileMoneySetup from '@/components/MobileMoneySetup';
import Disputes from '@/components/Disputes';
import Settings from '@/components/Settings';
import AuthPage from '@/components/AuthPage';
import { ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

export type TabType = 'dashboard' | 'marketplace' | 'loans' | 'portfolio' | 'insights' | 'staking' | 'wallet' | 'bills' | 'savings' | 'qr' | 'analytics' | 'mobile' | 'disputes' | 'settings';

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

  const handleSubmitApplication = () => {
    setActiveTab('dashboard');
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'marketplace':
        return <LoanMarketplace onSubmitApplication={handleSubmitApplication} />;
      case 'loans':
        return <MyLoans />;
      case 'portfolio':
        return <Portfolio />;
      case 'insights':
        return <InvestmentInsights />;
      case 'staking':
        return <Staking />;
      case 'wallet':
        return <Wallet />;
      case 'bills':
        return <BillPayments />;
      case 'savings':
        return <SavingsGoals />;
      case 'qr':
        return <QRPayments />;
      case 'analytics':
        return <TransactionAnalytics />;
      case 'mobile':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight">Mobile Money</h1>
              <MobileMoneySetup />
            </div>
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Mobile Money Integration</h2>
              <p className="text-gray-600 mb-6">
                Connect your mobile money accounts for seamless transactions
              </p>
              <MobileMoneySetup />
            </div>
          </div>
        );
      case 'disputes':
        return <Disputes />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
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
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
