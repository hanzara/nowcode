import React, { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateP2POfferDialog } from "./CreateP2POfferDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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
  user_profiles?: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

const P2PMarketplace: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["p2p-listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("p2p_listings")
        .select(`
          *,
          user_profiles(display_name, avatar_url)
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching p2p listings with profiles", error);
        throw error;
      }
      
      return (data || []);
    },
    enabled: !!user,
  });

  // Refresh listings on new offer
  const handleOfferCreated = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["p2p-listings"] });
  }, [queryClient]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">P2P Trading Marketplace</h1>
        <p className="text-muted-foreground">
          Buy or sell crypto safely with escrow and in-app chat. Create your own offer or respond to existing ones.
        </p>
      </div>
      <div className="mb-2">
        <CreateP2POfferDialog onCreated={handleOfferCreated} />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                  <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
               <CardFooter>
                 <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              </CardFooter>
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
            <Card key={listing.id} className="hover:shadow-lg transition-all flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={listing.user_profiles?.avatar_url || ''} alt={listing.user_profiles?.display_name || 'User'} />
                    <AvatarFallback>{(listing.user_profiles?.display_name || 'U').charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{listing.user_profiles?.display_name || 'Anonymous User'}</p>
                    <p className="text-xs text-muted-foreground">98% Completion • 25 Trades</p>
                  </div>
                </div>
                 <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Badge
                      variant={"outline"}
                      className={cn(
                        "font-bold",
                        listing.type === "buy" ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"
                      )}
                    >
                      {listing.type.toUpperCase()}
                    </Badge>
                    <span>
                      {listing.amount} {listing.asset}
                    </span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-grow">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">{listing.currency} {listing.price_per_unit} / {listing.asset}</span>
                </div>
                 <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-medium">{listing.amount} {listing.asset}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium">{listing.payment_method}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant={listing.type === 'buy' ? 'default' : 'destructive'} className="w-full" disabled>
                  {listing.type === "buy" ? "Sell" : "Buy"} {listing.asset}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default P2PMarketplace;
