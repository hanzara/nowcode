
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, PlusCircle, AlertCircle, CreditCard, Activity } from 'lucide-react';
import CurrencyDisplay from './CurrencyDisplay';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChamaDashboardProps {
  chamaData: any;
  isTreasurer: boolean;
  chamaId: string;
}

const ChamaDashboard: React.FC<ChamaDashboardProps> = ({ chamaData, isTreasurer, chamaId }) => {
  const { toast } = useToast();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawalDialogOpen, setWithdrawalDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mobile_money');

  const handleRecordDeposit = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically call an API to record the deposit
    toast({
      title: "Success",
      description: `Deposit of KES ${amount} recorded successfully`,
    });
    setDepositDialogOpen(false);
    setAmount('');
  };

  const handleProcessPayment = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically call an API to process the payment
    toast({
      title: "Success",
      description: `Payment of KES ${amount} processed successfully`,
    });
    setWithdrawalDialogOpen(false);
    setAmount('');
  };

  const handleViewPending = () => {
    toast({
      title: "Info",
      description: "Viewing pending contributions - this would show a detailed list",
    });
  };

  const handleReviewLoans = () => {
    toast({
      title: "Info",
      description: "Opening loan requests for review",
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Wallet Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CurrencyDisplay 
              amount={5000} // This would come from user wallet
              className="text-2xl font-bold"
            />
            <p className="text-xs text-muted-foreground">Individual wallet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">720</div>
            <p className="text-xs text-muted-foreground">Good standing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Legacy Points</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Redeemable points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Group Balance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CurrencyDisplay 
              amount={chamaData.total_savings || 0}
              className="text-2xl font-bold"
            />
            <p className="text-xs text-muted-foreground">Total group savings</p>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Status */}
      <Card>
        <CardHeader>
          <CardTitle>Contribution Status</CardTitle>
          <CardDescription>Your contribution status for this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">Monthly Contribution</p>
                <p className="text-sm text-muted-foreground">Due: End of month</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="default">Paid</Badge>
              <CurrencyDisplay 
                amount={chamaData.contribution_amount}
                className="text-sm text-muted-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treasurer-specific sections */}
      {isTreasurer && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Pending Actions
              </CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Pending Contributions</p>
                  <p className="text-sm text-muted-foreground">3 members haven't contributed</p>
                </div>
                <Button size="sm" onClick={handleViewPending}>
                  Review
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Loan Requests</p>
                  <p className="text-sm text-muted-foreground">2 requests awaiting approval</p>
                </div>
                <Button size="sm" onClick={handleReviewLoans}>
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common treasurer tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start" variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Record Manual Deposit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Record Manual Deposit</DialogTitle>
                    <DialogDescription>Record a manual deposit to the chama account</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="deposit-amount">Amount (KES)</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div>
                      <Label>Payment Method</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile_money">Mobile Money</SelectItem>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleRecordDeposit} className="w-full">
                      Record Deposit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={withdrawalDialogOpen} onOpenChange={setWithdrawalDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payment/Withdrawal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Process Payment/Withdrawal</DialogTitle>
                    <DialogDescription>Process a payment or withdrawal from the chama account</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="withdrawal-amount">Amount (KES)</Label>
                      <Input
                        id="withdrawal-amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div>
                      <Label>Payment Method</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile_money">Mobile Money</SelectItem>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleProcessPayment} className="w-full">
                      Process Payment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent transactions and group updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border-l-4 border-green-500 bg-green-50">
              <PlusCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Contribution Made</p>
                <p className="text-sm text-muted-foreground">You contributed KES 5,000 • 2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">New Member Joined</p>
                <p className="text-sm text-muted-foreground">John Doe joined the group • 1 week ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border-l-4 border-orange-500 bg-orange-50">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium">Credit Score Update</p>
                <p className="text-sm text-muted-foreground">Your credit score increased to 720 • 2 weeks ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChamaDashboard;
