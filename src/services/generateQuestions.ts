import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const schema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
    }),
  ),
});

type GenerateQuestionInput = {
  jobRole: string;
  topics: string[];
  difficulty: string;
  interviewType: string;
  experienceLevel: string;
  questionCount: number;
};

const feedbackSchema = z.object({
  status: z.literal("completed"),
  role: z.string(),
  date: z.string(),
  overallScore: z.number(),
  overallSummary: z.string(),

  skills: z.array(
    z.object({
      name: z.string(),
      score: z.number(),
    }),
  ),

  strengths: z.array(z.string()),

  actionableImprovements: z.array(
    z.object({
      flaw: z.string(),
      recommendation: z.string(),
    }),
  ),

  questions: z.array(
    z.object({
      question: z.string(),
      answerSummary: z.string(),
      score: z.number(),
      strength: z.string(),
      improvement: z.string(),
    }),
  ),
});

export type FeedbackType = z.infer<typeof feedbackSchema>;

export async function generateInterviewQuestions({
  jobRole,
  topics,
  difficulty,
  interviewType,
  experienceLevel,
  questionCount,
}: GenerateQuestionInput) {
  try {
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema,
      output: "object",
      prompt: `
 Generate ${questionCount} short to the point interview questions not very long.
 
 Role: ${jobRole}
 Experience level: ${experienceLevel}
 Difficulty: ${difficulty}
 Interview type: ${interviewType}
 
 Topics:
 ${topics.join(", ")}
 
 Return ONLY valid JSON.
 `,
    });

    return object.questions;
  } catch {
  }
}

export const getFeedback = async (
  answers: { question: string; answer: string }[],
  role: string,
  skills: string[],
) => {
  try {
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: feedbackSchema,
      output: "object",

      prompt: `
  You are an expert technical interviewer evaluating a mock interview.

Analyze the candidate's answers and generate a structured evaluation report.

Candidate role: ${role}

Interview answers:
${JSON.stringify(answers, null, 2)}

Important note about the answers:
The answers come from speech-to-text transcription and may contain spelling mistakes,
misheard technical terms, or phonetic errors.

For example:
- "blog scoped" may mean "block scoped"
- "content component" may mean "React component"

When evaluating the answers
• Focus on the **intended meaning**, not exact spelling.
• Infer the correct technical term when the context clearly suggests it.
• Do not penalize the candidate for transcription errors.
• Evaluate the **conceptual correctness** of the explanation.

Evaluation guidelines:

Communication:
How clearly the candidate explains ideas and reasoning.

Technical Knowledge:
Understanding of ${skills.join(", ")}

Problem Solving:
How the candidate approaches and structures solutions.

Confidence:
How confidently the candidate delivers explanations.

Clarity:
How organized and understandable the answers are.

Also identify:

• Key strengths demonstrated during the interview
• Areas for improvement
• Practical recommendations for improvement
• Role-specific keywords that were mentioned
• Important keywords or concepts that were missing
• Detailed feedback for each interview question

Scoring rules:
- Skill scores must be between 1–10
- Overall score must be between 1–100
- Base the evaluation strictly on the answers provided

Tips:
- Keep the overallSummary between 50 words exactly.
- Give 3 actionable improvements only


Return a structured interview evaluation report.
  `,
    });

    return object;
  } catch {
  }
};
