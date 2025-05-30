
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWallet } from '@/hooks/useWallet';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const WalletActions: React.FC = () => {
  const { wallet, fetchWalletData } = useWallet();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please enter amount and select payment method",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Update wallet balance
      const newBalance = (wallet?.balance || 0) + parseFloat(amount);
      await supabase
        .from('user_wallets')
        .update({ balance: newBalance })
        .eq('user_id', user?.id);

      // Create transaction record
      await supabase
        .from('wallet_transactions')
        .insert({
          user_id: user?.id,
          type: 'deposit',
          amount: parseFloat(amount),
          description: `Deposit via ${paymentMethod}`,
          status: 'completed'
        });

      await fetchWalletData();
      toast({
        title: "Deposit Successful",
        description: `${amount} USDC has been added to your wallet`,
      });
      setIsDepositOpen(false);
      setAmount('');
      setPaymentMethod('');
    } catch (error) {
      toast({
        title: "Deposit Failed",
        description: "Failed to process deposit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !paymentMethod) {
      toast({
        title: "Error",
        description: "Please enter amount and select payment method",
        variant: "destructive",
      });
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > (wallet?.balance || 0)) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Update wallet balance
      const newBalance = (wallet?.balance || 0) - withdrawAmount;
      await supabase
        .from('user_wallets')
        .update({ balance: newBalance })
        .eq('user_id', user?.id);

      // Create transaction record
      await supabase
        .from('wallet_transactions')
        .insert({
          user_id: user?.id,
          type: 'withdrawal',
          amount: -withdrawAmount,
          description: `Withdrawal to ${paymentMethod}`,
          status: 'completed'
        });

      await fetchWalletData();
      toast({
        title: "Withdrawal Successful",
        description: `${amount} USDC has been withdrawn from your wallet`,
      });
      setIsWithdrawOpen(false);
      setAmount('');
      setPaymentMethod('');
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Failed to process withdrawal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700">
            Deposit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>
              Add funds to your wallet
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDeposit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount (USDC)</Label>
              <Input
                id="deposit-amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit-method">Payment Method</Label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="mobile-money">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDepositOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Deposit'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Withdraw funds from your wallet
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount (USDC)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                max={wallet?.balance || 0}
              />
              <p className="text-sm text-gray-500">
                Available balance: {wallet?.balance || 0} USDC
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdraw-method">Withdrawal Method</Label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select withdrawal method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="crypto-address">Crypto Address</SelectItem>
                  <SelectItem value="mobile-money">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsWithdrawOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Withdraw'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletActions;
