
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, TrendingUp, PieChart, FileText, Clock } from "lucide-react";
import { useLoans } from '@/hooks/useLoans';
import { useAuth } from '@/hooks/useAuth';

interface DashboardProps {
  onApply: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onApply }) => {
  const { user } = useAuth();
  const { userApplications, loading } = useLoans();

  const hasActiveLoan = userApplications.length > 0;
  const latestApplication = userApplications[0];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Welcome back, {user?.email}</span>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Loan Status</CardTitle>
            <CardDescription>Your current loan application status</CardDescription>
          </CardHeader>
          <CardContent>
            {!hasActiveLoan ? (
              <div className="text-center py-6">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-loan-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">No Active Loans</h3>
                <p className="text-gray-500 mb-4">You don't have any active loans at the moment.</p>
                <Button onClick={onApply} variant="default" className="bg-loan-primary hover:bg-blue-600">
                  Apply for a Loan
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 px-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center">
                    <div className="rounded-full bg-amber-100 p-2 mr-3">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium capitalize">{latestApplication.status}</h3>
                      <p className="text-sm text-gray-500">
                        Submitted on {new Date(latestApplication.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-amber-600">{latestApplication.amount} USDC</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-sm text-gray-500 mb-1">Interest Rate</h4>
                    <p className="font-semibold text-lg">{latestApplication.interest_rate}%</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="text-sm text-gray-500 mb-1">Duration</h4>
                    <p className="font-semibold text-lg">{latestApplication.duration_months} months</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="w-full flex justify-between items-center">
              <a href="#" className="text-loan-primary text-sm font-medium flex items-center hover:underline" onClick={() => {}}>
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <div className="rounded-full bg-green-100 p-1.5 mr-2">
                  <TrendingUp className="h-4 w-4 text-green-700" />
                </div>
                Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between" onClick={() => {}}>
                  My Loans <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between" onClick={onApply}>
                  Loan Marketplace <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between" onClick={() => {}}>
                  Connect Wallet <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <div className="rounded-full bg-blue-100 p-1.5 mr-2">
                  <PieChart className="h-4 w-4 text-blue-700" />
                </div>
                Credit Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Credit Score</span>
                  <span className="font-medium">720</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-loan-secondary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-sm text-gray-500">Your credit score is good. You're eligible for most loan options.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
