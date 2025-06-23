import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { generateId } from "@/lib/utils";

const internshipFormSchema = z.object({
  internships: z.array(z.object({
    id: z.string(),
    companyName: z.string().min(1, "Company name is required"),
    role: z.string().min(1, "Role is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    keyPoints: z.array(z.string()).default([])
  }))
});

type InternshipFormData = z.infer<typeof internshipFormSchema>;

export default function InternshipForm() {
  const { state, updateData } = useResume();

  const form = useForm<InternshipFormData>({
    resolver: zodResolver(internshipFormSchema),
    defaultValues: {
      internships: []
    },
  });

  const internships = form.watch("internships");

  const addInternship = () => {
    const newInternship = {
      id: generateId(),
      companyName: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      keyPoints: [""]
    };
    form.setValue("internships", [...internships, newInternship]);
  };

  const removeInternship = (index: number) => {
    const updated = internships.filter((_, i) => i !== index);
    form.setValue("internships", updated);
    updateData("internships", updated);
  };

  const addKeyPoint = (internshipIndex: number) => {
    const updated = [...internships];
    updated[internshipIndex].keyPoints.push("");
    form.setValue("internships", updated);
  };

  const removeKeyPoint = (internshipIndex: number, pointIndex: number) => {
    const updated = [...internships];
    updated[internshipIndex].keyPoints = updated[internshipIndex].keyPoints.filter((_, i) => i !== pointIndex);
    form.setValue("internships", updated);
  };

  const onSubmit = (data: InternshipFormData) => {
    updateData("internships", data.internships);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {internships.map((internship, index) => (
          <Card key={internship.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Internship {index + 1}</CardTitle>
              {internships.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeInternship(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`internships.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Microsoft" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`internships.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineering Intern" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`internships.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Seattle, WA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={`internships.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`internships.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="month" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name={`internships.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of your internship role and responsibilities..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Key Points & Achievements</FormLabel>
                <div className="space-y-2 mt-2">
                  {internship.keyPoints.map((_, pointIndex) => (
                    <div key={pointIndex} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`internships.${index}.keyPoints.${pointIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="Describe a key achievement or responsibility..."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {internship.keyPoints.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeKeyPoint(index, pointIndex)}
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
                    onClick={() => addKeyPoint(index)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Key Point
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addInternship} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Internship
        </Button>

        <Button type="submit" className="w-full">
          Save Internship Details
        </Button>
      </form>
    </Form>
  );
}