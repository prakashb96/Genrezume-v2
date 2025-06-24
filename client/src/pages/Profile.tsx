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
      // Parse the resume data
      const resumeData = JSON.parse(resume.data);
      console.log('Resume data for download:', resumeData);

      // Create a temporary invisible iframe to render the resume
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.width = '794px';
      iframe.style.height = '1123px'; // A4 height
      iframe.style.border = 'none';
      
      document.body.appendChild(iframe);
      
      // Wait for iframe to load
      await new Promise(resolve => {
        iframe.onload = resolve;
        iframe.src = 'about:blank';
      });

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error('Could not access iframe document');

      // Write the resume HTML to iframe
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Resume</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                line-height: 1.5;
                color: #000;
                background: #fff;
                width: 794px;
                margin: 0 auto;
                padding: 40px;
              }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px; }
              .name { font-size: 32px; font-weight: bold; margin: 0; color: #1e293b; }
              .title { font-size: 18px; color: #64748b; margin: 8px 0; }
              .contact { font-size: 14px; color: #64748b; margin-top: 12px; }
              .links { font-size: 14px; color: #2563eb; margin-top: 8px; }
              .links a { color: #2563eb; text-decoration: none; }
              .section { margin-bottom: 25px; }
              .section-title { font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
              .item { margin-bottom: 15px; }
              .item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
              .item-title { font-size: 16px; font-weight: 600; margin: 0; }
              .item-date { font-size: 14px; color: #64748b; }
              .item-subtitle { font-size: 14px; color: #64748b; margin: 2px 0; }
              .item-description { font-size: 14px; margin: 8px 0; }
              .skills-grid { font-size: 14px; line-height: 1.6; }
              .skills-grid p { margin: 5px 0; }
              .skills-grid strong { font-weight: 600; }
            </style>
          </head>
          <body>
            ${generateResumeHTML(resume).replace('id="resume-preview"', '')}
          </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Now create the preview element for PDF export
      const tempDiv = document.createElement('div');
      tempDiv.id = 'resume-preview';
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '794px';
      tempDiv.style.maxWidth = '794px';
      tempDiv.innerHTML = iframeDoc.body.innerHTML;
      document.body.appendChild(tempDiv);

      // Wait for DOM update
      await new Promise(resolve => setTimeout(resolve, 200));

      // Export to PDF
      await exportToPDF(`${resume.title}.pdf`);

      // Clean up
      document.body.removeChild(tempDiv);
      document.body.removeChild(iframe);

      toast({
        title: "Success", 
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Error",
        description: `Failed to download resume: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const generateResumeHTML = (resume: Resume) => {
    const data = JSON.parse(resume.data);
    const personalDetails = data.personalDetails || {};
    
    return `
      <div id="resume-preview" style="font-family: Inter, Arial, sans-serif; max-width: 794px; margin: 0 auto; padding: 40px; background: white; color: black; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 20px;">
          <h1 style="font-size: 32px; font-weight: bold; margin: 0; color: #1e293b;">
            ${personalDetails.firstName || 'Your'} ${personalDetails.lastName || 'Name'}
          </h1>
          <p style="font-size: 18px; color: #64748b; margin: 8px 0;">
            ${personalDetails.title || 'Your Professional Title'}
          </p>
          <div style="font-size: 14px; color: #64748b; margin-top: 12px;">
            ${personalDetails.email ? `Email: ${personalDetails.email}` : ''}
            ${personalDetails.phone ? ` | Phone: ${personalDetails.phone}` : ''}
            ${personalDetails.location ? ` | Location: ${personalDetails.location}` : ''}
          </div>
          <div style="font-size: 14px; color: #2563eb; margin-top: 8px;">
            ${personalDetails.linkedin ? `<a href="${personalDetails.linkedin}" style="color: #2563eb; text-decoration: none;">LinkedIn</a>` : ''}
            ${personalDetails.github ? ` | <a href="${personalDetails.github}" style="color: #2563eb; text-decoration: none;">GitHub</a>` : ''}
            ${personalDetails.portfolio ? ` | <a href="${personalDetails.portfolio}" style="color: #2563eb; text-decoration: none;">Portfolio</a>` : ''}
          </div>
        </div>
        
        ${data.education && data.education.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Education</h2>
          ${data.education.map((edu: any) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <h3 style="font-size: 16px; font-weight: 600; margin: 0;">${edu.institutionName || ''}</h3>
                <span style="font-size: 14px; color: #64748b;">${edu.startDate || ''} - ${edu.endDate || ''}</span>
              </div>
              <p style="font-size: 14px; color: #64748b; margin: 2px 0;">
                ${edu.degree || ''} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                ${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </p>
              <p style="font-size: 14px; color: #64748b; margin: 0;">${edu.location || ''}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${data.internships && data.internships.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Internships</h2>
          ${data.internships.map((intern: any) => `
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <h3 style="font-size: 16px; font-weight: 600; margin: 0;">${intern.jobTitle || ''}</h3>
                <span style="font-size: 14px; color: #64748b;">${intern.startDate || ''} - ${intern.endDate || 'Present'}</span>
              </div>
              <p style="font-size: 14px; color: #64748b; margin: 2px 0;">${intern.companyName || ''} | ${intern.location || ''}</p>
              ${intern.description ? `<p style="font-size: 14px; margin: 8px 0;">${intern.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${data.extracurricular && data.extracurricular.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Extracurricular Activities</h2>
          ${data.extracurricular.map((activity: any) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <h3 style="font-size: 16px; font-weight: 600; margin: 0;">${activity.organizationName || ''}</h3>
                <span style="font-size: 14px; color: #64748b;">${activity.startDate || ''} - ${activity.endDate || 'Present'}</span>
              </div>
              <p style="font-size: 14px; color: #64748b; margin: 2px 0;">${activity.roleName || ''}</p>
              ${activity.description ? `<p style="font-size: 14px; margin: 8px 0;">${activity.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${data.certifications && data.certifications.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Certifications</h2>
          ${data.certifications.map((cert: any) => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <h3 style="font-size: 16px; font-weight: 600; margin: 0;">${cert.name || ''}</h3>
                <span style="font-size: 14px; color: #64748b;">${cert.date || ''}</span>
              </div>
              <p style="font-size: 14px; color: #64748b; margin: 0;">${cert.issuer || ''}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${data.coursework && data.coursework.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Relevant Coursework</h2>
          <div style="font-size: 14px;">
            <p>${Array.isArray(data.coursework) ? data.coursework.join(', ') : data.coursework}</p>
          </div>
        </div>
        ` : ''}

        ${data.profileSummary && data.profileSummary.summary ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Professional Summary</h2>
          <div style="font-size: 14px; line-height: 1.6;">
            <p>${data.profileSummary.summary}</p>
          </div>
        </div>
        ` : ''}

        ${data.languages && data.languages.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Languages</h2>
          <div style="font-size: 14px;">
            ${data.languages.map((lang: any) => `
              <div style="margin-bottom: 8px;">
                <span style="font-weight: 600;">${lang.language || ''}</span>
                ${lang.proficiency ? ` - ${lang.proficiency}` : ''}
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        ${data.hobbies && data.hobbies.interests ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Interests & Hobbies</h2>
          <div style="font-size: 14px;">
            <p>${data.hobbies.interests}</p>
          </div>
        </div>
        ` : ''}

        ${data.references && data.references.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">References</h2>
          ${data.references.map((ref: any) => `
            <div style="margin-bottom: 15px;">
              <h3 style="font-size: 16px; font-weight: 600; margin: 0;">${ref.name || ''}</h3>
              <p style="font-size: 14px; color: #64748b; margin: 2px 0;">${ref.title || ''} at ${ref.company || ''}</p>
              <p style="font-size: 14px; color: #64748b; margin: 0;">${ref.email || ''} | ${ref.phone || ''}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${data.projects && data.projects.length > 0 ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Projects</h2>
          ${data.projects.map((project: any) => `
            <div style="margin-bottom: 15px;">
              <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">${project.name || ''}</h3>
              ${project.description ? `<p style="font-size: 14px; margin: 5px 0;">${project.description}</p>` : ''}
              ${project.technologies ? `<p style="font-size: 13px; color: #64748b; margin: 5px 0;"><strong>Technologies:</strong> ${project.technologies}</p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${data.technicalSkills ? `
        <div style="margin-bottom: 25px;">
          <h2 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Technical Skills</h2>
          <div style="font-size: 14px; line-height: 1.6;">
            ${data.technicalSkills.programmingLanguages ? `<p><strong>Programming Languages:</strong> ${data.technicalSkills.programmingLanguages.join(', ')}</p>` : ''}
            ${data.technicalSkills.frameworks ? `<p><strong>Frameworks:</strong> ${data.technicalSkills.frameworks.join(', ')}</p>` : ''}
            ${data.technicalSkills.tools ? `<p><strong>Tools:</strong> ${data.technicalSkills.tools.join(', ')}</p>` : ''}
            ${data.technicalSkills.databases ? `<p><strong>Databases:</strong> ${data.technicalSkills.databases.join(', ')}</p>` : ''}
          </div>
        </div>
        ` : ''}
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