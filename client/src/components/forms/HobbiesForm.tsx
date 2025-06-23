import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hobbiesSchema, Hobbies } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect, useState } from "react";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function HobbiesForm() {
  const { state, updateData } = useResume();
  const hobbies = state.resumeData.hobbies || { hobbies: [] };

  const form = useForm<Hobbies>({
    resolver: zodResolver(hobbiesSchema),
    defaultValues: hobbies,
  });

  const { watch } = form;
  const watchedValues = watch();

  const [newHobby, setNewHobby] = useState("");

  useEffect(() => {
    updateData("hobbies", watchedValues);
  }, [watchedValues, updateData]);

  const addHobby = (hobby: string) => {
    if (hobby.trim()) {
      const currentHobbies = form.getValues("hobbies") || [];
      if (!currentHobbies.includes(hobby.trim())) {
        form.setValue("hobbies", [...currentHobbies, hobby.trim()]);
      }
      setNewHobby("");
    }
  };

  const removeHobby = (hobbyIndex: number) => {
    const currentHobbies = form.getValues("hobbies") || [];
    const newHobbies = currentHobbies.filter((_, index) => index !== hobbyIndex);
    form.setValue("hobbies", newHobbies);
  };

  const suggestedHobbies = [
    "Reading", "Photography", "Hiking", "Cooking", "Gaming",
    "Music", "Travel", "Sports", "Art", "Volunteering",
    "Blogging", "Fitness", "Gardening", "Chess", "Dancing"
  ];

  return (
    <TooltipProvider>
      <Form {...form}>
        <form className="space-y-6">
          <div>
            <FormLabel className="flex items-center text-base font-semibold mb-4">
              Hobbies & Interests
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="w-4 h-4 ml-2 text-slate-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add hobbies that showcase your personality and soft skills. Choose ones that might be relevant to your target role.</p>
                </TooltipContent>
              </Tooltip>
            </FormLabel>

            {/* Display current hobbies */}
            <div className="flex flex-wrap gap-2 mb-4 min-h-[3rem] p-3 border border-slate-200 rounded-lg">
              {form.watch("hobbies")?.length > 0 ? (
                form.watch("hobbies").map((hobby, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {hobby}
                    <button
                      type="button"
                      onClick={() => removeHobby(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <span className="text-slate-400 text-sm">No hobbies added yet</span>
              )}
            </div>

            {/* Add new hobby */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Add a hobby or interest..."
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHobby(newHobby);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addHobby(newHobby)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Suggested hobbies */}
            <div>
              <p className="text-sm text-slate-600 mb-3">Popular suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedHobbies.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => addHobby(suggestion)}
                    disabled={form.watch("hobbies")?.includes(suggestion)}
                  >
                    + {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-medium text-orange-900 mb-2">💡 Tips for Hobbies Section:</h3>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• Choose hobbies that show positive qualities (teamwork, creativity, leadership)</li>
              <li>• Include activities that might connect with company culture</li>
              <li>• Avoid controversial or potentially divisive topics</li>
              <li>• Keep it brief - 3-6 hobbies are usually enough</li>
              <li>• Consider hobbies that demonstrate skills relevant to your field</li>
            </ul>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
