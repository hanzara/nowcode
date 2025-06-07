
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from '@/hooks/useWallet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Wifi, Phone, Car, Home, CreditCard } from "lucide-react";

const BillPayments: React.FC = () => {
  const { wallet, fetchWalletData } = useWallet();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [billData, setBillData] = useState({
    provider: '',
    accountNumber: '',
    amount: '',
    billType: ''
  });

  const billCategories = [
    { id: 'electricity', name: 'Electricity', icon: Zap, providers: ['Kenya Power', 'Umeme', 'TANESCO'] },
    { id: 'water', name: 'Water', icon: Home, providers: ['Nairobi Water', 'NWSC', 'DAWASCO'] },
    { id: 'internet', name: 'Internet', icon: Wifi, providers: ['Safaricom Fiber', 'Zuku', 'Liquid Telecom'] },
    { id: 'mobile', name: 'Mobile Airtime', icon: Phone, providers: ['Safaricom', 'Airtel', 'Telkom'] },
    { id: 'insurance', name: 'Insurance', icon: Car, providers: ['NHIF', 'Jubilee', 'CIC'] },
    { id: 'credit', name: 'Credit Cards', icon: CreditCard, providers: ['KCB', 'Equity', 'Standard Chartered'] }
  ];

  const handlePayBill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!billData.provider || !billData.accountNumber || !billData.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(billData.amount);
    if (amount > (wallet?.balance || 0)) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this payment",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate bill payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful",
        description: `Bill payment of ${amount} USDC to ${billData.provider} completed successfully`,
      });
      
      setBillData({ provider: '', accountNumber: '', amount: '', billType: '' });
      await fetchWalletData();
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Failed to process bill payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Bill Payments</h1>
        <div className="text-sm text-gray-500">
          Balance: {wallet?.balance || 0} USDC
        </div>
      </div>

      <Tabs defaultValue="utilities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
          <TabsTrigger value="telecom">Telecom</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="utilities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {billCategories.filter(cat => ['electricity', 'water'].includes(cat.id)).map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <category.icon className="h-12 w-12 mx-auto text-blue-600" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayBill} className="space-y-3">
                    <div>
                      <Label>Provider</Label>
                      <Select onValueChange={(value) => setBillData(prev => ({ ...prev, provider: value, billType: category.id }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {category.providers.map(provider => (
                            <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Account Number</Label>
                      <Input
                        value={billData.accountNumber}
                        onChange={(e) => setBillData(prev => ({ ...prev, accountNumber: e.target.value }))}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div>
                      <Label>Amount (USDC)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={billData.amount}
                        onChange={(e) => setBillData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter amount"
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Processing...' : 'Pay Bill'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="telecom" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {billCategories.filter(cat => ['internet', 'mobile'].includes(cat.id)).map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <category.icon className="h-12 w-12 mx-auto text-green-600" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayBill} className="space-y-3">
                    <div>
                      <Label>Provider</Label>
                      <Select onValueChange={(value) => setBillData(prev => ({ ...prev, provider: value, billType: category.id }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {category.providers.map(provider => (
                            <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{category.id === 'mobile' ? 'Phone Number' : 'Account Number'}</Label>
                      <Input
                        value={billData.accountNumber}
                        onChange={(e) => setBillData(prev => ({ ...prev, accountNumber: e.target.value }))}
                        placeholder={category.id === 'mobile' ? '+254 700 000 000' : 'Enter account number'}
                      />
                    </div>
                    <div>
                      <Label>Amount (USDC)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={billData.amount}
                        onChange={(e) => setBillData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter amount"
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Processing...' : category.id === 'mobile' ? 'Buy Airtime' : 'Pay Bill'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {billCategories.filter(cat => ['insurance', 'credit'].includes(cat.id)).map((category) => (
              <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="text-center">
                  <category.icon className="h-12 w-12 mx-auto text-purple-600" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayBill} className="space-y-3">
                    <div>
                      <Label>Provider</Label>
                      <Select onValueChange={(value) => setBillData(prev => ({ ...prev, provider: value, billType: category.id }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {category.providers.map(provider => (
                            <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Account/Policy Number</Label>
                      <Input
                        value={billData.accountNumber}
                        onChange={(e) => setBillData(prev => ({ ...prev, accountNumber: e.target.value }))}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div>
                      <Label>Amount (USDC)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={billData.amount}
                        onChange={(e) => setBillData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="Enter amount"
                      />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Processing...' : 'Pay Bill'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillPayments;
