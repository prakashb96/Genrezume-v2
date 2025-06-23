import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import ProfileSummaryForm from "./forms/ProfileSummaryForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import ProjectsForm from "./forms/ProjectsForm";
import SkillsForm from "./forms/SkillsForm";
import CertificationsForm from "./forms/CertificationsForm";
import LanguagesForm from "./forms/LanguagesForm";
import HobbiesForm from "./forms/HobbiesForm";
import ReferencesForm from "./forms/ReferencesForm";

const STEP_COMPONENTS = {
  1: PersonalDetailsForm,
  2: ProfileSummaryForm,
  3: EducationForm,
  4: ExperienceForm,
  5: ProjectsForm,
  6: SkillsForm,
  7: CertificationsForm,
  8: LanguagesForm,
  9: HobbiesForm,
  10: ReferencesForm,
};

const STEP_TITLES = {
  1: "Personal Details",
  2: "Profile Summary",
  3: "Education",
  4: "Experience",
  5: "Projects",
  6: "Skills",
  7: "Certifications",
  8: "Languages",
  9: "Hobbies",
  10: "References",
};

const STEP_DESCRIPTIONS = {
  1: "Start with your basic information. This will appear at the top of your resume.",
  2: "Write a compelling summary that highlights your key qualifications and career goals.",
  3: "Add your educational background, including degrees, certifications, and relevant coursework.",
  4: "Detail your work experience, focusing on achievements and responsibilities.",
  5: "Showcase your personal and professional projects that demonstrate your skills.",
  6: "List your technical skills, programming languages, and tools you're proficient with.",
  7: "Include any professional certifications or licenses you've earned.",
  8: "Add languages you speak and your proficiency level in each.",
  9: "Include hobbies and interests that showcase your personality and soft skills.",
  10: "Add professional references who can vouch for your work and character.",
};

const TEMPLATES = [
  { value: "modern", label: "Modern Template" },
  { value: "classic", label: "Classic Template" },
  { value: "creative", label: "Creative Template" },
  { value: "minimal", label: "Minimal Template" },
  { value: "professional", label: "Professional Template" },
];

export default function FormSection() {
  const { state, setStep, setTemplate } = useResume();
  const { currentStep, selectedTemplate } = state;

  const CurrentComponent = STEP_COMPONENTS[currentStep as keyof typeof STEP_COMPONENTS];
  const currentTitle = STEP_TITLES[currentStep as keyof typeof STEP_TITLES];
  const currentDescription = STEP_DESCRIPTIONS[currentStep as keyof typeof STEP_DESCRIPTIONS];

  const handlePrevious = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 10) {
      setStep(currentStep + 1);
    }
  };

  const getNextStepName = () => {
    if (currentStep < 10) {
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
            <Button onClick={handleNext} disabled={currentStep === 10}>
              Next: {getNextStepName()}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
