import { useState, useEffect } from "react";
import { ResumeProvider, useResume } from "@/contexts/ResumeContext";
import ProgressHeader from "@/components/ProgressHeader";
import FormSection from "@/components/FormSection";
import PreviewSection from "@/components/PreviewSection";
import TemplateModal from "@/components/TemplateModal";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

function ResumeBuilderContent() {
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const { loadResume } = useResume();

  // Load resume if resumeId is provided in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeId = urlParams.get('resume');
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [loadResume]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ProgressHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className={`${!isPreviewVisible ? 'lg:col-span-2' : ''}`}>
            <FormSection />
          </div>

          {/* Preview Section - Collapsible on mobile */}
          <div className={`${isPreviewVisible ? 'block' : 'hidden lg:block'}`}>
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                className="w-full"
              >
                {isPreviewVisible ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Show Preview
                  </>
                )}
              </Button>
            </div>
            <PreviewSection />
          </div>
        </div>

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden fixed bottom-4 right-4 z-40">
          <Button
            variant="default"
            size="lg"
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            className="rounded-full w-14 h-14 shadow-lg"
          >
            {isPreviewVisible ? (
              <EyeOff className="h-6 w-6" />
            ) : (
              <Eye className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Template Modal */}
        <TemplateModal
          open={showTemplateModal}
          onOpenChange={setShowTemplateModal}
        />
      </div>
    </div>
  );
}

export default function ResumeBuilder() {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
}
