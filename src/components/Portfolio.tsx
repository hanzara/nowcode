
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Briefcase, Calendar, Star, DollarSign, TrendingUp } from "lucide-react";
import { useUserProfile } from '@/hooks/useUserProfile';
import CreateProfileDialog from './CreateProfileDialog';

const Portfolio: React.FC = () => {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
        </div>
        <div className="text-center py-12">Loading portfolio...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
        </div>
        <Card className="border-0 shadow-md">
          <CardHeader className="text-center">
            <CardTitle>Create Your Portfolio</CardTitle>
            <CardDescription>
              Set up your investor or borrower profile to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CreateProfileDialog />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
        <Badge variant={profile.profile_type === 'investor' ? 'default' : 'secondary'}>
          {profile.profile_type === 'investor' ? 'Investor' : 'Borrower'}
        </Badge>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>
                {profile.display_name?.split(' ').map(n => n[0]).join('') || 'UN'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile.display_name || 'Anonymous User'}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                {profile.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                )}
                {profile.profession && (
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {profile.profession}
                  </div>
                )}
                {profile.experience_years && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {profile.experience_years} years experience
                  </div>
                )}
              </div>
            </div>
            <Badge 
              variant={profile.verification_status === 'verified' ? 'default' : 'outline'}
              className="capitalize"
            >
              {profile.verification_status}
            </Badge>
          </div>
          {profile.bio && (
            <p className="text-gray-600 mt-4">{profile.bio}</p>
          )}
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {profile.profile_type === 'investor' ? 'Total Funded' : 'Total Borrowed'}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${profile.profile_type === 'investor' ? profile.total_funded || 0 : profile.total_borrowed || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  All time {profile.profile_type === 'investor' ? 'funding' : 'borrowing'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profile.success_rate || 0}%</div>
                <p className="text-xs text-muted-foreground">
                  {profile.profile_type === 'investor' ? 'Successful loans' : 'On-time repayments'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.5%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="pt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                No recent activity found
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="pt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your portfolio settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Edit Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;
