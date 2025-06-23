import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { projectItemSchema, ProjectItem } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, InfoIcon, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { nanoid } from "nanoid";

const projectsFormSchema = z.object({
  projects: z.array(projectItemSchema),
});

type ProjectsFormData = z.infer<typeof projectsFormSchema>;

export default function ProjectsForm() {
  const { state, updateData } = useResume();
  const projects = state.resumeData.projects || [];

  const form = useForm<ProjectsFormData>({
    resolver: zodResolver(projectsFormSchema),
    defaultValues: { projects },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const { watch } = form;
  const watchedValues = watch();

  useEffect(() => {
    updateData("projects", watchedValues.projects);
  }, [watchedValues, updateData]);

  const addProject = () => {
    append({
      id: nanoid(),
      name: "",
      description: "",
      technologies: [],
      startDate: "",
      endDate: "",
      url: "",
      github: "",
    });
  };

  const addTechnology = (index: number, technology: string) => {
    if (technology.trim()) {
      const currentTechnologies = form.getValues(`projects.${index}.technologies`) || [];
      if (!currentTechnologies.includes(technology.trim())) {
        form.setValue(`projects.${index}.technologies`, [...currentTechnologies, technology.trim()]);
      }
    }
  };

  const removeTechnology = (projectIndex: number, technologyIndex: number) => {
    const currentTechnologies = form.getValues(`projects.${projectIndex}.technologies`) || [];
    const newTechnologies = currentTechnologies.filter((_, index) => index !== technologyIndex);
    form.setValue(`projects.${projectIndex}.technologies`, newTechnologies);
  };

  return (
    <TooltipProvider>
      <Form {...form}>
        <form className="space-y-6">
          {fields.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">No projects added yet</p>
              <Button type="button" onClick={addProject}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>
          )}

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Project #{index + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name={`projects.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="E-commerce Web Application" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`projects.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Description <span className="text-red-500 ml-1">*</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Describe what the project does and your role in it</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and admin dashboard..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel className="flex items-center mb-3">
                    Technologies Used
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add programming languages, frameworks, and tools used</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {form.watch(`projects.${index}.technologies`)?.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index, techIndex)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add technology (e.g., React, Node.js)"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          addTechnology(index, input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                        addTechnology(index, input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`projects.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input placeholder="Jan 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projects.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input placeholder="Mar 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`projects.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live Demo URL</FormLabel>
                        <FormControl>
                          <Input 
                            type="url" 
                            placeholder="https://myproject.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projects.${index}.github`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Repository</FormLabel>
                        <FormControl>
                          <Input 
                            type="url" 
                            placeholder="https://github.com/username/project" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {fields.length > 0 && (
            <Button type="button" onClick={addProject} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Project
            </Button>
          )}

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-900 mb-2">💡 Tips for Projects Section:</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Include both personal and professional projects</li>
              <li>• Highlight projects that demonstrate relevant skills</li>
              <li>• Include live demos and source code links when available</li>
              <li>• Mention specific technologies and frameworks used</li>
              <li>• Focus on projects that show problem-solving abilities</li>
            </ul>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
