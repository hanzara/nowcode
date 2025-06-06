
import React from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/hooks/useAuth';
import CreateProfileDialog from './CreateProfileDialog';
import InvestorLoanView from './InvestorLoanView';
import LoanMarketplace from './LoanMarketplace';
import DatabaseHealthCheck from './DatabaseHealthCheck';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-4">Please log in to access the dashboard.</div>;
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to LendChain!</h2>
        <p className="text-gray-600 mb-6">
          To get started, please create your profile and choose your role on the platform.
        </p>
        <CreateProfileDialog />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {profile.display_name || user.email}!
        </h1>
        <p className="text-gray-600">
          Role: {profile.profile_type.charAt(0).toUpperCase() + profile.profile_type.slice(1)}
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {profile.profile_type === 'borrower' ? (
            <LoanMarketplace />
          ) : (
            <InvestorLoanView />
          )}
        </TabsContent>
        
        <TabsContent value="marketplace" className="space-y-6">
          <LoanMarketplace />
        </TabsContent>
        
        <TabsContent value="health" className="space-y-6">
          <DatabaseHealthCheck />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
