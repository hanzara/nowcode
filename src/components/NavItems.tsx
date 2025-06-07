
import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Home, 
  Search, 
  CreditCard, 
  TrendingUp, 
  Eye, 
  Coins, 
  Wallet, 
  AlertTriangle, 
  Settings,
  Receipt,
  PiggyBank,
  QrCode,
  BarChart3,
  Smartphone
} from "lucide-react";
import { TabType } from './AppLayout';

interface NavItemsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  collapsed: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({ activeTab, onTabChange, collapsed }) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
    { id: 'marketplace' as TabType, label: 'Marketplace', icon: Search },
    { id: 'loans' as TabType, label: 'My Loans', icon: CreditCard },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: TrendingUp },
    { id: 'insights' as TabType, label: 'Insights', icon: Eye },
    { id: 'staking' as TabType, label: 'Staking', icon: Coins },
    { id: 'wallet' as TabType, label: 'Wallet', icon: Wallet },
    { id: 'bills' as TabType, label: 'Bill Payments', icon: Receipt },
    { id: 'savings' as TabType, label: 'Savings Goals', icon: PiggyBank },
    { id: 'qr' as TabType, label: 'QR Payments', icon: QrCode },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'mobile' as TabType, label: 'Mobile Money', icon: Smartphone },
    { id: 'disputes' as TabType, label: 'Disputes', icon: AlertTriangle },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="flex-1 space-y-1 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === item.id
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              collapsed && "justify-center px-3"
            )}
          >
            <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && item.label}
          </button>
        );
      })}
    </nav>
  );
};

export default NavItems;
