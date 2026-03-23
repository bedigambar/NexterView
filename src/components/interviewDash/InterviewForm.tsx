"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { interviewSchema, InterviewSchema } from "@/lib/schema";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Briefcase,
  Layers,
  Settings,
  FileText,
  Target,
  Sparkles,
  Loader2,
} from "lucide-react";
import { CreateInterview } from "@/actions/Interview";

export default function InterviewForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InterviewSchema>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      jobRole: "",
      topics: [],
      customQuestion: "",
      difficulty: "Medium",
      interviewType: "Technical",
      experienceLevel: "Junior",
      questionCount: 5,
    },
  });

  const onSubmit = async (data: InterviewSchema) => {
    setIsLoading(true);
    try {
        const result = await CreateInterview(data);
        if(result){
            form.reset();
            setOpen(false);
            toast.success("Interview Created successfully")
        }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message)
        form.reset()
    } finally {
        setIsLoading(false);
        
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-125 p-0 overflow-hidden border-[#1F2937]  shadow-xl shadow-black/50 text-[#F9FAFB]">
        <div className="px-6 py-6 border-b border-[#1F2937]">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-[#F9FAFB]">
            <Sparkles className="h-5 w-5 text-gray-400" />
            Create New Interview
          </DialogTitle>
          <DialogDescription className="text-[#9CA3AF] mt-1.5">
            Configure the parameters for your AI-powered interview session.
          </DialogDescription>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="jobRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5 text-sm font-medium text-[#D1D5DB]">
                      <Briefcase className="w-4 h-4 text-[#9CA3AF]" />
                      Job Role
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Frontend Developer"
                        className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus-visible:ring-gray-400 placeholder:text-[#6B7280]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interviewType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5 text-sm font-medium text-[#D1D5DB]">
                      <FileText className="w-4 h-4 text-[#9CA3AF]" />
                      Interview Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus:ring-gray-400">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black border-[#374151]">
                        <SelectItem
                          value="Technical"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          Technical
                        </SelectItem>
                        <SelectItem
                          value="Behavioral"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          Behavioral
                        </SelectItem>
                        <SelectItem
                          value="Mixed"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          Mixed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-sm font-medium text-[#D1D5DB]">
                    <Layers className="w-4 h-4 text-[#9CA3AF]" />
                    Topics (Comma separated)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. React, Node.js, System Design"
                      className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus-visible:ring-gray-400 placeholder:text-[#6B7280]"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(
                          val ? val.split(",").map((t) => t.trim()) : [],
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customQuestion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-sm font-medium text-[#D1D5DB]">
                    <FileText className="w-4 h-4 text-[#9CA3AF]" />
                    Custom Question (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Explain the trade-offs of SSR vs CSR in Next.js"
                      className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus-visible:ring-gray-400 placeholder:text-[#6B7280]"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-sm font-medium text-[#D1D5DB]">
                    <Target className="w-4 h-4 text-[#9CA3AF]" />
                    Experience Level
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus:ring-gray-400">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black border-[#1F2937]">
                      <SelectItem
                        value="Fresher"
                        className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                      >
                        Fresher
                      </SelectItem>
                      <SelectItem
                        value="Junior"
                        className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                      >
                        Junior
                      </SelectItem>
                      <SelectItem
                        value="Mid-Level"
                        className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                      >
                        Mid-Level
                      </SelectItem>
                      <SelectItem
                        value="Senior"
                        className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                      >
                        Senior
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5 text-sm font-medium text-[#D1D5DB]">
                      <Settings className="w-4 h-4 text-[#9CA3AF]" />
                      Difficulty
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus:ring-gray-400">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black border-[#1F2937]">
                        <SelectItem
                          value="Easy"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          Easy
                        </SelectItem>
                        <SelectItem
                          value="Medium"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          Medium
                        </SelectItem>
                        <SelectItem
                          value="Hard"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          Hard
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5 text-sm font-medium text-[#D1D5DB]">
                      <Layers className="w-4 h-4 text-[#9CA3AF]" />
                      Questions
                    </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(parseInt(val))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#1F2937] border-[#374151] text-[#F9FAFB] focus:ring-gray-400">
                          <SelectValue placeholder="Count" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black border-[#1F2937]">
                        <SelectItem
                          value="3"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          3 Questions
                        </SelectItem>
                        <SelectItem
                          value="5"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          5 Questions
                        </SelectItem>
                        <SelectItem
                          value="8"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          8 Questions
                        </SelectItem>
                        <SelectItem
                          value="10"
                          className="text-[#F9FAFB] hover:bg-[#1F2937] focus:bg-[#1F2937]"
                        >
                          10 Questions
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-200 text-black font-semibold rounded-lg py-5 text-base transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Interview...
                  </>
                ) : (
                  "Generate Interview"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
