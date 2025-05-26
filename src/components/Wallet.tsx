
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon } from "lucide-react";
import { useWallet } from '@/hooks/useWallet';

const Wallet: React.FC = () => {
  const { wallet, transactions, loading, connectWallet } = useWallet();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
        </div>
        <div className="text-center py-12">Loading wallet...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
        {wallet?.is_connected && (
          <Button variant="outline">Disconnect</Button>
        )}
      </div>

      {!wallet?.is_connected ? (
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
                    <h2 className="text-3xl font-bold mb-3">{wallet.balance} {wallet.currency}</h2>
                    <p className="text-sm opacity-80">Connected: {wallet.wallet_address?.slice(0, 6)}...{wallet.wallet_address?.slice(-4)}</p>
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
                {wallet.locked_collateral > 0 ? (
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Locked Amount</span>
                      <span className="font-medium">{wallet.locked_collateral} {wallet.currency}</span>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 text-center">
                    <p className="text-gray-500">No assets currently locked as collateral</p>
                  </div>
                )}
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
                  {transactions.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No transactions yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                              transaction.type === 'deposit' ? 'bg-green-100' : 
                              transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-blue-100'
                            }`}>
                              {transaction.type === 'deposit' ? (
                                <ArrowDownLeft className="h-4 w-4 text-green-600" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium capitalize">{transaction.type.replace('_', ' ')}</p>
                              <p className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{transaction.amount} {transaction.currency}</p>
                            <p className={`text-sm ${
                              transaction.status === 'completed' ? 'text-green-600' : 
                              transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {transaction.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </TabsContent>
              <TabsContent value="deposits" className="pt-4">
                <CardContent>
                  {transactions.filter(t => t.type === 'deposit').length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No deposit transactions</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transactions.filter(t => t.type === 'deposit').map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-green-100">
                              <ArrowDownLeft className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Deposit</p>
                              <p className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">+{transaction.amount} {transaction.currency}</p>
                            <p className="text-sm text-green-600">{transaction.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </TabsContent>
              <TabsContent value="withdrawals" className="pt-4">
                <CardContent>
                  {transactions.filter(t => t.type === 'withdrawal').length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No withdrawal transactions</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transactions.filter(t => t.type === 'withdrawal').map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full bg-red-100">
                              <ArrowUpRight className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium">Withdrawal</p>
                              <p className="text-sm text-gray-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">-{transaction.amount} {transaction.currency}</p>
                            <p className="text-sm text-red-600">{transaction.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
