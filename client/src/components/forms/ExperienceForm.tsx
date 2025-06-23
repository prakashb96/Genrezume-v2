import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { experienceItemSchema, ExperienceItem } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { nanoid } from "nanoid";

const experienceFormSchema = z.object({
  experience: z.array(experienceItemSchema),
});

type ExperienceFormData = z.infer<typeof experienceFormSchema>;

export default function ExperienceForm() {
  const { state, updateData } = useResume();
  const experience = state.resumeData.experience || [];

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: { experience },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const { watch } = form;
  const watchedValues = watch();

  useEffect(() => {
    updateData("experience", watchedValues.experience);
  }, [watchedValues, updateData]);

  const addExperience = () => {
    append({
      id: nanoid(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    });
  };

  const addAchievement = (index: number) => {
    const currentAchievements = form.getValues(`experience.${index}.achievements`) || [];
    form.setValue(`experience.${index}.achievements`, [...currentAchievements, ""]);
  };

  const removeAchievement = (experienceIndex: number, achievementIndex: number) => {
    const currentAchievements = form.getValues(`experience.${experienceIndex}.achievements`) || [];
    const newAchievements = currentAchievements.filter((_, index) => index !== achievementIndex);
    form.setValue(`experience.${experienceIndex}.achievements`, newAchievements);
  };

  return (
    <TooltipProvider>
      <Form {...form}>
        <form className="space-y-6">
          {fields.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">No work experience entries yet</p>
              <Button type="button" onClick={addExperience}>
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>
          )}

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Experience #{index + 1}</CardTitle>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Apple Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experience.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Jan 2022" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`experience.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Dec 2023" 
                            {...field} 
                            disabled={form.watch(`experience.${index}.current`)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`experience.${index}.current`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        I currently work here
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Job Description
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Brief overview of your role and responsibilities</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your role and key responsibilities..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <FormLabel className="flex items-center">
                      Key Achievements
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Quantifiable accomplishments and impact you made in this role</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addAchievement(index)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Achievement
                    </Button>
                  </div>
                  
                  {form.watch(`experience.${index}.achievements`)?.map((_, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center space-x-2 mb-2">
                      <FormField
                        control={form.control}
                        name={`experience.${index}.achievements.${achievementIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Increased team productivity by 25% through process optimization"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(index, achievementIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {fields.length > 0 && (
            <Button type="button" onClick={addExperience} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Experience
            </Button>
          )}

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h3 className="font-medium text-amber-900 mb-2">💡 Tips for Experience Section:</h3>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Start with your most recent position first</li>
              <li>• Use action verbs to describe your achievements</li>
              <li>• Include quantifiable results whenever possible</li>
              <li>• Focus on accomplishments, not just responsibilities</li>
              <li>• Tailor your experience to match the job you're applying for</li>
            </ul>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
