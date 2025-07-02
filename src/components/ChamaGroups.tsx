
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, PlusCircle, CreditCard, History, Settings, Activity } from 'lucide-react';
import CurrencyDisplay from './CurrencyDisplay';
import { useToast } from "@/hooks/use-toast";
import ChamaContributions from './ChamaContributions';
import ChamaMemberManagement from './ChamaMemberManagement';
import ChamaActivities from './ChamaActivities';

interface ChamaGroupsProps {
  chamaData: any;
  isTreasurer: boolean;
  chamaId: string;
}

const ChamaGroups: React.FC<ChamaGroupsProps> = ({ chamaData, isTreasurer, chamaId }) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `${action} feature will be available soon!`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Group Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Group Wallet</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CurrencyDisplay 
              amount={chamaData.total_savings || 0}
              className="text-2xl font-bold"
            />
            <p className="text-xs text-muted-foreground">Central wallet balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Savings</CardTitle>
            <PlusCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CurrencyDisplay 
              amount={chamaData.totalContributed || 0}
              className="text-2xl font-bold"
            />
            <p className="text-xs text-muted-foreground">Your total contributions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chamaData.current_members}/{chamaData.max_members}
            </div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>
      </div>

      {/* Group Management Tabs */}
      <Tabs defaultValue="balances" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="balances">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Balances</CardTitle>
                <CardDescription>Overview of all group funds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Main Group Wallet</p>
                    <p className="text-sm text-muted-foreground">General contributions</p>
                  </div>
                  <CurrencyDisplay 
                    amount={chamaData.total_savings || 0}
                    className="text-lg font-semibold"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Education Fund</p>
                    <p className="text-sm text-muted-foreground">Dedicated education savings</p>
                  </div>
                  <CurrencyDisplay 
                    amount={15000}
                    className="text-lg font-semibold"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Emergency Fund</p>
                    <p className="text-sm text-muted-foreground">Emergency assistance fund</p>
                  </div>
                  <CurrencyDisplay 
                    amount={25000}
                    className="text-lg font-semibold"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Individual Savings</CardTitle>
                <CardDescription>Your savings breakdown within this group</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                  <div>
                    <p className="font-medium">Regular Contributions</p>
                    <p className="text-sm text-muted-foreground">Monthly contributions</p>
                  </div>
                  <CurrencyDisplay 
                    amount={chamaData.totalContributed || 0}
                    className="text-lg font-semibold"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Education Contributions</p>
                    <p className="text-sm text-muted-foreground">Your education fund</p>
                  </div>
                  <CurrencyDisplay 
                    amount={3000}
                    className="text-lg font-semibold"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contributions">
          <ChamaContributions chamaId={chamaId} />
        </TabsContent>

        <TabsContent value="loans">
          <div className="space-y-6">
            {/* Loan Request Section */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Management</CardTitle>
                <CardDescription>Request loans and track your loan status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleAction("Request Loan")}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Request New Loan
                </Button>
                
                {/* Current Loan Status */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Current Loan Status</h4>
                    <Badge variant="outline">No Active Loans</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You don't have any active loan requests or outstanding loans.
                  </p>
                </div>

                {/* Loan History */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Loan History</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Previous loans will appear here</span>
                      <Button variant="outline" size="sm" onClick={() => handleAction("View History")}>
                        <History className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <ChamaMemberManagement chamaId={chamaId} />
        </TabsContent>

        <TabsContent value="activity">
          <ChamaActivities chamaId={chamaId} />
        </TabsContent>
      </Tabs>

      {/* Treasurer-specific actions */}
      {isTreasurer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Treasurer Actions
            </CardTitle>
            <CardDescription>Special actions available to treasurers</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => handleAction("Record Deposit")}
            >
              <PlusCircle className="h-6 w-6 mb-2" />
              Record Deposit
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => handleAction("Process Withdrawal")}
            >
              <CreditCard className="h-6 w-6 mb-2" />
              Process Payment
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => handleAction("View Pending")}
            >
              <Activity className="h-6 w-6 mb-2" />
              Pending Contributions
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChamaGroups;
