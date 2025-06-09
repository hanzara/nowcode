
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CommunityPage from "./pages/CommunityPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/marketplace" element={<Index />} />
          <Route path="/my-loans" element={<Index />} />
          <Route path="/portfolio" element={<Index />} />
          <Route path="/insights" element={<Index />} />
          <Route path="/staking" element={<Index />} />
          <Route path="/wallet" element={<Index />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/education" element={<Index />} />
          <Route path="/bill-payments" element={<Index />} />
          <Route path="/savings-goals" element={<Index />} />
          <Route path="/qr-payments" element={<Index />} />
          <Route path="/mobile-money" element={<Index />} />
          <Route path="/disputes" element={<Index />} />
          <Route path="/token-management" element={<Index />} />
          <Route path="/settings" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
