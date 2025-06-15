
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, ArrowUpDown, Plus, CreditCard, History, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMobileMoney } from '@/hooks/useMobileMoney';
import { useWallet } from '@/hooks/useWallet';
import MobileMoneyTransfer from './MobileMoneyTransfer';
import MobileMoneyHistory from './MobileMoneyHistory';
import CurrencyDisplay from './CurrencyDisplay';

const MobileMoneyPage: React.FC = () => {
  const { toast } = useToast();
  const { accounts, loading } = useMobileMoney();
  const { wallet } = useWallet();

  const mobileProviders = [
    { id: 'mpesa', name: 'M-Pesa', color: 'bg-green-600', users: '30M+' },
    { id: 'airtel', name: 'Airtel Money', color: 'bg-red-600', users: '15M+' },
    { id: 'tkash', name: 'T-Kash', color: 'bg-blue-600', users: '5M+' }
  ];

  const quickActions = [
    { name: 'Send Money', amount: 500, popular: true },
    { name: 'Buy Airtime', amount: 100, popular: false },
    { name: 'Pay Bills', amount: 1500, popular: true },
    { name: 'Buy Goods', amount: 2000, popular: false }
  ];

  const handleQuickDeposit = async (provider: string, amount: number) => {
    toast({
      title: "Deposit Initiated",
      description: `Deposit of KES ${amount.toLocaleString()} from ${provider} initiated. You will receive an SMS prompt shortly.`,
    });
  };

  const handleQuickWithdraw = async (provider: string, amount: number) => {
    if (!wallet || wallet.balance < amount / 130) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Withdrawal Initiated",
      description: `Withdrawal of KES ${amount.toLocaleString()} to ${provider} initiated`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mobile Money</h1>
          <p className="text-gray-500">Send, receive, and manage your mobile money transactions</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Link Account
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={(wallet?.balance || 0) * 130} showToggle={false} />
            </div>
            <p className="text-xs text-muted-foreground">
              Available for transfers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 45,230</div>
            <p className="text-xs text-muted-foreground">
              Total transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Linked Accounts</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
            <p className="text-xs text-muted-foreground">
              Mobile money accounts
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transfer" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="transfer" className="space-y-6">
          <MobileMoneyTransfer />
        </TabsContent>

        <TabsContent value="deposit" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mobileProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-md transition-shadow">
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
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Network Coverage:</span>
                      <span className="font-medium text-green-600">Nationwide</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span>Active Users:</span>
                      <span className="font-medium">{provider.users}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleQuickDeposit(provider.name, 1000)}
                      className="text-xs"
                    >
                      +1K
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleQuickDeposit(provider.name, 5000)}
                      className="text-xs"
                    >
                      +5K
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleQuickDeposit(provider.name, 10000)}
                      className="text-xs"
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
              <Card key={provider.id} className="hover:shadow-md transition-shadow">
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
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>Available Balance:</span>
                      <span className="font-medium">
                        <CurrencyDisplay amount={(wallet?.balance || 0) * 130} showToggle={false} />
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span>Daily Limit:</span>
                      <span className="font-medium">KES 150,000</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickWithdraw(provider.name, 1000)}
                      className="text-xs"
                    >
                      -1K
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickWithdraw(provider.name, 5000)}
                      className="text-xs"
                    >
                      -5K
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickWithdraw(provider.name, 10000)}
                      className="text-xs"
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

        <TabsContent value="history" className="space-y-6">
          <MobileMoneyHistory />
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common mobile money transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 relative"
              >
                {action.popular && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <div className="text-sm font-medium">{action.name}</div>
                <div className="text-xs text-gray-500">~KES {action.amount.toLocaleString()}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileMoneyPage;
