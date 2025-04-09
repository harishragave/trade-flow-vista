
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TradeProvider } from "@/contexts/TradeContext";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Imports from "./pages/Imports";
import Exports from "./pages/Exports";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Partners from "./pages/Partners";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { toast } from "sonner";
import { useEffect } from "react";

// Create a query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const App = () => {
  // Simulate database connection message
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("Connected to simulated MySQL database", {
        description: "Using sample data to demonstrate functionality",
        duration: 5000,
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TradeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="imports" element={<Imports />} />
                <Route path="exports" element={<Exports />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="reports" element={<Reports />} />
                <Route path="partners" element={<Partners />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TradeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
