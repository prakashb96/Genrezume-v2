import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, Download, Sparkles, ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: FileText,
      title: "Multiple Templates",
      description: "Choose from 5 professional templates designed to impress recruiters",
    },
    {
      icon: Users,
      title: "Recruiter Approved",
      description: "Follow the correct section order and formatting that recruiters prefer",
    },
    {
      icon: Download,
      title: "PDF Export",
      description: "Download your resume as a high-quality PDF ready for applications",
    },
    {
      icon: Sparkles,
      title: "Live Preview",
      description: "See your resume update in real-time as you fill out the form",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Fill Your Details",
      description: "Enter your personal information, experience, education, and skills",
    },
    {
      step: "2",
      title: "Choose Template",
      description: "Select from our collection of professional resume templates",
    },
    {
      step: "3",
      title: "Download & Apply",
      description: "Export your resume as PDF and start applying to your dream jobs",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-textprimary mb-6">
            Build Your Perfect
            <span className="text-primary block">Resume</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Create a professional, recruiter-approved resume in minutes. 
            Our intuitive builder helps freshers craft resumes that stand out and get noticed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/builder" : "/register"}>
              <Button size="lg" className="text-lg px-8 py-3">
                {user ? "Continue Building" : "Get Started Free"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-textprimary mb-4">
              Why Choose Genrezume?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We've designed every feature with one goal in mind: helping you create a resume that gets results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-textprimary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-textprimary mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Creating your professional resume is as easy as 1-2-3.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-textprimary mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 transform translate-x-8">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-textprimary mb-6">
                Perfect for Freshers & Job Seekers
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Genrezume is specifically designed for fresh graduates and entry-level professionals 
                who want to create compelling resumes without the guesswork.
              </p>
              <div className="space-y-4">
                {[
                  "ATS-friendly templates that pass automated screening",
                  "Proper section ordering recommended by recruiters",
                  "Real-time validation to prevent common mistakes",
                  "Professional formatting that stands out",
                  "Mobile-responsive builder for editing on-the-go",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-textprimary">Professional Resume</h3>
                    <p className="text-sm text-slate-600">Ready in minutes</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/5"></div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Template: Modern</span>
                    <span>✓ ATS Optimized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of job seekers who have successfully created professional resumes with Genrezume.
          </p>
          <Link href={user ? "/builder" : "/register"}>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              {user ? "Continue Building" : "Start Building Now"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold text-white">Genrezume</span>
              </div>
              <p className="text-slate-400">
                Build professional resumes that get you noticed by recruiters and land your dream job.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <div className="space-y-2">
                <Link href="/templates" className="block hover:text-white transition-colors">Templates</Link>
                <Link href="/examples" className="block hover:text-white transition-colors">Examples</Link>
                <Link href="/tips" className="block hover:text-white transition-colors">Resume Tips</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block hover:text-white transition-colors">FAQ</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Genrezume. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
