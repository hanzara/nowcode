
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

  const handleSubmitApplication = () => {
    // Handle loan application submission
    console.log('Loan application submitted');
  };

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
      <div className="min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/marketplace" element={<AppLayout><LoanMarketplace onSubmitApplication={handleSubmitApplication} /></AppLayout>} />
          <Route path="/my-loans" element={<AppLayout><MyLoans /></AppLayout>} />
          <Route path="/portfolio" element={<AppLayout><Portfolio /></AppLayout>} />
          <Route path="/insights" element={<AppLayout><InvestmentInsights /></AppLayout>} />
          <Route path="/staking" element={<AppLayout><Staking /></AppLayout>} />
          <Route path="/wallet" element={<AppLayout><Wallet /></AppLayout>} />
          <Route path="/education" element={<AppLayout><Education /></AppLayout>} />
          <Route path="/bill-payments" element={<AppLayout><BillPayments /></AppLayout>} />
          <Route path="/savings-goals" element={<AppLayout><SavingsGoals /></AppLayout>} />
          <Route path="/qr-payments" element={<AppLayout><QRPayments /></AppLayout>} />
          <Route path="/mobile-money" element={<AppLayout><MobileMoneySetup /></AppLayout>} />
          <Route path="/disputes" element={<AppLayout><Disputes /></AppLayout>} />
          <Route path="/token-management" element={<AppLayout><TokenManagement /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
