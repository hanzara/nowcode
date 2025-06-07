
import React, { useState } from 'react';
import { useLoans } from '@/hooks/useLoans';
import { useUserProfile } from '@/hooks/useUserProfile';
import InvestorLoanView from './InvestorLoanView';
import LoanApplicationForm from './LoanApplicationForm';
import LoanSummaryCard from './LoanSummaryCard';
import MarketplaceLoansDisplay from './MarketplaceLoansDisplay';

interface LoanMarketplaceProps {
  onSubmitApplication: () => void;
}

const LoanMarketplace: React.FC<LoanMarketplaceProps> = ({ onSubmitApplication }) => {
  const { marketplaceLoans, loading } = useLoans();
  const { profile } = useUserProfile();
  const [loanAmount, setLoanAmount] = useState(5000);
  const [duration, setDuration] = useState(12);
  const [interestRate, setInterestRate] = useState(5.2);

  const calculateMonthlyPayment = () => {
    const r = interestRate / 100 / 12;
    const n = duration;
    const p = loanAmount;
    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return monthlyPayment.toFixed(2);
  };

  // If user is an investor, show the investor view
  if (profile?.profile_type === 'investor') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Investment Marketplace</h1>
        </div>
        <InvestorLoanView />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Loan Marketplace</h1>
      </div>

      {/* Available Loans Section */}
      <MarketplaceLoansDisplay marketplaceLoans={marketplaceLoans} loading={loading} />

      {/* Loan Application Form - Only for borrowers */}
      {profile?.profile_type === 'borrower' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <LoanApplicationForm onSubmitApplication={onSubmitApplication} />
          </div>

          <div>
            <LoanSummaryCard
              loanAmount={loanAmount}
              interestRate={interestRate}
              duration={duration}
              calculateMonthlyPayment={calculateMonthlyPayment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanMarketplace;
