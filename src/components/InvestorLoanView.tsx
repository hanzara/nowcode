
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLoans } from '@/hooks/useLoans';
import { useUserProfile } from '@/hooks/useUserProfile';
import LoanOfferDialog from './LoanOfferDialog';
import { format } from 'date-fns';

const InvestorLoanView: React.FC = () => {
  const { userApplications: loanApplications, loading } = useLoans();
  const { profile } = useUserProfile();

  if (!profile || (profile.profile_type !== 'investor' && profile.profile_type !== 'lender')) {
    return null;
  }

  if (loading) {
    return <div className="text-center py-4">Loading loan applications...</div>;
  }

  const pendingApplications = loanApplications.filter(app => app.status === 'pending');

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Investment Opportunities</CardTitle>
        <CardDescription>
          Browse loan applications from borrowers seeking funding
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pendingApplications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No loan applications available for investment.</p>
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
                    <h3 className="font-semibold text-lg">{application.amount} USDC</h3>
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
                      <span className="font-medium">{application.monthly_payment} USDC</span>
                    </div>
                  )}
                  {application.total_payment && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Return:</span>
                      <span className="font-medium">{application.total_payment} USDC</span>
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
                    Make Offer
                  </Button>
                </LoanOfferDialog>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestorLoanView;
