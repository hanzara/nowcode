
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface P2PListing {
  id: string;
  user_id: string;
  type: "buy" | "sell";
  asset: string;
  amount: number;
  price_per_unit: number;
  currency: string;
  payment_method: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

const P2PMarketplace: React.FC = () => {
  const { user } = useAuth();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["p2p-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("p2p_listings")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as P2PListing[];
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">P2P Trading Marketplace</h1>
        <p className="text-muted-foreground">
          Buy or sell crypto safely with escrow and in-app chat. Create your own offer or respond to existing ones.
        </p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.length === 0 && (
            <div className="text-center col-span-3 text-gray-500 py-8">
              No listings available yet. Be the first to create an offer!
            </div>
          )}
          {listings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Badge
                      variant={listing.type === "buy" ? "default" : "secondary"}
                      className={listing.type === "buy" ? "bg-green-200 text-green-800" : "bg-blue-200 text-blue-800"}
                    >
                      {listing.type.toUpperCase()}
                    </Badge>
                    <span>
                      {listing.amount} {listing.asset}
                    </span>
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {listing.currency} {listing.price_per_unit}/unit
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription>
                  Payment Method: <span className="font-medium">{listing.payment_method}</span>
                </CardDescription>
                {listing.description && (
                  <div className="text-sm text-gray-600">{listing.description}</div>
                )}
                {/* Button to act on the listing (buy/sell) - implementation will be expanded later */}
                <Button variant="outline" className="w-full" disabled>
                  {listing.type === "buy" ? "Sell to this Offer (Coming Soon)" : "Buy from this Offer (Coming Soon)"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default P2PMarketplace;
