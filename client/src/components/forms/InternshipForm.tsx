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
import { useEffect } from "react";

const internshipFormSchema = z.object({
  internships: z.array(z.object({
    id: z.string(),
    companyName: z.string().min(1, "Company name is required"),
    roleName: z.string().min(1, "Role is required"),
    city: z.string().optional(),
    country: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description is required")
  }))
});

type InternshipFormData = z.infer<typeof internshipFormSchema>;

export default function InternshipForm() {
  const { state, updateData } = useResume();

  const form = useForm<InternshipFormData>({
    resolver: zodResolver(internshipFormSchema),
    defaultValues: {
      internships: state.resumeData.internships || []
    },
  });

  const internships = form.watch("internships");

  // Auto-save when data changes
  useEffect(() => {
    updateData("internships", internships);
  }, [internships, updateData]);

  const addInternship = () => {
    const newInternship = {
      id: generateId(),
      companyName: "",
      roleName: "",
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      description: ""
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
                  name={`internships.${index}.roleName`}
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
                  name={`internships.${index}.city`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Seattle" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`internships.${index}.country`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="USA" {...field} />
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
                          <Input placeholder="2025-03" {...field} />
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
                          <Input placeholder="2025-02" {...field} />
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


            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addInternship} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Internship
        </Button>

        <Button 
          type="button" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            console.log("Internship data saved:", internships);
          }}
        >
          Save Internship Details
        </Button>
      </form>
    </Form>
  );
}