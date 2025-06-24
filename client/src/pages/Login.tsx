import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="text-white text-lg" />
            </div>
            <span className="text-2xl font-bold text-textprimary">Genrezume</span>
          </div>
          <h1 className="text-3xl font-bold text-textprimary mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to continue building your professional resume</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Sign in with your account to access the resume builder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full">
              Sign In with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}