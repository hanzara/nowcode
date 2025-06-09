
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, ArrowUpDown, Plus, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMobileMoney } from '@/hooks/useMobileMoney';

const MobileMoneyPage: React.FC = () => {
  const { toast } = useToast();
  const { accounts, loading } = useMobileMoney();
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    description: ''
  });

  const mobileProviders = [
    { id: 'mpesa', name: 'M-Pesa', color: 'bg-green-600' },
    { id: 'airtel', name: 'Airtel Money', color: 'bg-red-600' },
    { id: 'tkash', name: 'T-Kash', color: 'bg-blue-600' }
  ];

  const handleTransfer = async () => {
    if (!transferData.fromAccount || !transferData.toAccount || !transferData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate transfer processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Transfer Successful",
        description: `KES ${transferData.amount} transferred successfully`,
      });
      
      setTransferData({
        fromAccount: '',
        toAccount: '',
        amount: '',
        description: ''
      });
    } catch (error) {
      toast({
        title: "Transfer Failed",
        description: "Failed to process transfer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeposit = (provider: string, amount: number) => {
    toast({
      title: "Deposit Initiated",
      description: `Deposit of KES ${amount} from ${provider} initiated`,
    });
  };

  const handleWithdraw = (provider: string, amount: number) => {
    toast({
      title: "Withdrawal Initiated",
      description: `Withdrawal of KES ${amount} to ${provider} initiated`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Mobile Money</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Account
        </Button>
      </div>

      <Tabs defaultValue="transfer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="transfer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5" />
                Transfer Money
              </CardTitle>
              <CardDescription>
                Transfer money between your mobile money accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="from">From Account</Label>
                  <Select onValueChange={(value) => setTransferData({ ...transferData, fromAccount: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source account" />
                    </SelectTrigger>
                    <SelectContent>
                      {mobileProviders.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="to">To Account</Label>
                  <Select onValueChange={(value) => setTransferData({ ...transferData, toAccount: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                    <SelectContent>
                      {mobileProviders.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="amount">Amount (KES)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={transferData.description}
                  onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
                  placeholder="What is this transfer for?"
                />
              </div>
              <Button onClick={handleTransfer} className="w-full">
                Transfer Money
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposit" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mobileProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <div className={`w-12 h-12 ${provider.color} rounded-lg flex items-center justify-center mb-2`}>
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <CardDescription>
                    Deposit money from your {provider.name} account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Available Balance: KES 25,000
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleDeposit(provider.name, 1000)}
                      className="flex-1"
                    >
                      +1K
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleDeposit(provider.name, 5000)}
                      className="flex-1"
                    >
                      +5K
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleDeposit(provider.name, 10000)}
                      className="flex-1"
                    >
                      +10K
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    Custom Amount
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mobileProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <div className={`w-12 h-12 ${provider.color} rounded-lg flex items-center justify-center mb-2`}>
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <CardDescription>
                    Withdraw money to your {provider.name} account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Wallet Balance: KES 45,000
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWithdraw(provider.name, 1000)}
                      className="flex-1"
                    >
                      -1K
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWithdraw(provider.name, 5000)}
                      className="flex-1"
                    >
                      -5K
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWithdraw(provider.name, 10000)}
                      className="flex-1"
                    >
                      -10K
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    Custom Amount
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MobileMoneyPage;
