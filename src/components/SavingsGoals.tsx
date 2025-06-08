
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from '@/hooks/useWallet';
import { PiggyBank, Target, Calendar, TrendingUp, Plus } from "lucide-react";
import CurrencyDisplay from './CurrencyDisplay';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  autoSave: boolean;
  autoSaveAmount: number;
}

const SavingsGoals: React.FC = () => {
  const { wallet, fetchWalletData } = useWallet();
  const { toast } = useToast();
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 5000,
      currentAmount: 1200,
      targetDate: '2024-12-31',
      category: 'Emergency',
      autoSave: true,
      autoSaveAmount: 100
    },
    {
      id: '2',
      name: 'New Phone',
      targetAmount: 800,
      currentAmount: 320,
      targetDate: '2024-08-15',
      category: 'Electronics',
      autoSave: false,
      autoSaveAmount: 0
    }
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    category: 'General',
    autoSave: false,
    autoSaveAmount: ''
  });

  const categories = ['Emergency', 'Travel', 'Electronics', 'Education', 'Home', 'Car', 'General'];

  // Convert USD amounts to KES for display
  const convertToKES = (usdAmount: number) => usdAmount * 130;

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      targetDate: newGoal.targetDate,
      category: newGoal.category,
      autoSave: newGoal.autoSave,
      autoSaveAmount: newGoal.autoSave ? parseFloat(newGoal.autoSaveAmount) : 0
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      name: '',
      targetAmount: '',
      targetDate: '',
      category: 'General',
      autoSave: false,
      autoSaveAmount: ''
    });
    setIsCreateOpen(false);
    
    toast({
      title: "Goal Created",
      description: `Savings goal "${goal.name}" has been created successfully`,
    });
  };

  const handleContributeToGoal = async (goalId: string, amount: number) => {
    if (amount > (wallet?.balance || 0)) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this contribution",
        variant: "destructive",
      });
      return;
    }

    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: goal.currentAmount + amount }
        : goal
    ));

    toast({
      title: "Contribution Added",
      description: `${amount} USDC added to your savings goal`,
    });
    
    await fetchWalletData();
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysToTarget = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Savings Goals</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Savings Goal</DialogTitle>
              <DialogDescription>
                Set up a new savings goal to help you reach your financial targets
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <Label>Goal Name</Label>
                <Input
                  value={newGoal.name}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Vacation Fund"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Target Amount (USDC)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label>Target Date</Label>
                  <Input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoSave"
                  checked={newGoal.autoSave}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, autoSave: e.target.checked }))}
                />
                <Label htmlFor="autoSave">Enable Auto-Save</Label>
              </div>
              {newGoal.autoSave && (
                <div>
                  <Label>Auto-Save Amount (USDC per week)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newGoal.autoSaveAmount}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, autoSaveAmount: e.target.value }))}
                    placeholder="50"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Goal</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={convertToKES(goals.reduce((sum, goal) => sum + goal.currentAmount, 0))} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Targets</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CurrencyDisplay amount={convertToKES(goals.reduce((sum, goal) => sum + goal.targetAmount, 0))} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Save Active</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.filter(g => g.autoSave).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const daysToTarget = getDaysToTarget(goal.targetDate);
          const remainingAmount = goal.targetAmount - goal.currentAmount;

          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                    <CardDescription>{goal.category}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{progress.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">
                      {daysToTarget > 0 ? `${daysToTarget} days left` : 'Overdue'}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="w-full" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Current</div>
                    <div className="font-medium">
                      <CurrencyDisplay amount={convertToKES(goal.currentAmount)} showToggle={false} />
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Target</div>
                    <div className="font-medium">
                      <CurrencyDisplay amount={convertToKES(goal.targetAmount)} showToggle={false} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Remaining: </span>
                    <span className="font-medium">
                      <CurrencyDisplay amount={convertToKES(remainingAmount)} showToggle={false} />
                    </span>
                  </div>
                  {goal.autoSave && (
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Auto-save: {goal.autoSaveAmount} USDC/week
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleContributeToGoal(goal.id, 50)}
                    className="flex-1"
                  >
                    Add $50
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleContributeToGoal(goal.id, 100)}
                    className="flex-1"
                  >
                    Add $100
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals;
