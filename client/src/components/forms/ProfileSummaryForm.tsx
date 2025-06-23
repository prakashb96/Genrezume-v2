import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSummarySchema, ProfileSummary } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ProfileSummaryForm() {
  const { state, updateData } = useResume();
  const profileSummary = state.resumeData.profileSummary || { summary: "" };

  const form = useForm<ProfileSummary>({
    resolver: zodResolver(profileSummarySchema),
    defaultValues: profileSummary,
  });

  const { watch } = form;
  const watchedValues = watch();

  useEffect(() => {
    updateData("profileSummary", watchedValues);
  }, [watchedValues, updateData]);

  return (
    <TooltipProvider>
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Profile Summary <span className="text-red-500 ml-1">*</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Write a compelling 2-3 sentence summary highlighting your key skills, experience, and career goals</p>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Passionate software developer with 2+ years of experience in full-stack development. Proficient in React, Node.js, and modern web technologies. Seeking to leverage technical skills and creativity to drive innovation in a dynamic development team."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <div className="text-sm text-slate-500">
                  {field.value?.length || 0} characters (minimum 50 recommended)
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">💡 Tips for a Great Profile Summary:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Start with your years of experience or key qualification</li>
              <li>• Mention your most relevant skills and technologies</li>
              <li>• Include what type of role or company you're targeting</li>
              <li>• Keep it concise but impactful (2-3 sentences)</li>
              <li>• Use active voice and strong action words</li>
            </ul>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
