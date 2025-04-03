
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Link, User, KeyRound } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Account, NewAccount } from "@/types/account";

const formSchema = z.object({
  linkedin_username: z.string().min(2, "Username must be at least 2 characters"),
  linkedin_password: z.string().min(6, "Password must be at least 6 characters"),
  profile_url: z.string().url("Must be a valid LinkedIn URL"),
});

interface AccountFormProps {
  account?: Account;
  onSubmit: (data: NewAccount) => void;
  isSubmitting: boolean;
}

const AccountForm: React.FC<AccountFormProps> = ({ account, onSubmit, isSubmitting }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Use non-null assertions to ensure defaults meet the NewAccount type requirements
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkedin_username: account?.linkedin_username || "",
      linkedin_password: account?.linkedin_password || "",
      profile_url: account?.profile_url || "",
    },
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    // The data from the form will always have all required fields since they're validated by zod
    onSubmit(data as NewAccount);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="linkedin_username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="username@example.com"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <KeyRound className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 pr-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profile_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile URL</FormLabel>
              <FormControl>
                <div className="relative">
                  <Link className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://www.linkedin.com/in/username/"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : account ? "Update Account" : "Add Account"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountForm;
