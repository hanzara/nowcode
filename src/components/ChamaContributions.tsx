
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wallet, History, TrendingUp } from 'lucide-react';
import { useChamaContributions } from '@/hooks/useChamaContributions';
import { useChamaMembers } from '@/hooks/useChamaMembers';
import MakeContributionDialog from './MakeContributionDialog';
import ChamaContributionSummary from './ChamaContributionSummary';

interface ChamaContributionsProps {
  chamaId: string;
}

const ChamaContributions: React.FC<ChamaContributionsProps> = ({ chamaId }) => {
  const { canManageChama } = useChamaMembers(chamaId);
  const {
    contributions,
    contributionSummary,
    loading,
    error,
    makeContribution
  } = useChamaContributions(chamaId);

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-destructive">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contributions</h2>
          <p className="text-muted-foreground">
            Manage and track chama contributions
          </p>
        </div>
        <MakeContributionDialog onMakeContribution={makeContribution} />
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <ChamaContributionSummary
            contributionSummary={contributionSummary}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Contribution History
              </CardTitle>
              <CardDescription>
                Recent contributions to this chama
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8">Loading contributions...</p>
              ) : contributions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No contributions recorded yet
                </p>
              ) : (
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <div
                      key={contribution.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">
                            KES {contribution.amount.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">
                              {contribution.payment_method.replace('_', ' ')}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {new Date(contribution.contribution_date).toLocaleDateString()}
                            </p>
                          </div>
                          {contribution.notes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {contribution.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={contribution.status === 'completed' ? 'default' : 'secondary'}
                        >
                          {contribution.status}
                        </Badge>
                        {contribution.payment_reference && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Ref: {contribution.payment_reference}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChamaContributions;
