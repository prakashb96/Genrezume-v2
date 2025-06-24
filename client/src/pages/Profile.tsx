import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Edit, Trash2, Plus, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePDFExport } from '@/hooks/usePDFExport';
import { Link } from 'wouter';
import Header from '@/components/Header';

interface Resume {
  id: number;
  title: string;
  template: string;
  data: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Profile() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { exportToPDF } = usePDFExport();

  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      if (response.ok) {
        const data = await response.json();
        setResumes(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch your resumes",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your resumes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      const response = await fetch(`/api/resumes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setResumes(resumes.filter(resume => resume.id !== id));
        toast({
          title: "Success",
          description: "Resume deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete resume",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  const downloadResume = async (resume: Resume) => {
    try {
      // Create a temporary preview element
      const tempDiv = document.createElement('div');
      tempDiv.id = 'temp-resume-preview';
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.innerHTML = generateResumeHTML(resume);
      document.body.appendChild(tempDiv);

      // Export to PDF
      await exportToPDF(`${resume.title}.pdf`);

      // Clean up
      document.body.removeChild(tempDiv);

      toast({
        title: "Success",
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    }
  };

  const generateResumeHTML = (resume: Resume) => {
    // This is a simplified version - you'd need to import and use your actual templates
    const data = JSON.parse(resume.data);
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: white;">
        <h1>${data.personalDetails?.firstName || 'Your'} ${data.personalDetails?.lastName || 'Name'}</h1>
        <p>${data.personalDetails?.title || 'Your Title'}</p>
        <p>${data.personalDetails?.email || ''}</p>
        <!-- Add more template rendering here -->
      </div>
    `;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
          <p className="text-slate-600">You need to be logged in to view your profile and saved resumes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textprimary mb-2">My Profile</h1>
          <p className="text-slate-600">Manage your saved resumes and download them anytime.</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Resumes</h2>
          <Link href="/resume-builder">
            <Button className="bg-secondary hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="mx-auto h-16 w-16 text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
              <p className="text-slate-600 mb-4">Get started by creating your first resume.</p>
              <Link href="/resume-builder">
                <Button className="bg-secondary hover:bg-green-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Resume
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{resume.title}</CardTitle>
                  <p className="text-sm text-slate-600">
                    Template: {resume.template} • Created: {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Link href={`/resume-builder?resume=${resume.id}`}>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => downloadResume(resume)}
                    >
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteResume(resume.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}