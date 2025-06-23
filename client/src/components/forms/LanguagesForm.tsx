import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { languageItemSchema, LanguageItem } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { nanoid } from "nanoid";

const languagesFormSchema = z.object({
  languages: z.array(languageItemSchema),
});

type LanguagesFormData = z.infer<typeof languagesFormSchema>;

const PROFICIENCY_LEVELS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Native", label: "Native" },
] as const;

export default function LanguagesForm() {
  const { state, updateData } = useResume();
  const languages = state.resumeData.languages || [];

  const form = useForm<LanguagesFormData>({
    resolver: zodResolver(languagesFormSchema),
    defaultValues: { languages },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const { watch } = form;
  const watchedValues = watch();

  useEffect(() => {
    updateData("languages", watchedValues.languages);
  }, [watchedValues, updateData]);

  const addLanguage = () => {
    append({
      id: nanoid(),
      language: "",
      proficiency: "Intermediate",
    });
  };

  return (
    <TooltipProvider>
      <Form {...form}>
        <form className="space-y-6">
          {fields.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">No languages added yet</p>
              <Button type="button" onClick={addLanguage}>
                <Plus className="w-4 h-4 mr-2" />
                Add Language
              </Button>
            </div>
          )}

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Language #{index + 1}</CardTitle>
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
                    name={`languages.${index}.language`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Spanish" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`languages.${index}.proficiency`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Proficiency Level <span className="text-red-500 ml-1">*</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-1">
                                <p><strong>Beginner:</strong> Basic understanding</p>
                                <p><strong>Intermediate:</strong> Conversational</p>
                                <p><strong>Advanced:</strong> Fluent</p>
                                <p><strong>Native:</strong> Mother tongue</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select proficiency level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PROFICIENCY_LEVELS.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {fields.length > 0 && (
            <Button type="button" onClick={addLanguage} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Language
            </Button>
          )}

          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
            <h3 className="font-medium text-cyan-900 mb-2">💡 Tips for Languages Section:</h3>
            <ul className="text-sm text-cyan-800 space-y-1">
              <li>• Include your native language if it's relevant</li>
              <li>• Be honest about your proficiency level</li>
              <li>• Include languages relevant to the job market</li>
              <li>• Consider adding programming languages in the Skills section instead</li>
              <li>• Focus on languages you can actually use in a work environment</li>
            </ul>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
