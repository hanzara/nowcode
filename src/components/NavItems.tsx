
import React from 'react';
import {
  LayoutDashboard,
  Store,
  CreditCard,
  TrendingUp,
  Brain,
  Coins,
  Wallet,
  AlertCircle,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TabType } from './AppLayout';

interface NavItem {
  title: string;
  icon: any;
  tab: TabType;
  description: string;
}

interface NavItemsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  collapsed: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    tab: 'dashboard',
    description: "Overview of your lending portfolio"
  },
  {
    title: "Loan Marketplace",
    icon: Store,
    tab: 'marketplace',
    description: "Browse and invest in available loans"
  },
  {
    title: "My Loans",
    icon: CreditCard,
    tab: 'loans',
    description: "Manage your active loans and applications"
  },
  {
    title: "Portfolio",
    icon: TrendingUp,
    tab: 'portfolio',
    description: "Track your investment performance"
  },
  {
    title: "Investment Insights",
    icon: Brain,
    tab: 'insights',
    description: "AI-powered market analysis and recommendations"
  },
  {
    title: "Staking",
    icon: Coins,
    tab: 'staking',
    description: "Stake your tokens to earn rewards"
  },
  {
    title: "Wallet",
    icon: Wallet,
    tab: 'wallet',
    description: "Manage your digital wallet and funds"
  },
  {
    title: "Disputes",
    icon: AlertCircle,
    tab: 'disputes',
    description: "Dispute resolution and support"
  },
  {
    title: "Settings",
    icon: Settings,
    tab: 'settings',
    description: "Account settings and preferences"
  }
];

const NavItems: React.FC<NavItemsProps> = ({ activeTab, onTabChange, collapsed }) => {
  return (
    <nav className="flex-1 space-y-1 p-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.tab;
        
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={cn(
              "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-blue-100 text-blue-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
            title={collapsed ? item.title : undefined}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <span className="ml-3 truncate">{item.title}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default NavItems;
