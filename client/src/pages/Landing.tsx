import { Button } from "@/components/ui/button";
import { FileText, Zap, Download, Users } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Genrezume</span>
          </div>
          <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Your Perfect
            <span className="text-blue-600 block">Professional Resume</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build stunning resumes with our intuitive builder. Choose from professional templates, 
            get real-time previews, and export to PDF in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3"
            >
              View Templates
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-white shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Create professional resumes in minutes with our streamlined builder process.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
            <p className="text-gray-600">
              Export your resume as a high-quality PDF ready for job applications.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-white shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Templates</h3>
            <p className="text-gray-600">
              Choose from a variety of professional templates that match your style.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Join thousands of professionals who have created their perfect resume with Genrezume.
          </p>
          <Button 
            size="lg" 
            onClick={handleLogin}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Start Building Now
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Genrezume. Built with ❤️ for job seekers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}