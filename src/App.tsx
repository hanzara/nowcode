
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/AuthPage';
import AppLayout from '@/components/AppLayout';
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
import MobileMoneySetup from '@/components/MobileMoneySetup';
import Disputes from '@/components/Disputes';
import TokenManagement from '@/components/TokenManagement';
import Settings from '@/components/Settings';
import Education from '@/components/Education';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthPage />
        <Toaster />
      </>
    );
  }

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<LoanMarketplace />} />
          <Route path="/my-loans" element={<MyLoans />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/insights" element={<InvestmentInsights />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/education" element={<Education />} />
          <Route path="/bill-payments" element={<BillPayments />} />
          <Route path="/savings-goals" element={<SavingsGoals />} />
          <Route path="/qr-payments" element={<QRPayments />} />
          <Route path="/mobile-money" element={<MobileMoneySetup />} />
          <Route path="/disputes" element={<Disputes />} />
          <Route path="/token-management" element={<TokenManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
      <Toaster />
    </Router>
  );
}

export default App;
