
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Copy, Phone, CreditCard, Building } from 'lucide-react';
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EnhancedMakeContributionDialogProps {
  chamaId: string;
  onContributionMade?: () => void;
}

const EnhancedMakeContributionDialog: React.FC<EnhancedMakeContributionDialogProps> = ({
  chamaId,
  onContributionMade
}) => {
  const { toast } = useToast();
  const { paymentMethods, loading: methodsLoading, error: methodsError } = usePaymentMethods(chamaId);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'till':
        return <CreditCard className="h-4 w-4" />;
      case 'paybill':
        return <Building className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Payment details copied to clipboard",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);
      
      const { data, error } = await supabase.rpc('make_chama_contribution_with_approval', {
        p_chama_id: chamaId,
        p_amount: parseFloat(amount),
        p_payment_method: selectedMethod?.method_type || 'mobile_money',
        p_payment_reference: paymentReference || undefined,
        p_notes: notes || undefined,
        p_payment_method_id: selectedPaymentMethod
      });

      if (error) {
        console.error('Error making contribution:', error);
        toast({
          title: "Error",
          description: "Failed to submit contribution",
          variant: "destructive",
        });
        return;
      }

      const result = data as { success: boolean; message: string; treasurer_phone?: string };
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        
        setOpen(false);
        // Reset form
        setAmount('');
        setSelectedPaymentMethod('');
        setPaymentReference('');
        setNotes('');
        
        onContributionMade?.();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Unexpected error making contribution:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Make Contribution
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Make Contribution</DialogTitle>
          <DialogDescription>
            Choose a payment method and submit your contribution for treasurer approval
          </DialogDescription>
        </DialogHeader>

        {methodsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : methodsError ? (
          <div className="text-center text-red-600 py-4">
            Error loading payment methods
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (KES)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="0.01"
                required
              />
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <Label>Choose Payment Method</Label>
              <div className="grid gap-3">
                {paymentMethods.map((method) => (
                  <Card 
                    key={method.id}
                    className={`cursor-pointer transition-colors ${
                      selectedPaymentMethod === method.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getPaymentMethodIcon(method.method_type)}
                          <div>
                            <CardTitle className="text-base">{method.method_name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              {method.method_number}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(method.method_number);
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {method.method_type}
                        </Badge>
                      </div>
                    </CardHeader>
                    {selectedPaymentMethod === method.id && (
                      <CardContent className="pt-0">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            Send KES {amount || '___'} to <strong>{method.method_number}</strong>
                            {method.method_type === 'paybill' && (
                              <span> (Account: Your Phone Number)</span>
                            )}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Payment Reference */}
            <div className="space-y-2">
              <Label htmlFor="payment-reference">Payment Reference</Label>
              <Input
                id="payment-reference"
                placeholder="M-Pesa confirmation code (e.g., QEI2547XYZ)"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter the confirmation code you received after making the payment
              </p>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || !amount || parseFloat(amount) <= 0 || !selectedPaymentMethod}
                className="flex-1"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit for Approval'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedMakeContributionDialog;
