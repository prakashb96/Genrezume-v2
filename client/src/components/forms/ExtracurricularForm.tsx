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

const extracurricularFormSchema = z.object({
  extracurricular: z.array(z.object({
    id: z.string(),
    organizationName: z.string().min(1, "Organization name is required"),
    roleName: z.string().min(1, "Role name is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().optional()
  }))
});

type ExtracurricularFormData = z.infer<typeof extracurricularFormSchema>;

export default function ExtracurricularForm() {
  const { state, updateData } = useResume();

  const form = useForm<ExtracurricularFormData>({
    resolver: zodResolver(extracurricularFormSchema),
    defaultValues: {
      extracurricular: state.resumeData.extracurricular || []
    },
  });

  const activities = form.watch("extracurricular");

  useEffect(() => {
    updateData("extracurricular", activities);
  }, [activities, updateData]);

  const addActivity = () => {
    const newActivity = {
      id: generateId(),
      organizationName: "",
      roleName: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    form.setValue("activities", [...activities, newActivity]);
  };

  const removeActivity = (index: number) => {
    const updated = activities.filter((_, i) => i !== index);
    form.setValue("activities", updated);
    updateData("extracurricular", updated);
  };

  const addAchievement = (activityIndex: number) => {
    const updated = [...activities];
    updated[activityIndex].achievements.push("");
    form.setValue("activities", updated);
  };

  const removeAchievement = (activityIndex: number, achievementIndex: number) => {
    const updated = [...activities];
    updated[activityIndex].achievements = updated[activityIndex].achievements.filter((_, i) => i !== achievementIndex);
    form.setValue("activities", updated);
  };

  const onSubmit = (data: ExtracurricularFormData) => {
    updateData("extracurricular", data.activities);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {activities.map((activity, index) => (
          <Card key={activity.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Activity {index + 1}</CardTitle>
              {activities.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeActivity(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`extracurricular.${index}.organizationName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Debate Club" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`extracurricular.${index}.roleName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="President" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`extracurricular.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description of activities and responsibilities" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={`extracurricular.${index}.startDate`}
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
                    name={`extracurricular.${index}.endDate`}
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
                name={`activities.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the activity and your involvement..."
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Key Achievements</FormLabel>
                <div className="space-y-2 mt-2">
                  {activity.achievements.map((_, achievementIndex) => (
                    <div key={achievementIndex} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`activities.${index}.achievements.${achievementIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="Describe a key achievement or impact..."
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {activity.achievements.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAchievement(index, achievementIndex)}
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
                    onClick={() => addAchievement(index)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addActivity} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>

        <Button 
          type="button" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            console.log("Extracurricular data saved:", activities);
          }}
        >
          Save Extracurricular Activities
        </Button>
      </form>
    </Form>
  );
}