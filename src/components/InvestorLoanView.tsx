
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLoans } from '@/hooks/useLoans';
import { useUserProfile } from '@/hooks/useUserProfile';
import LoanOfferDialog from './LoanOfferDialog';
import CurrencyDisplay from './CurrencyDisplay';
import { format } from 'date-fns';

const InvestorLoanView: React.FC = () => {
  const { userApplications: loanApplications, loading } = useLoans();
  const { profile, canLend } = useUserProfile();

  if (!profile || !canLend()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Restricted</CardTitle>
          <CardDescription>
            You need an investor or lender profile to view loan opportunities.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (loading) {
    return <div className="text-center py-4">Loading loan applications...</div>;
  }

  const pendingApplications = loanApplications.filter(app => app.status === 'pending');

  const getTitle = () => {
    if (profile.profile_type === 'lender') {
      return 'Lending Opportunities';
    }
    return 'Investment Opportunities';
  };

  const getDescription = () => {
    if (profile.profile_type === 'lender') {
      return 'Browse loan applications from borrowers seeking direct lending';
    }
    return 'Browse loan applications from borrowers seeking funding';
  };

  // Convert USD amounts to KES for display
  const convertToKES = (usdAmount: number) => usdAmount * 130;

  return (
    <div className="space-y-6">
      {/* Summary for Investors/Lenders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingApplications.length}</div>
            <p className="text-sm text-gray-600">Loan applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Funded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CurrencyDisplay 
                amount={convertToKES(profile.total_funded || 0)} 
                currency="KES" 
                showToggle={false}
              />
            </div>
            <p className="text-sm text-gray-600">Lifetime funding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{profile.success_rate || 0}%</div>
            <p className="text-sm text-gray-600">Successful investments</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>{getTitle()}</CardTitle>
          <CardDescription>
            {getDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingApplications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No loan applications available for {profile.profile_type === 'lender' ? 'lending' : 'investment'}.</p>
              <p className="text-sm text-gray-400 mt-2">
                Borrowers need to submit loan applications for them to appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="mb-2">
                        <CurrencyDisplay amount={convertToKES(application.amount)} currency="KES" showToggle={false} />
                      </div>
                      <p className="text-sm text-gray-500">
                        {application.duration_months} months @ {application.interest_rate}%
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      {application.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    {application.monthly_payment && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Monthly Payment:</span>
                        <CurrencyDisplay amount={convertToKES(application.monthly_payment)} currency="KES" showToggle={false} />
                      </div>
                    )}
                    {application.total_payment && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Return:</span>
                        <CurrencyDisplay amount={convertToKES(application.total_payment)} currency="KES" showToggle={false} />
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">Funding Progress:</span>
                      <span className="font-medium">{application.funding_progress || 0}%</span>
                    </div>
                  </div>

                  {application.collateral && (
                    <div className="p-2 bg-gray-50 rounded text-sm">
                      <span className="text-gray-500">Collateral:</span>
                      <p className="font-medium">{application.collateral}</p>
                    </div>
                  )}

                  <div className="text-xs text-gray-400">
                    Applied: {format(new Date(application.created_at), 'MMM d, yyyy')}
                  </div>

                  <LoanOfferDialog loanApplication={application}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {profile.profile_type === 'lender' ? 'Make Loan Offer' : 'Make Investment Offer'}
                    </Button>
                  </LoanOfferDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorLoanView;
