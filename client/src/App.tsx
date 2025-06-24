import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import ResumeBuilder from "@/pages/ResumeBuilder";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/builder">
            <ResumeBuilder />
          </Route>
          <Route path="/templates">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-textprimary mb-4">Templates Coming Soon</h1>
                <p className="text-slate-600">We're working on a template gallery for you.</p>
              </div>
            </div>
          </Route>
          <Route path="/examples">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-textprimary mb-4">Examples Coming Soon</h1>
                <p className="text-slate-600">Resume examples will be available soon.</p>
              </div>
            </div>
          </Route>
          <Route path="/tips">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-textprimary mb-4">Tips Coming Soon</h1>
                <p className="text-slate-600">Resume writing tips will be available soon.</p>
              </div>
            </div>
          </Route>
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
