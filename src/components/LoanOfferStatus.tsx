
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLoanOffers } from '@/hooks/useLoanOffers';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import CurrencyDisplay from './CurrencyDisplay';

interface LoanOfferStatusProps {
  loanApplicationId: string;
}

const LoanOfferStatus: React.FC<LoanOfferStatusProps> = ({ loanApplicationId }) => {
  const { offers, updateOfferStatus } = useLoanOffers();
  const { toast } = useToast();

  const applicationOffers = offers.filter(offer => offer.loan_application_id === loanApplicationId);

  const handleAcceptOffer = async (offerId: string) => {
    try {
      await updateOfferStatus(offerId, 'accepted');
      toast({
        title: "Offer Accepted",
        description: "The loan offer has been accepted. Funding will be processed shortly.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRejectOffer = async (offerId: string) => {
    try {
      await updateOfferStatus(offerId, 'rejected');
      toast({
        title: "Offer Rejected",
        description: "The loan offer has been rejected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (applicationOffers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Loan Offers</CardTitle>
          <CardDescription>No offers received yet for this application</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Loan Offers ({applicationOffers.length})</CardTitle>
        <CardDescription>Review and manage offers from investors and lenders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {applicationOffers.map((offer) => (
          <div key={offer.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CurrencyDisplay usdAmount={offer.offered_amount} />
                  <Badge variant={
                    offer.status === 'accepted' ? 'default' :
                    offer.status === 'rejected' ? 'destructive' :
                    'secondary'
                  }>
                    {offer.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Interest Rate: {offer.offered_interest_rate}%
                </p>
                {offer.message && (
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <p className="font-medium">Message from lender:</p>
                    <p>{offer.message}</p>
                  </div>
                )}
              </div>
              
              {offer.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleAcceptOffer(offer.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRejectOffer(offer.id)}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
            
            <div className="text-xs text-gray-400">
              Offered: {format(new Date(offer.created_at), 'MMM d, yyyy HH:mm')}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LoanOfferStatus;
