
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { FileText } from "lucide-react";

interface MyLoansProps {
  hasActiveLoan: boolean;
}

const MyLoans: React.FC<MyLoansProps> = ({ hasActiveLoan }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">My Loans</h1>
        <Button variant="outline">Filter</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
          <TabsTrigger value="all">All Loans</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          {hasActiveLoan ? (
            <div className="grid gap-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Loan #1893</CardTitle>
                      <CardDescription>Submitted on {new Date().toLocaleDateString()}</CardDescription>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Amount</p>
                      <p className="font-medium">5,000 USDC</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                      <p className="font-medium">5.2%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Duration</p>
                      <p className="font-medium">12 months</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Funding</p>
                      <p className="font-medium">0%</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Funding Progress</span>
                        <span className="text-sm font-medium">0/5,000 USDC</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">Cancel Request</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <div className="rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">No Loan History</h3>
              <p className="text-gray-500 mb-4">You haven't applied for any loans yet.</p>
              <Button variant="default" className="bg-loan-primary hover:bg-blue-600">
                Apply for a Loan
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="active" className="pt-4">
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="font-medium text-lg mb-2">No Active Loans</h3>
            <p className="text-gray-500">You don't have any active loans at the moment.</p>
          </div>
        </TabsContent>
        <TabsContent value="pending" className="pt-4">
          {hasActiveLoan ? (
            <div className="grid gap-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Loan #1893</CardTitle>
                      <CardDescription>Submitted on {new Date().toLocaleDateString()}</CardDescription>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">Pending</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Amount</p>
                      <p className="font-medium">5,000 USDC</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                      <p className="font-medium">5.2%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Duration</p>
                      <p className="font-medium">12 months</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Funding</p>
                      <p className="font-medium">0%</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Funding Progress</span>
                        <span className="text-sm font-medium">0/5,000 USDC</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">Cancel Request</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-lg mb-2">No Pending Loans</h3>
              <p className="text-gray-500">You don't have any pending loan requests.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyLoans;
