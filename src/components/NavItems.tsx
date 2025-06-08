
import React from 'react';
import { 
  Home, 
  ShoppingCart, 
  CreditCard, 
  PieChart, 
  TrendingUp, 
  Wallet, 
  Settings,
  BookOpen,
  BarChart3,
  Receipt,
  Target,
  QrCode,
  Smartphone,
  MessageSquare,
  Gift
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const mainNavItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home className="h-5 w-5" />,
    path: '/dashboard'
  },
  {
    id: 'marketplace',
    label: 'Marketplace',
    icon: <ShoppingCart className="h-5 w-5" />,
    path: '/marketplace'
  },
  {
    id: 'my-loans',
    label: 'My Loans',
    icon: <CreditCard className="h-5 w-5" />,
    path: '/my-loans'
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: <PieChart className="h-5 w-5" />,
    path: '/portfolio'
  },
  {
    id: 'staking',
    label: 'Staking',
    icon: <TrendingUp className="h-5 w-5" />,
    path: '/staking'
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: <Wallet className="h-5 w-5" />,
    path: '/wallet'
  },
  {
    id: 'education',
    label: 'Education',
    icon: <BookOpen className="h-5 w-5" />,
    path: '/education'
  }
];

export const secondaryNavItems: NavItem[] = [
  {
    id: 'insights',
    label: 'Insights',
    icon: <BarChart3 className="h-5 w-5" />,
    path: '/insights'
  },
  {
    id: 'bill-payments',
    label: 'Bill Payments',
    icon: <Receipt className="h-5 w-5" />,
    path: '/bill-payments'
  },
  {
    id: 'savings-goals',
    label: 'Savings Goals',
    icon: <Target className="h-5 w-5" />,
    path: '/savings-goals'
  },
  {
    id: 'qr-payments',
    label: 'QR Payments',
    icon: <QrCode className="h-5 w-5" />,
    path: '/qr-payments'
  },
  {
    id: 'mobile-money',
    label: 'Mobile Money',
    icon: <Smartphone className="h-5 w-5" />,
    path: '/mobile-money'
  },
  {
    id: 'disputes',
    label: 'Disputes',
    icon: <MessageSquare className="h-5 w-5" />,
    path: '/disputes'
  },
  {
    id: 'token-management',
    label: 'Tokens',
    icon: <Gift className="h-5 w-5" />,
    path: '/token-management'
  }
];

export const settingsNavItems: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    path: '/settings'
  }
];

export const allNavItems = [...mainNavItems, ...secondaryNavItems, ...settingsNavItems];
