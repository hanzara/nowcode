
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useStaking, StakingPool } from '@/hooks/useStaking';
import { useToast } from "@/hooks/use-toast";

interface StakeDialogProps {
  pool: StakingPool;
}

const StakeDialog: React.FC<StakeDialogProps> = ({ pool }) => {
  const { createStake } = useStaking();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stakeAmount = parseFloat(amount);
    
    if (stakeAmount < pool.min_stake) {
      toast({
        title: "Error",
        description: `Minimum stake amount is $${pool.min_stake}`,
        variant: "destructive",
      });
      return;
    }

    if (pool.max_stake && stakeAmount > pool.max_stake) {
      toast({
        title: "Error",
        description: `Maximum stake amount is $${pool.max_stake}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await createStake(pool.id, stakeAmount);
      toast({
        title: "Success",
        description: "Successfully staked your funds!",
      });
      setIsOpen(false);
      setAmount('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stake funds",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const estimatedRewards = parseFloat(amount) * (pool.apy / 100);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-loan-primary hover:bg-blue-600">
          Stake Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Stake in {pool.name}
            <Badge variant="outline">{pool.currency}</Badge>
          </DialogTitle>
          <DialogDescription>
            Start earning {pool.apy}% APY on your staked funds
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Stake Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min={pool.min_stake}
              max={pool.max_stake || undefined}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Min: $${pool.min_stake}`}
              required
            />
            <div className="text-sm text-gray-500">
              Min: ${pool.min_stake} • Max: ${pool.max_stake || 'No limit'}
            </div>
          </div>

          {amount && parseFloat(amount) > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Annual rewards estimate:</span>
                <span className="font-medium">${estimatedRewards.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Monthly estimate:</span>
                <span className="font-medium">${(estimatedRewards / 12).toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !amount}>
              {isLoading ? 'Staking...' : 'Stake Funds'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StakeDialog;
