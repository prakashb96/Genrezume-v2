import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResumeBuilder from "@/pages/ResumeBuilder";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
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
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
