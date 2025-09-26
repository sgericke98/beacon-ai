"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";

export default function Providers({ 
  children, 
  dehydratedState 
}: { 
  children: React.ReactNode; 
  dehydratedState?: unknown; 
}) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
