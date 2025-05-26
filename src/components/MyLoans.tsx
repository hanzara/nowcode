
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { FileText } from "lucide-react";
import { useLoans } from '@/hooks/useLoans';

const MyLoans: React.FC = () => {
  const { userApplications, loading } = useLoans();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeLoans = userApplications.filter(app => app.status === 'active');
  const pendingLoans = userApplications.filter(app => app.status === 'pending');

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">My Loans</h1>
        </div>
        <div className="text-center py-12">Loading your loans...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">My Loans</h1>
        <Button variant="outline">Filter</Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
          <TabsTrigger value="all">All Loans</TabsTrigger>
          <TabsTrigger value="active">Active ({activeLoans.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingLoans.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-4">
          {userApplications.length > 0 ? (
            <div className="grid gap-4">
              {userApplications.map((application) => (
                <Card key={application.id} className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Loan Application #{application.id.slice(0, 8)}</CardTitle>
                        <CardDescription>Submitted on {new Date(application.created_at).toLocaleDateString()}</CardDescription>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Amount</p>
                        <p className="font-medium">{application.amount} USDC</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                        <p className="font-medium">{application.interest_rate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                        <p className="font-medium">{application.duration_months} months</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Funding</p>
                        <p className="font-medium">{application.funding_progress}%</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Funding Progress</span>
                          <span className="text-sm font-medium">{application.funding_progress}%</span>
                        </div>
                        <Progress value={application.funding_progress} className="h-2" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        {application.status === 'pending' && (
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                            Cancel Request
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
          {activeLoans.length > 0 ? (
            <div className="grid gap-4">
              {activeLoans.map((loan) => (
                <Card key={loan.id} className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Loan #{loan.id.slice(0, 8)}</CardTitle>
                        <CardDescription>Active since {new Date(loan.created_at).toLocaleDateString()}</CardDescription>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(loan.status)}`}>
                        Active
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Amount</p>
                        <p className="font-medium">{loan.amount} USDC</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Monthly Payment</p>
                        <p className="font-medium">{loan.monthly_payment} USDC</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Remaining</p>
                        <p className="font-medium">{loan.duration_months} months</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                        <p className="font-medium">Due in 15 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <h3 className="font-medium text-lg mb-2">No Active Loans</h3>
              <p className="text-gray-500">You don't have any active loans at the moment.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="pt-4">
          {pendingLoans.length > 0 ? (
            <div className="grid gap-4">
              {pendingLoans.map((loan) => (
                <Card key={loan.id} className="border-0 shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Loan Application #{loan.id.slice(0, 8)}</CardTitle>
                        <CardDescription>Submitted on {new Date(loan.created_at).toLocaleDateString()}</CardDescription>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(loan.status)}`}>
                        Pending
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Amount</p>
                        <p className="font-medium">{loan.amount} USDC</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Interest Rate</p>
                        <p className="font-medium">{loan.interest_rate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                        <p className="font-medium">{loan.duration_months} months</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Funding</p>
                        <p className="font-medium">{loan.funding_progress}%</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Funding Progress</span>
                          <span className="text-sm font-medium">{loan.funding_progress}%</span>
                        </div>
                        <Progress value={loan.funding_progress} className="h-2" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">Cancel Request</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
