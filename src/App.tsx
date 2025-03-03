
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Facebook browser compatibility wrapper
const FacebookCompatibilityProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Check if running in Facebook browser
    const isFacebookBrowser = 
      navigator.userAgent.indexOf("FBAN") > -1 || 
      navigator.userAgent.indexOf("FBAV") > -1;
      
    if (isFacebookBrowser) {
      // Force layout recalculation in Facebook browser
      document.body.style.opacity = '0.99';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
      
      // Add Facebook-specific CSS fixes
      const style = document.createElement('style');
      style.textContent = `
        /* Facebook browser fixes */
        html, body { width: 100% !important; overflow-x: hidden !important; }
        #root { width: 100% !important; max-width: 100vw !important; overflow-x: hidden !important; }
        * { -webkit-overflow-scrolling: touch !important; }
      `;
      document.head.appendChild(style);
      
      return () => document.head.removeChild(style);
    }
  }, []);
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FacebookCompatibilityProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FacebookCompatibilityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
