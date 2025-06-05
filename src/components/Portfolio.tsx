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
              Set up your investor, lender, or borrower profile to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CreateProfileDialog />
          </CardContent>
        </Card>
      </div>
    );
  }

  const getBadgeVariant = () => {
    if (profile.profile_type === 'investor' || profile.profile_type === 'lender') {
      return 'default';
    }
    return 'secondary';
  };

  const getProfileTypeDisplay = () => {
    switch (profile.profile_type) {
      case 'investor':
        return 'Investor';
      case 'lender':
        return 'Lender';
      case 'borrower':
        return 'Borrower';
      default:
        return profile.profile_type;
    }
  };

  const getMetricLabel = () => {
    switch (profile.profile_type) {
      case 'lender':
        return 'Total Lent';
      case 'investor':
        return 'Total Invested';
      case 'borrower':
        return 'Total Borrowed';
      default:
        return 'Total Amount';
    }
  };

  const getMetricValue = () => {
    if (profile.profile_type === 'borrower') {
      return profile.total_borrowed || 0;
    }
    return profile.total_funded || 0;
  };

  const getSuccessRateLabel = () => {
    switch (profile.profile_type) {
      case 'lender':
        return 'Successful loans';
      case 'investor':
        return 'Successful investments';
      case 'borrower':
        return 'On-time repayments';
      default:
        return 'Success rate';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
        <Badge variant={getBadgeVariant()}>
          {getProfileTypeDisplay()}
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
                  {getMetricLabel()}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${getMetricValue()}
                </div>
                <p className="text-xs text-muted-foreground">
                  All time {profile.profile_type === 'borrower' ? 'borrowing' : profile.profile_type === 'lender' ? 'lending' : 'investing'}
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
                  {getSuccessRateLabel()}
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

          {/* Role-specific capabilities info */}
          <Card className="border-0 shadow-sm mt-6">
            <CardHeader>
              <CardTitle>Your Capabilities</CardTitle>
              <CardDescription>
                What you can do as a {getProfileTypeDisplay().toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                {profile.profile_type === 'borrower' && (
                  <>
                    <div className="flex items-center text-green-600">
                      ✓ Apply for loans
                    </div>
                    <div className="flex items-center text-green-600">
                      ✓ Manage loan applications
                    </div>
                    <div className="flex items-center text-green-600">
                      ✓ Track repayment schedules
                    </div>
                  </>
                )}
                {(profile.profile_type === 'investor' || profile.profile_type === 'lender') && (
                  <>
                    <div className="flex items-center text-green-600">
                      ✓ View all loan applications
                    </div>
                    <div className="flex items-center text-green-600">
                      ✓ Make loan offers
                    </div>
                    <div className="flex items-center text-green-600">
                      ✓ Fund loans
                    </div>
                    <div className="flex items-center text-green-600">
                      ✓ Manage disputes
                    </div>
                    <div className="flex items-center text-green-600">
                      ✓ Post notifications
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
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
