import { z } from "zod";

export const interviewSchema = z.object({
  jobRole: z.string().min(1, "Job Role is required"),
  topics: z.array(z.string()).min(1, "Topic is required"),
  customQuestion: z.string().trim().max(250, "Keep custom question under 250 characters").optional(),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    error: "Difficulty is required",
  }),
  interviewType: z.enum(["Technical", "Behavioral", "Mixed"], {
    error: "Type is required",
  }),
  experienceLevel: z.enum(["Fresher", "Junior", "Mid-Level", "Senior"], {
    error: "Experience is required",
  }),
  questionCount: z.union(
    [
      z.literal(3),
      z.literal(5),
      z.literal(8),
      z.literal(10),
    ],
    {
      error: "Question Count is required",
    }
  ),
});

export type InterviewSchema = z.infer<typeof interviewSchema>;
