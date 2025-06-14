
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

type ChamaActivity = {
  id: string;
  activity_type: string;
  amount: number | null;
  description: string;
  created_at: string;
};

interface ChamaActivitiesProps {
  chamaId: string;
}

const ChamaActivities: React.FC<ChamaActivitiesProps> = ({ chamaId }) => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ChamaActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("chama_activities")
        .select("*")
        .eq("chama_id", chamaId)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) {
        setActivities([]);
        setLoading(false);
        return;
      }
      setActivities(data || []);
      setLoading(false);
    };

    if (user && chamaId) {
      fetchActivities();
    }
  }, [user, chamaId]);

  if (loading) {
    return (
      <Card className="mb-3">
        <CardHeader>
          <CardTitle>Recent Group Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Loader2 className="animate-spin" /> Loading...
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="mb-3">
        <CardHeader>
          <CardTitle>Recent Group Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>No recent activities</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle>Recent Group Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((a) => (
            <li key={a.id} className="text-sm border-b last:border-b-0 pb-2">
              <span className="font-semibold">{a.activity_type.replace("_", " ")}:</span>{" "}
              {a.description}
              {a.amount ? ` (KES ${a.amount.toFixed(2)})` : ""}
              <br />
              <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ChamaActivities;
