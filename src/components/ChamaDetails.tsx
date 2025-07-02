
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, TrendingUp, Settings, MessageSquare, History, PlusCircle } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import CurrencyDisplay from './CurrencyDisplay';
import ChamaActivities from './ChamaActivities';
import ChamaChat from './ChamaChat';
import ChamaMemberManagement from './ChamaMemberManagement';
import ChamaContributions from './ChamaContributions';

const ChamaDetails: React.FC = () => {
  const { chamaId } = useParams<{ chamaId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: chamaData, isLoading } = useQuery({
    queryKey: ['chama-details', chamaId],
    queryFn: async () => {
      if (!user || !chamaId) return null;
      
      const { data, error } = await supabase
        .from('chama_members')
        .select(`
          id,
          role,
          total_contributed,
          joined_at,
          chamas (
            id, name, description, contribution_amount, contribution_frequency,
            max_members, current_members, total_savings, status, created_at
          )
        `)
        .eq('user_id', user.id)
        .eq('chama_id', chamaId)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      
      return {
        memberId: data.id,
        role: data.role,
        totalContributed: data.total_contributed,
        joinedAt: data.joined_at,
        ...data.chamas
      };
    },
    enabled: !!user && !!chamaId
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!chamaData) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">Chama Not Found</h3>
        <p className="text-gray-600 mb-4">You don't have access to this chama or it doesn't exist.</p>
        <Button onClick={() => navigate('/community')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Community
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/community')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{chamaData.name}</h1>
              <Badge variant={chamaData.role === 'admin' ? 'default' : 'secondary'}>
                {chamaData.role}
              </Badge>
            </div>
            <p className="text-gray-600">{chamaData.description}</p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CurrencyDisplay 
              amount={chamaData.total_savings || 0}
              className="text-2xl font-bold"
            />
            <p className="text-xs text-muted-foreground">Group total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Contributions</CardTitle>
            <PlusCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CurrencyDisplay 
              amount={chamaData.totalContributed || 0}
              className="text-2xl font-bold"
            />
            <p className="text-xs text-muted-foreground">Your total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contribution</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CurrencyDisplay 
              amount={chamaData.contribution_amount}
              className="text-2xl font-bold"
            />
            <p className="text-xs text-muted-foreground capitalize">
              Per {chamaData.contribution_frequency}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Chama Information</CardTitle>
                <CardDescription>Basic details about this savings group</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="text-sm">{formatDate(chamaData.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">You Joined</p>
                    <p className="text-sm">{formatDate(chamaData.joinedAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge variant="outline" className="capitalize">
                      {chamaData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Frequency</p>
                    <p className="text-sm capitalize">{chamaData.contribution_frequency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks for this chama</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => toast({ title: "Feature Coming Soon", description: "Contribution feature will be available soon!" })}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Make Contribution
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => toast({ title: "Feature Coming Soon", description: "Loan request feature will be available soon!" })}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Request Loan
                </Button>
                {(chamaData.role === 'admin' || chamaData.role === 'treasurer') && (
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => toast({ title: "Feature Coming Soon", description: "Settings feature will be available soon!" })}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Settings
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contributions">
          <ChamaContributions chamaId={chamaId!} />
        </TabsContent>

        <TabsContent value="members">
          <ChamaMemberManagement chamaId={chamaId!} />
        </TabsContent>

        <TabsContent value="activities">
          <ChamaActivities chamaId={chamaId!} />
        </TabsContent>

        <TabsContent value="chat">
          <ChamaChat chamaId={chamaId!} memberId={chamaData.memberId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChamaDetails;
