import { createContext, useContext, useReducer, useEffect } from "react";
import { ResumeData } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ResumeState {
  currentStep: number;
  selectedTemplate: string;
  resumeData: Partial<ResumeData>;
  isPreviewCollapsed: boolean;
}

type ResumeAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_TEMPLATE"; payload: string }
  | { type: "UPDATE_DATA"; payload: { section: keyof ResumeData; data: any } }
  | { type: "TOGGLE_PREVIEW" }
  | { type: "LOAD_DATA"; payload: Partial<ResumeData> }
  | { type: "RESET" };

const initialState: ResumeState = {
  currentStep: 1,
  selectedTemplate: "modern",
  resumeData: {
    personalDetails: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      photo: "",
    },
    profileSummary: { summary: "" },
    education: [],
    experience: [],
    projects: [],
    skills: { technical: [], languages: [], frameworks: [], tools: [] },
    certifications: [],
    languages: [],
    hobbies: { hobbies: [] },
    references: [],
  },
  isPreviewCollapsed: false,
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_TEMPLATE":
      return { ...state, selectedTemplate: action.payload };
    case "UPDATE_DATA":
      return {
        ...state,
        resumeData: {
          ...state.resumeData,
          [action.payload.section]: action.payload.data,
        },
      };
    case "TOGGLE_PREVIEW":
      return { ...state, isPreviewCollapsed: !state.isPreviewCollapsed };
    case "LOAD_DATA":
      return { ...state, resumeData: { ...state.resumeData, ...action.payload } };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeState;
  setStep: (step: number) => void;
  setTemplate: (template: string) => void;
  updateData: (section: keyof ResumeData, data: any) => void;
  togglePreview: () => void;
  saveResume: () => void;
  loadResume: (resumeId?: string) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  const { user } = useAuth();
  const [localData, setLocalData] = useLocalStorage("resume-data", null);

  const setStep = (step: number) => {
    dispatch({ type: "SET_STEP", payload: step });
  };

  const setTemplate = (template: string) => {
    dispatch({ type: "SET_TEMPLATE", payload: template });
  };

  const updateData = (section: keyof ResumeData, data: any) => {
    console.log(`Updating ${section}:`, data);
    dispatch({ type: "UPDATE_DATA", payload: { section, data } });
  };

  const togglePreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW" });
  };

  const saveResume = async () => {
    console.log("Saving resume with data:", state.resumeData);
    
    if (user) {
      try {
        const response = await fetch('/api/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: `Resume ${new Date().toLocaleDateString()}`,
            template: state.selectedTemplate,
            data: state.resumeData,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Resume saved to database successfully:", result);
        } else {
          const errorText = await response.text();
          console.error("Failed to save resume to database:", errorText);
        }
      } catch (error) {
        console.error("Error saving resume:", error);
      }
    } else {
      // Save to localStorage for guest users
      setLocalData({
        template: state.selectedTemplate,
        data: state.resumeData,
        step: state.currentStep,
      });
      console.log("Resume saved to localStorage");
    }
  };

  const loadResume = async (resumeId?: string) => {
    if (user && resumeId) {
      try {
        const response = await fetch(`/api/resumes/${resumeId}`);
        if (response.ok) {
          const resume = await response.json();
          const resumeData = JSON.parse(resume.data);
          dispatch({ type: "SET_TEMPLATE", payload: resume.template });
          dispatch({ type: "LOAD_DATA", payload: resumeData });
          console.log("Resume loaded from database successfully");
        }
      } catch (error) {
        console.error("Error loading resume:", error);
      }
    } else if (!user) {
      // Load from localStorage for guest users
      if (localData) {
        dispatch({ type: "SET_TEMPLATE", payload: localData.template || "modern" });
        dispatch({ type: "LOAD_DATA", payload: localData.data || {} });
        dispatch({ type: "SET_STEP", payload: localData.step || 1 });
      }
    }
  };

  const resetResume = () => {
    dispatch({ type: "RESET" });
    if (!user) {
      setLocalData(null);
    }
  };

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveResume();
    }, 5000);

    return () => clearInterval(interval);
  }, [state.resumeData, state.selectedTemplate, state.currentStep, user]);

  // Load data on mount
  useEffect(() => {
    if (!user) {
      loadResume();
    }
  }, [user]);

  const value = {
    state,
    setStep,
    setTemplate,
    updateData,
    togglePreview,
    saveResume,
    loadResume,
    resetResume,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}
