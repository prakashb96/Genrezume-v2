import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Register() {
  const handleSignUp = () => {
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
          <h1 className="text-3xl font-bold text-textprimary mb-2">Get Started</h1>
          <p className="text-slate-600">Create your account to start building your resume</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Sign up with your Google account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleSignUp} className="w-full">
              Sign Up with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}