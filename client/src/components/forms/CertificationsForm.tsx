import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { certificationItemSchema, CertificationItem } from "@shared/schema";
import { useResume } from "@/contexts/ResumeContext";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { nanoid } from "nanoid";

const certificationsFormSchema = z.object({
  certifications: z.array(certificationItemSchema),
});

type CertificationsFormData = z.infer<typeof certificationsFormSchema>;

export default function CertificationsForm() {
  const { state, updateData } = useResume();
  const certifications = state.resumeData.certifications || [];

  const form = useForm<CertificationsFormData>({
    resolver: zodResolver(certificationsFormSchema),
    defaultValues: { certifications },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  const { watch } = form;
  const watchedValues = watch();

  useEffect(() => {
    updateData("certifications", watchedValues.certifications);
  }, [watchedValues, updateData]);

  const addCertification = () => {
    append({
      id: nanoid(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    });
  };

  return (
    <TooltipProvider>
      <Form {...form}>
        <form className="space-y-6">
          {fields.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">No certifications added yet</p>
              <Button type="button" onClick={addCertification}>
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </div>
          )}

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Certification #{index + 1}</CardTitle>
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
                <FormField
                  control={form.control}
                  name={`certifications.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certification Name <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="AWS Certified Solutions Architect" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certifications.${index}.issuer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuing Organization <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Amazon Web Services" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Date <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Jan 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`certifications.${index}.expiryDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Expiry Date
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Leave empty if certification doesn't expire</p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Jan 2026" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`certifications.${index}.credentialId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Credential ID
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>The unique identifier for your certification</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ABC123DEF456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certifications.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Verification URL
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="w-4 h-4 ml-1 text-slate-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Link to verify your certification online</p>
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="url" 
                          placeholder="https://verify.certification.com/..." 
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
            <Button type="button" onClick={addCertification} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Another Certification
            </Button>
          )}

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">💡 Tips for Certifications Section:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Include industry-relevant certifications</li>
              <li>• List most recent or prestigious certifications first</li>
              <li>• Include verification links when available</li>
              <li>• Add both technical and professional certifications</li>
              <li>• Keep track of expiry dates for renewals</li>
            </ul>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  );
}
