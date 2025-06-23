import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillsSchema, Skills } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SkillsForm() {
  const { state, updateData } = useResume();
  const skills = state.resumeData.skills || {
    technical: [],
    languages: [],
    frameworks: [],
    tools: [],
  };

  const form = useForm<Skills>({
    resolver: zodResolver(skillsSchema),
    defaultValues: skills,
  });

  const { watch } = form;
  const watchedValues = watch();

  const [newSkills, setNewSkills] = useState({
    technical: "",
    languages: "",
    frameworks: "",
    tools: "",
  });

  useEffect(() => {
    updateData("skills", watchedValues);
  }, [watchedValues, updateData]);

  const addSkill = (category: keyof Skills, skill: string) => {
    if (skill.trim()) {
      const currentSkills = form.getValues(category) || [];
      if (!currentSkills.includes(skill.trim())) {
        form.setValue(category, [...currentSkills, skill.trim()]);
      }
      setNewSkills(prev => ({ ...prev, [category]: "" }));
    }
  };

  const removeSkill = (category: keyof Skills, skillIndex: number) => {
    const currentSkills = form.getValues(category) || [];
    const newSkills = currentSkills.filter((_, index) => index !== skillIndex);
    form.setValue(category, newSkills);
  };

  const skillCategories = [
    {
      key: "technical" as keyof Skills,
      title: "Technical Skills",
      description: "Programming languages, databases, core technologies",
      placeholder: "JavaScript, Python, SQL, etc.",
      examples: ["JavaScript", "Python", "Java", "SQL", "HTML/CSS"],
    },
    {
      key: "frameworks" as keyof Skills,
      title: "Frameworks & Libraries",
      description: "Frontend/backend frameworks and libraries",
      placeholder: "React, Node.js, Django, etc.",
      examples: ["React", "Node.js", "Express", "Django", "Vue.js"],
    },
    {
      key: "tools" as keyof Skills,
      title: "Tools & Technologies",
      description: "Development tools, cloud platforms, software",
      placeholder: "Git, Docker, AWS, etc.",
      examples: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL"],
    },
    {
      key: "languages" as keyof Skills,
      title: "Other Skills",
      description: "Additional technical and soft skills",
      placeholder: "API Design, Agile, etc.",
      examples: ["REST APIs", "Agile", "Testing", "CI/CD", "DevOps"],
    },
  ];

  return (
    <TooltipProvider>
      <Form {...form}>
        <form className="space-y-6">
          {skillCategories.map((category) => (
            <Card key={category.key}>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  {category.title}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{category.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Display current skills */}
                <div className="flex flex-wrap gap-2 min-h-[2rem]">
                  {form.watch(category.key)?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(category.key, index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )) || <span className="text-slate-400 text-sm">No skills added yet</span>}
                </div>

                {/* Add new skill */}
                <div className="flex gap-2">
                  <Input
                    placeholder={category.placeholder}
                    value={newSkills[category.key]}
                    onChange={(e) => 
                      setNewSkills(prev => ({ ...prev, [category.key]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill(category.key, newSkills[category.key]);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addSkill(category.key, newSkills[category.key])}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Suggested skills */}
                <div>
                  <p className="text-sm text-slate-600 mb-2">Suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <Button
                        key={example}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => addSkill(category.key, example)}
                        disabled={form.watch(category.key)?.includes(example)}
                      >
                        + {example}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-medium text-purple-900 mb-2">💡 Tips for Skills Section:</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• List skills relevant to the jobs you're applying for</li>
              <li>• Include both technical and soft skills</li>
              <li>• Be honest about your skill level</li>
              <li>• Keep the list concise and organized</li>
              <li>• Update regularly as you learn new technologies</li>
            </ul>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
