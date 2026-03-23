"use server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { InterviewSchema } from "@/lib/schema";
import { requireUser } from "@/actions/requireUser";
import { generateInterviewQuestions } from "@/services/generateQuestions";
import { revalidatePath } from "next/cache";
import { getFeedback } from "@/services/generateQuestions";
import { request } from "@arcjet/next";
import { interviewLimiter, retakeLimiter } from "@/lib/arcjet";

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "Something went wrong";

export const CreateInterview = async (data: InterviewSchema) => {
  try {
    const userId = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!dbUser) {
      throw new Error("User not found");
    }

    if (interviewLimiter) {
      const req = await request();

      const decision = await interviewLimiter.protect(req, {
        userId,
        requested: 1,
      });

      if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          const { remaining, reset } = decision.reason;
          console.log({
            code: "RATE LIMIT EXCEED",
            details: {
              remaining,
              resetInSeconds: reset,
            },
          });

          throw new Error("Daily limit exceeded, Try again later");
        }
        throw new Error("Unauthorized");
      }
    }
    if (
      !data.jobRole ||
      data.topics.length === 0 ||
      !data.difficulty ||
      !data.interviewType ||
      !data.experienceLevel ||
      !data.questionCount
    ) {
      throw new Error("Please fill all the fields");
    }

    const customQuestion = data.customQuestion?.trim();

    const interview = await prisma.interview.create({
      data: {
        userId: dbUser.id,
        jobRole: data.jobRole,
        topics: data.topics,
        difficulty: data.difficulty,
        interviewType: data.interviewType,
        experienceLevel: data.experienceLevel,
        questionCount: data.questionCount,
      },
    });

    const generatedQuestions = (await generateInterviewQuestions(data)) ?? [];
    const generatedQuestionTexts = generatedQuestions
      .map((q) => q.question?.trim())
      .filter((question): question is string => Boolean(question));

    const finalQuestionTexts = customQuestion
      ? [customQuestion, ...generatedQuestionTexts].slice(0, data.questionCount)
      : generatedQuestionTexts.slice(0, data.questionCount);

    if (finalQuestionTexts.length > 0) {
      await prisma.question.createMany({
        data: finalQuestionTexts.map((question, i) => ({
          interviewId: interview.id,
          question,
          order: i + 1,
        })),
      });
    }

    revalidatePath("/dashboard/interviews");
    return interview;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const checkRetakeRateLimit = async () => {
  try {
    const userId = await requireUser();
    if (retakeLimiter) {
      const req = await request();

      const decision = await retakeLimiter.protect(req, {
        userId,
        requested: 1,
      });

      if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          return {
            success: false,
            message:
              "You have reached the maximum number of retakes for today. Please try again tomorrow.",
          };
        }
        return {
          success: false,
          message: "Unauthorized",
        };
      }
    }

    return { success: true };
  } catch (error: unknown) {
    console.error(error);

    return {
      success: false,
      message: "Failed to check retake rate limit",
    };
  }
};

export const AllInterviews = async () => {
  try {
    const userId = await requireUser();

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!dbUser) {
      throw new Error("User not found");
    }

    const interviews = prisma.interview.findMany({
      where: {
        userId: dbUser.id,
      },
      orderBy: {
        updatedAt: "asc",
      },
    });

    return interviews;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getInterview = async (id: string) => {
  try {
    const interview = await prisma.interview.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
    return interview;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const generateFeedback = async (
  answers: { question: string; answer: string }[],
  interviewId: string,
  role: string,
  skills: string[],
) => {
  try {
    const userId = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!dbUser) {
      throw new Error("User not found");
    }

    const feedback = await getFeedback(answers, role, skills);

    const attemptCount = await prisma.attempt.count({
      where: {
        interviewId: interviewId,
        userId: dbUser.id,
      },
    });


    if (feedback) {
      const attempt = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const createdAttempt = await tx.attempt.create({
          data: {
            interviewId: interviewId,
            userId: dbUser.id,
            attemptNo: attemptCount + 1,
            score: feedback.overallScore,
            feedback: feedback,
          },
        });

        await tx.interview.update({
          where: {
            id: interviewId,
          },
          data: {
            status: "completed",
            score: feedback.overallScore,
          },
        });

        return createdAttempt;
      });

      revalidatePath(`/dashboard/interview/${interviewId}/attempts`);
      revalidatePath(`/dashboard/interviews`);
      revalidatePath(`/dashboard`);
      return attempt.id;
    }

    revalidatePath(`/dashboard/interview/${interviewId}/attempts`);
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getInterviewAttempts = async (id: string) => {
  try {
    const userId = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      throw new Error("User not Found");
    }

    const attempts = await prisma.attempt.findMany({
      where: {
        interviewId: id,
        userId: dbUser.id,
      },
      orderBy: {
        attemptNo: "asc",
      },
    });

    return attempts;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getAttemptFeedback = async (id: string) => {
  try {
    const userId = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    if (!dbUser) {
      throw new Error("User not Found");
    }
    const attempt = await prisma.attempt.findUnique({
      where: {
        id: id,
        userId: dbUser.id,
      },
    });
    return attempt;
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error));
  }
};

export const getRecentAttempts = async (limit: number = 4) => {
  try {
    const userId = await requireUser();
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!dbUser) {
      throw new Error("User not Found");
    }

    const attempts = await prisma.attempt.findMany({
      where: {
        userId: dbUser.id,
      },
      include: {
        interview: {
          select: {
            jobRole: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    return attempts;
  } catch {
    return [];
  }
};
