
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Lead, NewLead } from "@/types/lead";
import { FileText, Briefcase, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const leadSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  job_title: z.string().min(2, { message: "Job title is required." }),
  company: z.string().min(1, { message: "Company is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  linkedin_url: z.string().url({ message: "Must be a valid URL." }).optional().or(z.literal("")),
  summary: z.string().optional(),
});

interface LeadFormProps {
  lead?: Lead;
  onSubmit: (data: NewLead) => void;
  isSubmitting: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ lead, onSubmit, isSubmitting }) => {
  const form = useForm<NewLead>({
    resolver: zodResolver(leadSchema),
    defaultValues: lead
      ? {
          name: lead.name,
          job_title: lead.job_title,
          company: lead.company,
          location: lead.location,
          linkedin_url: lead.linkedin_url,
          summary: lead.summary || "",
        }
      : {
          name: "",
          job_title: "",
          company: "",
          location: "",
          linkedin_url: "",
          summary: "",
        },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="linkedin_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-2" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Job Title
                </FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-end">
                <FormLabel className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-2" />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Summary
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief description about the lead..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : lead ? "Update Lead" : "Create Lead"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LeadForm;
