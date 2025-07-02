
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLoanOffers } from '@/hooks/useLoanOffers';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import CurrencyDisplay from './CurrencyDisplay';
import { Eye, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';

interface LoanOfferStatusProps {
  loanApplicationId: string;
}

const LoanOfferStatus: React.FC<LoanOfferStatusProps> = ({ loanApplicationId }) => {
  const { offers, updateOfferStatus } = useLoanOffers();
  const { toast } = useToast();
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const applicationOffers = offers.filter(offer => offer.loan_application_id === loanApplicationId);

  const handleAcceptOffer = async (offerId: string) => {
    setActionLoading(offerId);
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
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectOffer = async (offerId: string) => {
    setActionLoading(offerId);
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
    } finally {
      setActionLoading(null);
    }
  };

  // Convert USD amounts to KES for display
  const convertToKES = (usdAmount: number) => usdAmount * 130;

  // Categorize offers
  const pendingOffers = applicationOffers.filter(offer => offer.status === 'pending');
  const acceptedOffers = applicationOffers.filter(offer => offer.status === 'accepted');
  const rejectedOffers = applicationOffers.filter(offer => offer.status === 'rejected');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (applicationOffers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Loan Offers
          </CardTitle>
          <CardDescription>No offers received yet for this application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Waiting for investors to make offers...</p>
            <p className="text-sm mt-1">You'll be notified when offers come in</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Loan Offers ({applicationOffers.length})
          </div>
          <div className="flex gap-2">
            {pendingOffers.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {pendingOffers.length} Pending
              </Badge>
            )}
            {acceptedOffers.length > 0 && (
              <Badge className="text-xs bg-green-600">
                {acceptedOffers.length} Accepted
              </Badge>
            )}
          </div>
        </CardTitle>
        <CardDescription>Review and manage offers from investors and lenders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pending Offers First */}
        {pendingOffers.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              Pending Offers ({pendingOffers.length})
            </h4>
            {pendingOffers.map((offer) => (
              <div key={offer.id} className="border rounded-lg p-4 space-y-3 bg-yellow-50 border-yellow-200">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <CurrencyDisplay amount={convertToKES(offer.offered_amount)} />
                      <Badge className={`text-xs ${getStatusColor(offer.status)}`}>
                        {getStatusIcon(offer.status)}
                        <span className="ml-1">{offer.status}</span>
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Interest Rate:</span>
                        <p className="font-medium">{offer.offered_interest_rate}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Offered:</span>
                        <p className="font-medium">{format(new Date(offer.created_at), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => handleAcceptOffer(offer.id)}
                      disabled={actionLoading === offer.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {actionLoading === offer.id ? 'Accepting...' : 'Accept'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRejectOffer(offer.id)}
                      disabled={actionLoading === offer.id}
                    >
                      {actionLoading === offer.id ? 'Rejecting...' : 'Reject'}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedOffer(offer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Offer Details</DialogTitle>
                          <DialogDescription>
                            Review the complete offer information
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Offered Amount</label>
                              <div className="text-lg font-bold">
                                <CurrencyDisplay amount={convertToKES(offer.offered_amount)} />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Interest Rate</label>
                              <div className="text-lg font-bold">{offer.offered_interest_rate}%</div>
                            </div>
                          </div>
                          {offer.message && (
                            <div>
                              <label className="text-sm font-medium">Message from Lender</label>
                              <div className="mt-1 p-3 bg-gray-50 rounded text-sm">
                                {offer.message}
                              </div>
                            </div>
                          )}
                          <div className="text-xs text-gray-500">
                            Offer made on {format(new Date(offer.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                {offer.message && (
                  <div className="p-3 bg-white rounded text-sm border-l-4 border-blue-500">
                    <p className="font-medium text-gray-700">Message from lender:</p>
                    <p className="mt-1">{offer.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Accepted Offers */}
        {acceptedOffers.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Accepted Offers ({acceptedOffers.length})
            </h4>
            {acceptedOffers.map((offer) => (
              <div key={offer.id} className="border rounded-lg p-4 space-y-3 bg-green-50 border-green-200">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CurrencyDisplay amount={convertToKES(offer.offered_amount)} />
                      <Badge className={`text-xs ${getStatusColor(offer.status)}`}>
                        {getStatusIcon(offer.status)}
                        <span className="ml-1">{offer.status}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Funding in Progress
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Interest Rate: {offer.offered_interest_rate}%
                    </p>
                  </div>
                </div>
                
                {offer.message && (
                  <div className="p-3 bg-white rounded text-sm">
                    <p className="font-medium text-gray-700">Message from lender:</p>
                    <p className="mt-1">{offer.message}</p>
                  </div>
                )}
                
                <div className="text-xs text-gray-400">
                  Accepted: {format(new Date(offer.updated_at), 'MMM d, yyyy HH:mm')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rejected Offers */}
        {rejectedOffers.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Rejected Offers ({rejectedOffers.length})
            </h4>
            {rejectedOffers.map((offer) => (
              <div key={offer.id} className="border rounded-lg p-4 space-y-3 bg-gray-50 border-gray-200 opacity-75">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CurrencyDisplay amount={convertToKES(offer.offered_amount)} />
                      <Badge className={`text-xs ${getStatusColor(offer.status)}`}>
                        {getStatusIcon(offer.status)}
                        <span className="ml-1">{offer.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Interest Rate: {offer.offered_interest_rate}%
                    </p>
                  </div>
                </div>
                
                <div className="text-xs text-gray-400">
                  Rejected: {format(new Date(offer.updated_at), 'MMM d, yyyy HH:mm')}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LoanOfferStatus;
