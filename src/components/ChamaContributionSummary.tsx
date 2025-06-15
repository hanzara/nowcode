
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Users, Calendar } from 'lucide-react';
import { ContributionSummary } from '@/hooks/useChamaContributions';

interface ChamaContributionSummaryProps {
  contributionSummary: ContributionSummary[];
  loading: boolean;
}

const ChamaContributionSummary: React.FC<ChamaContributionSummaryProps> = ({
  contributionSummary,
  loading
}) => {
  const totalContributions = contributionSummary.reduce((sum, member) => sum + member.total_contributed, 0);
  const activeContributors = contributionSummary.filter(member => member.total_contributed > 0).length;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Contribution Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Loader2 className="animate-spin h-4 w-4" />
            <span>Loading contribution data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Contributions</p>
                <p className="text-2xl font-bold">KES {totalContributions.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Contributors</p>
                <p className="text-2xl font-bold">{activeContributors}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Average Contribution</p>
                <p className="text-2xl font-bold">
                  KES {activeContributors > 0 ? Math.round(totalContributions / activeContributors).toLocaleString() : '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Contributions */}
      <Card>
        <CardHeader>
          <CardTitle>Member Contributions</CardTitle>
          <CardDescription>
            Individual contribution summary for all members
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contributionSummary.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No contribution data available
            </p>
          ) : (
            <div className="space-y-4">
              {contributionSummary.map((member) => (
                <div
                  key={member.member_id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{member.member_email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">
                            {member.contribution_count} contributions
                          </Badge>
                          {member.last_contribution_date && (
                            <p className="text-sm text-muted-foreground">
                              Last: {new Date(member.last_contribution_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      KES {member.total_contributed.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {totalContributions > 0 
                        ? `${((member.total_contributed / totalContributions) * 100).toFixed(1)}% of total`
                        : '0% of total'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChamaContributionSummary;
