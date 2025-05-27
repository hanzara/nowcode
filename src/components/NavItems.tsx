
import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Store, FileText, Wallet, HelpCircle, Settings, User, Coins } from "lucide-react";
import type { TabType } from './AppLayout';

interface NavItemsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  collapsed: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({ activeTab, onTabChange, collapsed }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'marketplace', label: 'Loan Marketplace', icon: <Store size={20} /> },
    { id: 'loans', label: 'My Loans', icon: <FileText size={20} /> },
    { id: 'portfolio', label: 'Portfolio', icon: <User size={20} /> },
    { id: 'staking', label: 'Staking', icon: <Coins size={20} /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet size={20} /> },
    { id: 'disputes', label: 'Disputes & Support', icon: <HelpCircle size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <nav className="flex flex-col py-4 h-full">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id as TabType)}
          className={cn(
            "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors",
            activeTab === item.id && "bg-blue-50 text-loan-primary border-l-4 border-loan-primary",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <span className={cn(
            "ml-3 whitespace-nowrap transition-opacity", 
            collapsed ? "opacity-0 hidden" : "opacity-100 block"
          )}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default NavItems;
