import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { usePDFExport } from "@/hooks/usePDFExport";
import { Save, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Profile Summary" },
  { id: 3, name: "Education" },
  { id: 4, name: "Experience" },
  { id: 5, name: "Projects" },
  { id: 6, name: "Skills" },
  { id: 7, name: "Certifications" },
  { id: 8, name: "Languages" },
  { id: 9, name: "Hobbies" },
  { id: 10, name: "References" },
];

export default function ProgressHeader() {
  const { state, saveResume } = useResume();
  const { exportToPDF } = usePDFExport();
  const { toast } = useToast();

  const handleSave = () => {
    saveResume();
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!",
    });
  };

  const handleDownload = async () => {
    try {
      // Check if there's actually content in the preview
      const previewElement = document.getElementById('resume-preview');
      if (!previewElement) {
        throw new Error('Resume preview not found. Please make sure the preview is visible.');
      }

      // Check if preview has content
      const hasContent = previewElement.textContent?.trim();
      if (!hasContent || hasContent.length < 50) {
        throw new Error('Resume appears to be empty. Please fill in your information first.');
      }

      await exportToPDF(`resume_${new Date().toISOString().split('T')[0]}.pdf`);
      toast({
        title: "PDF Downloaded",
        description: "Your resume has been downloaded as PDF!",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "There was an error downloading your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-textprimary">Build Your Resume</h1>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handleDownload} className="bg-secondary hover:bg-green-600">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex flex-wrap items-center justify-between">
        {STEPS.slice(0, 4).map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  state.currentStep === step.id
                    ? "bg-primary text-white"
                    : state.currentStep > step.id
                    ? "bg-secondary text-white"
                    : "bg-slate-300 text-slate-600"
                }`}
              >
                {step.id}
              </div>
              <span
                className={`text-sm ${
                  state.currentStep === step.id
                    ? "font-medium text-primary"
                    : state.currentStep > step.id
                    ? "text-secondary"
                    : "text-slate-600"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < 3 && <div className="w-8 h-0.5 bg-slate-300 hidden sm:block mx-2" />}
          </div>
        ))}
        <div className="text-sm text-slate-500 ml-2">+6 more steps</div>
      </div>
    </div>
  );
}
