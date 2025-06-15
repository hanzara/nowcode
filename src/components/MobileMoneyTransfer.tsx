
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpDown, AlertCircle, Check, Clock, CreditCard } from 'lucide-react';
import { useMobileMoney } from '@/hooks/useMobileMoney';
import { useWallet } from '@/hooks/useWallet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import CurrencyDisplay from './CurrencyDisplay';

interface TransferData {
  fromAccount: string;
  toAccount: string;
  toPhoneNumber: string;
  amount: string;
  description: string;
  recipientName: string;
}

const MobileMoneyTransfer: React.FC = () => {
  const { toast } = useToast();
  const { accounts, loading: accountsLoading } = useMobileMoney();
  const { wallet, fetchWalletData } = useWallet();
  const { user } = useAuth();
  const [transferData, setTransferData] = useState<TransferData>({
    fromAccount: '',
    toAccount: '',
    toPhoneNumber: '',
    amount: '',
    description: '',
    recipientName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [transferStep, setTransferStep] = useState<'form' | 'confirm' | 'processing' | 'success'>('form');
  const [errors, setErrors] = useState<Partial<TransferData>>({});

  const mobileProviders = [
    { id: 'mpesa', name: 'M-Pesa', color: 'bg-green-600', prefix: '254' },
    { id: 'airtel_money', name: 'Airtel Money', color: 'bg-red-600', prefix: '254' },
    { id: 'tkash', name: 'T-Kash', color: 'bg-blue-600', prefix: '254' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<TransferData> = {};

    if (!transferData.fromAccount) {
      newErrors.fromAccount = 'Please select a source account';
    }
    if (!transferData.toAccount) {
      newErrors.toAccount = 'Please select a destination provider';
    }
    if (!transferData.toPhoneNumber) {
      newErrors.toPhoneNumber = 'Please enter recipient phone number';
    } else if (!/^(\+?254|0)?[17]\d{8}$/.test(transferData.toPhoneNumber.replace(/\s/g, ''))) {
      newErrors.toPhoneNumber = 'Please enter a valid Kenyan phone number';
    }
    if (!transferData.amount) {
      newErrors.amount = 'Please enter an amount';
    } else {
      const amount = parseFloat(transferData.amount);
      if (amount <= 0) {
        newErrors.amount = 'Amount must be greater than 0';
      } else if (amount < 10) {
        newErrors.amount = 'Minimum transfer amount is KES 10';
      } else if (amount > 300000) {
        newErrors.amount = 'Maximum transfer amount is KES 300,000';
      }
    }
    if (!transferData.recipientName) {
      newErrors.recipientName = 'Please enter recipient name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      return `+254${cleaned.substring(1)}`;
    } else if (cleaned.startsWith('254')) {
      return `+${cleaned}`;
    }
    return `+254${cleaned}`;
  };

  const calculateFees = (amount: number, provider: string): number => {
    // Simplified fee structure
    if (amount <= 100) return 11;
    if (amount <= 500) return 25;
    if (amount <= 1000) return 30;
    if (amount <= 5000) return 55;
    if (amount <= 10000) return 105;
    return Math.min(amount * 0.015, 300);
  };

  const handleTransferSubmit = () => {
    if (!validateForm()) return;
    setTransferStep('confirm');
  };

  const processTransfer = async () => {
    setIsProcessing(true);
    setTransferStep('processing');

    try {
      const amount = parseFloat(transferData.amount);
      const fees = calculateFees(amount, transferData.toAccount);
      const totalAmount = amount + fees;

      // Check wallet balance
      if (!wallet || wallet.balance < totalAmount / 130) { // Convert KES to USD
        throw new Error('Insufficient wallet balance');
      }

      // Simulate transfer processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update wallet balance
      const newBalance = wallet.balance - (totalAmount / 130);
      await supabase
        .from('user_wallets')
        .update({ balance: newBalance })
        .eq('user_id', user?.id);

      // Create transaction record
      await supabase
        .from('wallet_transactions')
        .insert({
          user_id: user?.id,
          type: 'mobile_money_transfer',
          amount: -(totalAmount / 130),
          description: `Transfer to ${transferData.recipientName} (${formatPhoneNumber(transferData.toPhoneNumber)}) - ${transferData.description || 'Mobile money transfer'}`,
          status: 'completed'
        });

      await fetchWalletData();
      setTransferStep('success');

      toast({
        title: "Transfer Successful",
        description: `KES ${amount.toLocaleString()} sent to ${transferData.recipientName}`,
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setTransferData({
          fromAccount: '',
          toAccount: '',
          toPhoneNumber: '',
          amount: '',
          description: '',
          recipientName: ''
        });
        setTransferStep('form');
      }, 3000);

    } catch (error) {
      console.error('Transfer error:', error);
      toast({
        title: "Transfer Failed",
        description: error instanceof Error ? error.message : "Failed to process transfer. Please try again.",
        variant: "destructive",
      });
      setTransferStep('form');
    } finally {
      setIsProcessing(false);
    }
  };

  const goBack = () => {
    setTransferStep('form');
    setErrors({});
  };

  if (transferStep === 'success') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Transfer Successful!</h3>
          <p className="text-gray-600 mb-4">
            KES {parseFloat(transferData.amount).toLocaleString()} has been sent to {transferData.recipientName}
          </p>
          <div className="text-sm text-gray-500">
            <p>Reference: TXN{Date.now().toString().slice(-8)}</p>
            <p>To: {formatPhoneNumber(transferData.toPhoneNumber)}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transferStep === 'processing') {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Processing Transfer...</h3>
          <p className="text-gray-600 mb-4">
            Please wait while we process your transfer
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transferStep === 'confirm') {
    const amount = parseFloat(transferData.amount);
    const fees = calculateFees(amount, transferData.toAccount);
    const totalAmount = amount + fees;
    const providerName = mobileProviders.find(p => p.id === transferData.toAccount)?.name;

    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Confirm Transfer
          </CardTitle>
          <CardDescription>
            Please review the transfer details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">From:</span>
              <span className="font-medium">Your Wallet</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">To:</span>
              <span className="font-medium">{transferData.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{formatPhoneNumber(transferData.toPhoneNumber)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Provider:</span>
              <span className="font-medium">{providerName}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">KES {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fees:</span>
                <span className="font-medium">KES {fees.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Total:</span>
                <span>KES {totalAmount.toLocaleString()}</span>
              </div>
            </div>
            {transferData.description && (
              <div className="flex justify-between">
                <span className="text-gray-600">Note:</span>
                <span className="font-medium text-right max-w-32">{transferData.description}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={goBack} className="flex-1">
              Back
            </Button>
            <Button onClick={processTransfer} disabled={isProcessing} className="flex-1">
              {isProcessing ? 'Processing...' : 'Confirm Transfer'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          Transfer Money
        </CardTitle>
        <CardDescription>
          Send money to any mobile money account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="from">From Account</Label>
          <Select 
            onValueChange={(value) => setTransferData({ ...transferData, fromAccount: value })}
            value={transferData.fromAccount}
          >
            <SelectTrigger className={errors.fromAccount ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select source account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wallet">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Wallet - <CurrencyDisplay amount={(wallet?.balance || 0) * 130} showToggle={false} /></span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.fromAccount && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.fromAccount}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="recipientName">Recipient Name</Label>
          <Input
            id="recipientName"
            value={transferData.recipientName}
            onChange={(e) => setTransferData({ ...transferData, recipientName: e.target.value })}
            placeholder="Enter recipient's full name"
            className={errors.recipientName ? 'border-red-500' : ''}
          />
          {errors.recipientName && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.recipientName}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="to">To Provider</Label>
          <Select 
            onValueChange={(value) => setTransferData({ ...transferData, toAccount: value })}
            value={transferData.toAccount}
          >
            <SelectTrigger className={errors.toAccount ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select destination provider" />
            </SelectTrigger>
            <SelectContent>
              {mobileProviders.map(provider => (
                <SelectItem key={provider.id} value={provider.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${provider.color} rounded`}></div>
                    {provider.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.toAccount && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.toAccount}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={transferData.toPhoneNumber}
            onChange={(e) => setTransferData({ ...transferData, toPhoneNumber: e.target.value })}
            placeholder="0712345678 or +254712345678"
            className={errors.toPhoneNumber ? 'border-red-500' : ''}
          />
          {errors.toPhoneNumber && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.toPhoneNumber}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="amount">Amount (KES)</Label>
          <Input
            id="amount"
            type="number"
            value={transferData.amount}
            onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
            placeholder="Enter amount"
            min="10"
            max="300000"
            className={errors.amount ? 'border-red-500' : ''}
          />
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.amount}
            </p>
          )}
          {transferData.amount && !errors.amount && (
            <p className="text-sm text-gray-500 mt-1">
              Fee: KES {calculateFees(parseFloat(transferData.amount), transferData.toAccount).toLocaleString()}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            value={transferData.description}
            onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
            placeholder="What is this transfer for?"
            maxLength={50}
          />
        </div>

        <Button 
          onClick={handleTransferSubmit} 
          className="w-full" 
          disabled={isProcessing || accountsLoading}
        >
          Review Transfer
        </Button>
      </CardContent>
    </Card>
  );
};

export default MobileMoneyTransfer;
