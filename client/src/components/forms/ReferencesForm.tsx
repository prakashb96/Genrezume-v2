import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { referenceItemSchema, ReferenceItem } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { nanoid } from "nanoid";

const referencesFormSchema = z.object({
  references: z.array(referenceItemSchema),
});

type ReferencesFormData = z.infer<typeof referencesFormSchema>;

export default function ReferencesForm() {
  const { state, updateData } = useResume();
  const references = state.resumeData.references || [];

  const form = useForm<ReferencesFormData>({
    resolver: zodResolver(referencesFormSchema),
    defaultValues: { references },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "references",
  });

  const { watch } = form;
  const watchedValues = watch();

  useEffect(() => {
    updateData("references", watchedValues.references);
  }, [watchedValues, updateData]);

  const addReference = () => {
    append({
      id: nanoid(),
      name: "",
      title: "",
      company: "",
      email: "",
      phone: "",
      relationship: "",
    });
  };

  return (
    <TooltipProvider>
      <Form {...form}>
        <form className="space-y-6">
          {fields.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">No references added yet</p>
              <Button type="button" onClick={addReference}>
                <Plus className="w-4 h-4 mr-2" />
                Add Reference
              </Button>
            </div>
          )}

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Reference #{index + 1}</CardTitle>
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
                    name={`references.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`references.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Senior Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`references.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Tech Solutions Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`references.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.smith@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`references.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`references.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Relationship <span className="text-red-500 ml-1">*</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>How you know this person (e.g., "Former Manager", "Colleague", "Professor")</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Former Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          {fields.length > 0 && (
            <Button type="button" onClick={addReference} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Reference
            </Button>
          )}

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-medium text-red-900 mb-2">⚠️ Important Notes:</h3>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• Always ask permission before listing someone as a reference</li>
              <li>• Provide your references with your resume and job description</li>
              <li>• Choose people who can speak positively about your work</li>
              <li>• Include a mix of supervisors, colleagues, and mentors</li>
              <li>• Keep your references updated about your job search</li>
            </ul>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
