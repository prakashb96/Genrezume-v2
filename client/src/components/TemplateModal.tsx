import { useState } from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface TemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary",
    preview: (
      <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-white p-4 flex flex-col justify-between">
        <div>
          <div className="h-3 bg-primary rounded mb-2"></div>
          <div className="h-2 bg-slate-300 rounded mb-1 w-3/4"></div>
          <div className="h-2 bg-slate-300 rounded mb-3 w-1/2"></div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-200 rounded w-full"></div>
            <div className="h-1 bg-slate-200 rounded w-4/5"></div>
            <div className="h-1 bg-slate-200 rounded w-3/5"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-slate-300 rounded w-2/3"></div>
          <div className="flex space-x-1">
            <div className="h-1 bg-slate-200 rounded flex-1"></div>
            <div className="h-1 bg-slate-200 rounded flex-1"></div>
            <div className="h-1 bg-slate-200 rounded flex-1"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "classic",
    name: "Classic Traditional",
    description: "Timeless and professional",
    preview: (
      <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-white p-4 flex flex-col justify-between">
        <div>
          <div className="h-3 bg-slate-700 rounded mb-2"></div>
          <div className="h-2 bg-slate-400 rounded mb-1 w-3/4"></div>
          <div className="h-2 bg-slate-400 rounded mb-3 w-1/2"></div>
          <div className="border-b border-slate-300 mb-2"></div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-300 rounded w-full"></div>
            <div className="h-1 bg-slate-300 rounded w-4/5"></div>
            <div className="h-1 bg-slate-300 rounded w-3/5"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-slate-400 rounded w-2/3"></div>
          <div className="grid grid-cols-2 gap-1">
            <div className="h-1 bg-slate-300 rounded"></div>
            <div className="h-1 bg-slate-300 rounded"></div>
            <div className="h-1 bg-slate-300 rounded"></div>
            <div className="h-1 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "creative",
    name: "Creative Modern",
    description: "Bold and innovative",
    preview: (
      <div className="aspect-[3/4] bg-gradient-to-br from-purple-50 to-white p-4 flex flex-col justify-between">
        <div>
          <div className="h-3 bg-accent rounded mb-2"></div>
          <div className="h-2 bg-slate-300 rounded mb-1 w-3/4"></div>
          <div className="h-2 bg-slate-300 rounded mb-3 w-1/2"></div>
          <div className="flex space-x-2 mb-3">
            <div className="w-8 h-8 bg-accent rounded-full"></div>
            <div className="flex-1 space-y-1 pt-1">
              <div className="h-1 bg-slate-200 rounded w-full"></div>
              <div className="h-1 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-slate-300 rounded w-2/3"></div>
          <div className="flex space-x-1">
            <div className="h-4 w-4 bg-accent rounded"></div>
            <div className="h-4 w-4 bg-slate-200 rounded"></div>
            <div className="h-4 w-4 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple and elegant",
    preview: (
      <div className="aspect-[3/4] bg-white p-4 flex flex-col justify-between border border-slate-200">
        <div>
          <div className="h-3 bg-slate-300 rounded mb-2 w-2/3"></div>
          <div className="h-1 bg-slate-200 rounded mb-1 w-1/2"></div>
          <div className="h-1 bg-slate-200 rounded mb-3 w-1/3"></div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-100 rounded w-full"></div>
            <div className="h-1 bg-slate-100 rounded w-4/5"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-1 bg-slate-200 rounded w-1/2"></div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-100 rounded w-full"></div>
            <div className="h-1 bg-slate-100 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "professional",
    name: "Professional Sidebar",
    description: "Corporate and structured",
    preview: (
      <div className="aspect-[3/4] bg-white flex border border-slate-200">
        <div className="w-1/3 bg-slate-800 p-2">
          <div className="w-6 h-6 bg-slate-600 rounded-full mx-auto mb-2"></div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-600 rounded"></div>
            <div className="h-1 bg-slate-600 rounded w-3/4"></div>
          </div>
        </div>
        <div className="flex-1 p-2">
          <div className="h-2 bg-slate-300 rounded mb-1 w-3/4"></div>
          <div className="h-1 bg-slate-200 rounded mb-2 w-1/2"></div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-100 rounded"></div>
            <div className="h-1 bg-slate-100 rounded w-4/5"></div>
            <div className="h-1 bg-slate-100 rounded w-3/5"></div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function TemplateModal({ open, onOpenChange }: TemplateModalProps) {
  const { state, setTemplate } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState(state.selectedTemplate);

  const handleApply = () => {
    setTemplate(selectedTemplate);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Template</DialogTitle>
          <p className="text-slate-600 text-sm">
            Select a professional template that matches your industry and style preference.
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={`group cursor-pointer ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div
                className={`border-2 rounded-lg overflow-hidden transition-colors group-hover:shadow-lg ${
                  selectedTemplate === template.id
                    ? "border-primary shadow-lg"
                    : "border-slate-200 hover:border-primary"
                }`}
              >
                {template.preview}
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-medium text-textprimary">{template.name}</h3>
                <p className="text-sm text-slate-600">{template.description}</p>
                {selectedTemplate === template.id && (
                  <div className="inline-flex items-center mt-1">
                    <Check className="text-primary w-4 h-4 mr-1" />
                    <span className="text-xs text-primary font-medium">Selected</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-200">
          <Button onClick={handleApply}>Apply Template</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
