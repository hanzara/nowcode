
import React from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import Dashboard from '@/components/Dashboard';
import Portfolio from '@/components/Portfolio';
import InvestmentInsights from '@/components/InvestmentInsights';
import Staking from '@/components/Staking';
import Wallet from '@/components/Wallet';
import Education from '@/components/Education';
import BillPayments from '@/components/BillPayments';
import SavingsGoalsPage from '@/components/SavingsGoalsPage';
import QRPaymentsPage from '@/components/QRPaymentsPage';
import MobileMoneyPage from '@/components/MobileMoneyPage';
import Disputes from '@/components/Disputes';
import TokenManagementPage from '@/components/TokenManagementPage';

const Index = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/dashboard':
        return <Dashboard />;
      case '/marketplace':
        return <Dashboard />;
      case '/my-loans':
        return <Dashboard />;
      case '/portfolio':
        return <Portfolio />;
      case '/insights':
        return <InvestmentInsights />;
      case '/staking':
        return <Staking />;
      case '/wallet':
        return <Wallet />;
      case '/education':
        return <Education />;
      case '/bill-payments':
        return <BillPayments />;
      case '/savings-goals':
        return <SavingsGoalsPage />;
      case '/qr-payments':
        return <QRPaymentsPage />;
      case '/mobile-money':
        return <MobileMoneyPage />;
      case '/disputes':
        return <Disputes />;
      case '/token-management':
        return <TokenManagementPage />;
      case '/settings':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout>
      {renderContent()}
    </AppLayout>
  );
};

export default Index;
