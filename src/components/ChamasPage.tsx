
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrencyDisplay from '@/components/CurrencyDisplay';

const ChamasPage: React.FC = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChama, setNewChama] = useState({
    name: '',
    description: '',
    contributionAmount: '',
    contributionFrequency: 'monthly',
    maxMembers: '20'
  });

  // Mock data - will be replaced with actual Supabase queries
  const myChamas = [
    {
      id: '1',
      name: 'Unity Savings Group',
      description: 'Monthly savings for business investments',
      currentMembers: 12,
      maxMembers: 20,
      contributionAmount: 5000,
      contributionFrequency: 'monthly',
      totalSavings: 240000,
      role: 'admin',
      nextContribution: '2024-01-15'
    },
    {
      id: '2',
      name: 'School Fees Chama',
      description: 'Saving for children education',
      currentMembers: 8,
      maxMembers: 15,
      contributionAmount: 3000,
      contributionFrequency: 'monthly',
      totalSavings: 96000,
      role: 'member',
      nextContribution: '2024-01-12'
    }
  ];

  const handleCreateChama = () => {
    if (!newChama.name || !newChama.contributionAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Chama Created",
      description: `${newChama.name} has been created successfully`,
    });

    setNewChama({
      name: '',
      description: '',
      contributionAmount: '',
      contributionFrequency: 'monthly',
      maxMembers: '20'
    });
    setShowCreateForm(false);
  };

  const handleJoinChama = (chamaId: string, chamaName: string) => {
    toast({
      title: "Join Request Sent",
      description: `Your request to join ${chamaName} has been sent`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Digital Chamas</h1>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Chama
        </Button>
      </div>

      <Tabs defaultValue="my-chamas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-chamas">My Chamas</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="my-chamas" className="space-y-4">
          {showCreateForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Chama</CardTitle>
                <CardDescription>
                  Set up a new savings group with your friends or community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Chama Name *</Label>
                  <Input
                    id="name"
                    value={newChama.name}
                    onChange={(e) => setNewChama({...newChama, name: e.target.value})}
                    placeholder="Enter chama name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newChama.description}
                    onChange={(e) => setNewChama({...newChama, description: e.target.value})}
                    placeholder="What is this chama for?"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Contribution Amount (KES) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newChama.contributionAmount}
                      onChange={(e) => setNewChama({...newChama, contributionAmount: e.target.value})}
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <select
                      id="frequency"
                      value={newChama.contributionFrequency}
                      onChange={(e) => setNewChama({...newChama, contributionFrequency: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="maxMembers">Maximum Members</Label>
                  <Input
                    id="maxMembers"
                    type="number"
                    value={newChama.maxMembers}
                    onChange={(e) => setNewChama({...newChama, maxMembers: e.target.value})}
                    placeholder="20"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateChama}>Create Chama</Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {myChamas.map((chama) => (
              <Card key={chama.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {chama.name}
                        <Badge variant={chama.role === 'admin' ? 'default' : 'secondary'}>
                          {chama.role}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{chama.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {chama.currentMembers}/{chama.maxMembers} members
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <CurrencyDisplay amount={chama.contributionAmount} showToggle={false} className="text-sm" />
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <CurrencyDisplay amount={chama.totalSavings} showToggle={false} className="text-sm" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Next: {chama.nextContribution}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discover Chamas</CardTitle>
              <CardDescription>
                Find and join existing chamas in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: '3', name: 'Tech Entrepreneurs Chama', members: 15, maxMembers: 25, contribution: 10000 },
                  { id: '4', name: 'Women in Business', members: 20, maxMembers: 30, contribution: 7500 },
                  { id: '5', name: 'Youth Development Fund', members: 8, maxMembers: 20, contribution: 2500 }
                ].map((chama) => (
                  <div key={chama.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{chama.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chama.members}/{chama.maxMembers} members • 
                        <CurrencyDisplay amount={chama.contribution} showToggle={false} className="ml-1" />
                      </p>
                    </div>
                    <Button onClick={() => handleJoinChama(chama.id, chama.name)}>
                      Request to Join
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CurrencyDisplay amount={336000} className="text-2xl font-bold" />
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Chamas</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  Both performing well
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Contribution</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Jan 12</div>
                <p className="text-xs text-muted-foreground">
                  School Fees Chama
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChamasPage;
