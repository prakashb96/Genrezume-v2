import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";

const TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
};

export default function PreviewSection() {
  const { state } = useResume();
  const [zoom, setZoom] = useState(75);

  const TemplateComponent = TEMPLATES[state.selectedTemplate as keyof typeof TEMPLATES] || ModernTemplate;
  
  // Debug logging
  console.log("Preview state:", state);
  console.log("Resume data:", state.resumeData);
  console.log("Selected template:", state.selectedTemplate);
  console.log("Template component:", TemplateComponent);

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 25, 150));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 25, 50));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-textprimary">Live Preview</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-slate-600 min-w-[3rem] text-center">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoom >= 150}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div 
          className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden"
          style={{ 
            transform: `scale(${zoom / 100})`, 
            transformOrigin: "top left",
            width: `${(100 / zoom) * 100}%`,
          }}
        >
          <div id="resume-preview" className="bg-white" style={{ width: "210mm", minHeight: "297mm" }}>
            {state.resumeData ? (
              <TemplateComponent data={state.resumeData} />
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading resume preview...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
