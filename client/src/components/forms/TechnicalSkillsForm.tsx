import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const technicalSkillsFormSchema = z.object({
  languages: z.array(z.string()).default([]),
  developerTools: z.array(z.string()).default([]),
  technologiesFrameworks: z.array(z.string()).default([])
});

type TechnicalSkillsFormData = z.infer<typeof technicalSkillsFormSchema>;

export default function TechnicalSkillsForm() {
  const { state, updateData } = useResume();

  const form = useForm<TechnicalSkillsFormData>({
    resolver: zodResolver(technicalSkillsFormSchema),
    defaultValues: {
      languages: state.resumeData.technicalSkills?.languages || [""],
      developerTools: state.resumeData.technicalSkills?.developerTools || [""],
      technologiesFrameworks: state.resumeData.technicalSkills?.technologiesFrameworks || [""]
    },
  });

  const watchedFields = form.watch();

  const addItem = (fieldName: keyof TechnicalSkillsFormData) => {
    const currentItems = watchedFields[fieldName] || [];
    form.setValue(fieldName, [...currentItems, ""]);
  };

  const removeItem = (fieldName: keyof TechnicalSkillsFormData, index: number) => {
    const currentItems = watchedFields[fieldName] || [];
    const updated = currentItems.filter((_, i) => i !== index);
    form.setValue(fieldName, updated);
  };

  useEffect(() => {
    const cleanedData = {
      languages: watchedFields.languages?.filter(item => item.trim() !== '') || [],
      developerTools: watchedFields.developerTools?.filter(item => item.trim() !== '') || [],
      technologiesFrameworks: watchedFields.technologiesFrameworks?.filter(item => item.trim() !== '') || []
    };
    updateData("technicalSkills", cleanedData);
  }, [watchedFields, updateData]);

  const onSubmit = (data: TechnicalSkillsFormData) => {
    const cleanedData = {
      languages: data.languages?.filter(item => item.trim() !== "") || [],
      developerTools: data.developerTools?.filter(item => item.trim() !== "") || [],
      technologiesFrameworks: data.technologiesFrameworks?.filter(item => item.trim() !== "") || []
    };
    updateData("technicalSkills", cleanedData);
  };

  const renderSkillSection = (
    title: string, 
    fieldName: keyof TechnicalSkillsFormData, 
    placeholder: string
  ) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {(watchedFields[fieldName] || [""]).map((_, index) => (
          <div key={index} className="flex gap-2">
            <FormField
              control={form.control}
              name={`${fieldName}.${index}` as any}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder={placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {(watchedFields[fieldName]?.length || 0) > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeItem(fieldName, index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addItem(fieldName)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {title.slice(0, -1)}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {renderSkillSection("Languages", "languages", "Python, Java, C, C++, JavaScript...")}
        {renderSkillSection("Developer Tools", "developerTools", "VS Code, Android Studio, DataGrip...")}
        {renderSkillSection("Technologies/Frameworks", "technologiesFrameworks", "Linux, GitHub, ReactJS, Redux, NextJS...")}

        <Button 
          type="button" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => onSubmit(watchedFields)}
        >
          Save Technical Skills
        </Button>
      </form>
    </Form>
  );
}