
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider';
import Index from '@/pages/index';
import NotFound from '@/pages/NotFound';

// Lazy load the FAQ component
const FAQ = lazy(() => import('./pages/FAQ'));

const queryClient = new QueryClient();

function App() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="dark">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/faq" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FAQ />
                </Suspense>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </QueryClientProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
