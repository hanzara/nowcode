
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon } from "lucide-react";

const Wallet: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = () => {
    setIsConnected(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
        {isConnected && (
          <Button variant="outline">Disconnect</Button>
        )}
      </div>

      {!isConnected ? (
        <Card className="border-0 shadow-md">
          <CardHeader className="text-center">
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Connect your wallet to view balances and make transactions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-6">
            <div className="rounded-full bg-blue-100 w-20 h-20 flex items-center justify-center mb-6">
              <WalletIcon className="h-10 w-10 text-loan-primary" />
            </div>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              You need to connect your wallet to access your funds, view loan details, 
              and make repayments or withdrawals.
            </p>
            <Button onClick={connectWallet} className="bg-loan-primary hover:bg-blue-600">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-0 shadow-md col-span-2">
              <CardHeader>
                <CardTitle>Wallet Balance</CardTitle>
                <CardDescription>Your available funds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6">
                    <p className="text-sm opacity-80 mb-1">Available Balance</p>
                    <h2 className="text-3xl font-bold mb-3">5,000 USDC</h2>
                    <p className="text-sm opacity-80">Connected: 0x71C...A3F8</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-loan-primary hover:bg-blue-600">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Withdraw
                    </Button>
                    <Button variant="outline">
                      <ArrowDownLeft className="mr-2 h-4 w-4" />
                      Deposit
                    </Button>
                    
                    <Button className="bg-loan-primary hover:bg-blue-600">
                      Repay Loan
                    </Button>
                    <Button variant="outline">
                      Add Collateral
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Collateral Assets</CardTitle>
                <CardDescription>Your locked collateral</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-gray-500">No assets currently locked as collateral</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <Tabs defaultValue="all" className="w-full">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="deposits">Deposits</TabsTrigger>
                  <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="pt-4">
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No transactions yet</p>
                  </div>
                </CardContent>
              </TabsContent>
              <TabsContent value="deposits" className="pt-4">
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No deposit transactions</p>
                  </div>
                </CardContent>
              </TabsContent>
              <TabsContent value="withdrawals" className="pt-4">
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No withdrawal transactions</p>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </>
      )}
    </div>
  );
};

export default Wallet;
