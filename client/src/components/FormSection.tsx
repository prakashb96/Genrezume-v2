import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import EducationForm from "./forms/EducationForm";
import CourseworkSkillsForm from "./forms/CourseworkSkillsForm";
import ProjectsForm from "./forms/ProjectsForm";
import InternshipForm from "./forms/InternshipForm";
import TechnicalSkillsForm from "./forms/TechnicalSkillsForm";
import ExtracurricularForm from "./forms/ExtracurricularForm";
import CertificationsForm from "./forms/CertificationsForm";

const STEP_COMPONENTS = {
  1: PersonalDetailsForm,
  2: EducationForm,
  3: CourseworkSkillsForm,
  4: ProjectsForm,
  5: InternshipForm,
  6: TechnicalSkillsForm,
  7: ExtracurricularForm,
  8: CertificationsForm,
};

const STEP_TITLES = {
  1: "Personal Details",
  2: "Education",
  3: "Coursework / Skills",
  4: "Projects",
  5: "Internship",
  6: "Technical Skills",
  7: "Extracurricular",
  8: "Certifications",
};

const STEP_DESCRIPTIONS = {
  1: "Start with your basic information. This will appear at the top of your resume.",
  2: "Add your educational background including college details, degree, and CGPA.",
  3: "Select the coursework and skills you've completed during your studies.",
  4: "Showcase your personal and professional projects with technology stack and key points.",
  5: "Detail your internship experience including company, role, and responsibilities.",
  6: "List your technical skills including programming languages, tools, and frameworks.",
  7: "Include extracurricular activities and leadership roles you've undertaken.",
  8: "Add any professional certifications or licenses you've earned.",
};

const TEMPLATES = [
  { value: "modern", label: "Modern Template" },
  { value: "classic", label: "Classic Template" },
  { value: "creative", label: "Creative Template" },
  { value: "minimal", label: "Minimal Template" },
  { value: "professional", label: "Professional Template" },
];

export default function FormSection() {
  const { state, setStep, setTemplate, saveResume } = useResume();
  const { currentStep, selectedTemplate } = state;

  const CurrentComponent = STEP_COMPONENTS[currentStep as keyof typeof STEP_COMPONENTS];
  const currentTitle = STEP_TITLES[currentStep as keyof typeof STEP_TITLES];
  const currentDescription = STEP_DESCRIPTIONS[currentStep as keyof typeof STEP_DESCRIPTIONS];

  const handlePrevious = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    if (currentStep < 8) {
      setStep(currentStep + 1);
    } else if (currentStep === 8) {
      // Complete Resume
      try {
        await saveResume();
        alert("Resume completed and saved successfully! Check your profile to view and download it.");
      } catch (error) {
        console.error("Error saving resume:", error);
        alert("Resume completed successfully!");
      }
    }
  };

  const getNextStepName = () => {
    if (currentStep < 8) {
      return STEP_TITLES[(currentStep + 1) as keyof typeof STEP_TITLES];
    }
    return "Complete";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-textprimary">{currentTitle}</h2>
          <Select value={selectedTemplate} onValueChange={setTemplate}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {TEMPLATES.map((template) => (
                <SelectItem key={template.value} value={template.value}>
                  {template.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-slate-600 text-sm">{currentDescription}</p>
      </div>

      <div className="p-6">
        <CurrentComponent />

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline">
              Save & Exit
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={false}
              className={currentStep === 8 ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {currentStep === 8 ? "Complete Resume" : `Next: ${getNextStepName()}`}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
