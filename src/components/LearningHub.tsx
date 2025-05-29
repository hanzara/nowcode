
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Award, Clock, TrendingUp } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface LearningContent {
  id: string;
  title: string;
  description: string;
  content_type: 'article' | 'video' | 'quiz';
  category: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  estimated_duration: number;
  content_body?: string;
  content_url?: string;
}

interface UserProgress {
  id: string;
  content_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  time_spent: number;
  completed_at?: string;
}

const LearningHub: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedContent, setSelectedContent] = useState<LearningContent | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const { data: learningContent = [], isLoading: contentLoading } = useQuery({
    queryKey: ['learning-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_content')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as LearningContent[];
    }
  });

  const { data: userProgress = [], isLoading: progressLoading } = useQuery({
    queryKey: ['user-progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_learning_progress')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as UserProgress[];
    },
    enabled: !!user
  });

  const { data: userTokens } = useQuery({
    queryKey: ['user-tokens', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user
  });

  const handleStartContent = async (content: LearningContent) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to start learning.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_learning_progress')
        .upsert({
          user_id: user.id,
          content_id: content.id,
          status: 'in_progress',
          time_spent: 0
        });

      if (error) throw error;

      setSelectedContent(content);
      toast({
        title: "Content Started",
        description: `You've started "${content.title}"`,
      });
    } catch (error) {
      console.error('Error starting content:', error);
      toast({
        title: "Error",
        description: "Failed to start content",
        variant: "destructive",
      });
    }
  };

  const handleCompleteContent = async (content: LearningContent, score?: number) => {
    if (!user) return;

    try {
      const { error: progressError } = await supabase
        .from('user_learning_progress')
        .upsert({
          user_id: user.id,
          content_id: content.id,
          status: 'completed',
          score: score,
          completed_at: new Date().toISOString()
        });

      if (progressError) throw progressError;

      // Award tokens for completion
      const tokenReward = content.content_type === 'quiz' ? 50 : 25;
      
      // Update user tokens
      await supabase.rpc('update_user_tokens', {
        p_user_id: user.id,
        p_amount: tokenReward,
        p_transaction_type: 'earn',
        p_source: 'learning',
        p_description: `Completed "${content.title}"`,
        p_reference_id: content.id
      });

      toast({
        title: "Congratulations!",
        description: `You earned ${tokenReward} VDO tokens for completing "${content.title}"`,
      });

      setSelectedContent(null);
    } catch (error) {
      console.error('Error completing content:', error);
      toast({
        title: "Error",
        description: "Failed to complete content",
        variant: "destructive",
      });
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'quiz': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressForContent = (contentId: string) => {
    return userProgress.find(p => p.content_id === contentId);
  };

  const filteredContent = learningContent.filter(content => {
    if (activeTab === 'all') return true;
    return content.category.toLowerCase().includes(activeTab);
  });

  const completedCount = userProgress.filter(p => p.status === 'completed').length;
  const totalContent = learningContent.length;
  const overallProgress = totalContent > 0 ? (completedCount / totalContent) * 100 : 0;

  if (selectedContent) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedContent(null)}
          >
            ← Back to Learning Hub
          </Button>
          <div className="flex items-center gap-2">
            <Badge className={getDifficultyColor(selectedContent.difficulty_level)}>
              {selectedContent.difficulty_level}
            </Badge>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {selectedContent.estimated_duration} min
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getContentIcon(selectedContent.content_type)}
              {selectedContent.title}
            </CardTitle>
            <CardDescription>{selectedContent.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedContent.content_type === 'video' && selectedContent.content_url ? (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <p className="text-gray-500">Video content would be displayed here</p>
              </div>
            ) : (
              <div className="prose max-w-none mb-4">
                <p>{selectedContent.content_body}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-500">
                Reward: {selectedContent.content_type === 'quiz' ? '50' : '25'} VDO tokens
              </div>
              <Button onClick={() => handleCompleteContent(selectedContent)}>
                Mark as Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}/{totalContent}</div>
            <Progress value={overallProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round(overallProgress)}% completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VDO Tokens</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTokens?.balance || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total earned: {userTokens?.total_earned || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              Days in a row
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="defi">DeFi Basics</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((content) => {
              const progress = getProgressForContent(content.id);
              return (
                <Card key={content.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(content.difficulty_level)}>
                        {content.difficulty_level}
                      </Badge>
                      {progress?.status === 'completed' && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {getContentIcon(content.content_type)}
                      {content.title}
                    </CardTitle>
                    <CardDescription>{content.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {content.estimated_duration} min
                      </span>
                      <span>{content.content_type}</span>
                    </div>
                    
                    {progress?.status === 'completed' ? (
                      <div className="text-center">
                        <Badge variant="secondary" className="mb-2">
                          {progress.score ? `Score: ${progress.score}%` : 'Completed'}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => setSelectedContent(content)}>
                          Review
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartContent(content)}
                        variant={progress?.status === 'in_progress' ? 'secondary' : 'default'}
                      >
                        {progress?.status === 'in_progress' ? 'Continue' : 'Start Learning'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningHub;
