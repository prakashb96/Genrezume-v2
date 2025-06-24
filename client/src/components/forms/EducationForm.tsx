import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { educationItemSchema, EducationItem } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";

const educationFormSchema = z.object({
  education: z.array(educationItemSchema),
});

type EducationFormData = z.infer<typeof educationFormSchema>;

export default function EducationForm() {
  const { state, updateData } = useResume();
  const education = state.resumeData.education || [];

  const form = useForm<EducationFormData>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: { education },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const { watch } = form;
  const watchedValues = watch();

  useEffect(() => {
    updateData("education", watchedValues.education);
  }, [watchedValues, updateData]);

  const addEducation = () => {
    append({
      id: nanoid(),
      collegeName: "",
      degreeName: "",
      cgpa: "",
      startDate: "",
      endDate: "",
      city: "",
      country: "",
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {fields.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <p className="mb-4">No education entries yet</p>
            <Button type="button" onClick={addEducation}>
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}

        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">Education #{index + 1}</CardTitle>
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
                  name={`education.${index}.collegeName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="KIT-KALAIGNARKARUNANIDHI INST" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.degreeName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="BTECH" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`education.${index}.cgpa`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CGPA (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="7.45" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="2023 july" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input placeholder="2025 sep" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.city`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Chennai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.country`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`education.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Relevant coursework, achievements, or activities..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        ))}

        {fields.length > 0 && (
          <div className="space-y-4">
            <Button type="button" onClick={addEducation} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Education
            </Button>
            <Button 
              type="button" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                // Data is automatically saved via useEffect
                console.log("Education data saved:", watchedValues.education);
              }}
            >
              Save Education Details
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
