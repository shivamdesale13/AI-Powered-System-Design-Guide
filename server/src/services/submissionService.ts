import { prisma } from "../config/prisma.js";
import { aiService } from "./aiService.js";
import type { SubmissionInput } from "../types.js";

export const submissionService = {
  async submit(userId: string, input: SubmissionInput) {
    const problem = await prisma.problem.findUnique({
      where: { id: input.problemId }
    });

    if (!problem) {
      throw new Error("Problem not found.");
    }

    const submission = await prisma.submission.create({
      data: {
        userId,
        problemId: input.problemId,
        overview: input.overview,
        requirements: input.requirements,
        capacityEstimation: input.capacityEstimation,
        dataModel: input.dataModel,
        apiDesign: input.apiDesign,
        highLevelDesign: input.highLevelDesign,
        deepDives: input.deepDives,
        bottlenecks: input.bottlenecks
      }
    });

    const evaluation = await aiService.evaluateSubmission(input, problem.title, problem.prompt);

    const savedEvaluation = await prisma.evaluation.create({
      data: {
        submissionId: submission.id,
        score: evaluation.score,
        strengths: evaluation.strengths,
        weaknesses: evaluation.weaknesses,
        missingComponents: evaluation.missingComponents,
        scalabilityReview: evaluation.scalabilityReview,
        tradeOffsReview: evaluation.tradeOffsReview,
        databaseReview: evaluation.databaseReview,
        apiReview: evaluation.apiReview,
        reliabilityReview: evaluation.reliabilityReview,
        finalRecommendation: evaluation.finalRecommendation,
        idealAnswerOutline: evaluation.idealAnswerOutline,
        rawResponse: evaluation
      }
    });

    return prisma.submission.findUniqueOrThrow({
      where: { id: submission.id },
      include: {
        problem: true,
        evaluation: true
      }
    });
  },

  async getHistory(userId: string) {
    return prisma.submission.findMany({
      where: { userId },
      include: {
        problem: true,
        evaluation: true
      },
      orderBy: { createdAt: "desc" }
    });
  },

  async getSubmission(userId: string, submissionId: string) {
    return prisma.submission.findFirst({
      where: { id: submissionId, userId },
      include: {
        problem: true,
        evaluation: true
      }
    });
  }
};
