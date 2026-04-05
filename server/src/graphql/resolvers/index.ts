import { GraphQLScalarType, Kind } from "graphql";
import { z } from "zod";
import { authService } from "../../services/authService.js";
import { dashboardService } from "../../services/dashboardService.js";
import { problemService } from "../../services/problemService.js";
import { submissionService } from "../../services/submissionService.js";
import { requireAuth } from "../../middleware/context.js";
import type { AuthenticatedContext, SubmissionInput } from "../../types.js";

const authSchema = z.object({
  name: z.string().min(2).max(60).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(120)
});

const submissionSchema: z.ZodType<SubmissionInput> = z.object({
  problemId: z.string().min(1),
  overview: z.string().min(40),
  requirements: z.string().min(40),
  capacityEstimation: z.string().min(20),
  dataModel: z.string().min(20),
  apiDesign: z.string().min(20),
  highLevelDesign: z.string().min(40),
  deepDives: z.string().min(20),
  bottlenecks: z.string().min(20)
});

const jsonScalar = new GraphQLScalarType({
  name: "JSON",
  serialize(value) {
    return value;
  },
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return Number(ast.value);
      case Kind.BOOLEAN:
        return ast.value;
      default:
        return null;
    }
  }
});

export const resolvers = {
  JSON: jsonScalar,
  Query: {
    me: async (_parent: unknown, _args: unknown, context: AuthenticatedContext) => {
      return context.user
        ? {
            id: context.user.userId,
            email: context.user.email,
            name: context.user.name,
            avatarUrl: null,
            createdAt: new Date().toISOString()
          }
        : null;
    },
    problems: () => problemService.listProblems(),
    problem: (_parent: unknown, args: { slug: string }) => problemService.getProblemBySlug(args.slug),
    dashboard: (_parent: unknown, _args: unknown, context: AuthenticatedContext) => {
      const user = requireAuth(context);
      return dashboardService.getDashboard(user.userId);
    },
    submissionHistory: (_parent: unknown, _args: unknown, context: AuthenticatedContext) => {
      const user = requireAuth(context);
      return submissionService.getHistory(user.userId);
    },
    submission: (_parent: unknown, args: { id: string }, context: AuthenticatedContext) => {
      const user = requireAuth(context);
      return submissionService.getSubmission(user.userId, args.id);
    }
  },
  Mutation: {
    signup: async (_parent: unknown, args: { input: { name: string; email: string; password: string } }) => {
      const input = authSchema.extend({ name: z.string().min(2).max(60) }).parse(args.input);
      return authService.signup(input.name, input.email, input.password);
    },
    login: async (_parent: unknown, args: { input: { email: string; password: string } }) => {
      const input = authSchema.omit({ name: true }).parse(args.input);
      return authService.login(input.email, input.password);
    },
    googleAuth: async (_parent: unknown, args: { input: { idToken: string } }) => {
      const input = z.object({ idToken: z.string().min(20) }).parse(args.input);
      return authService.googleAuth(input.idToken);
    },
    createSubmission: async (_parent: unknown, args: { input: SubmissionInput }, context: AuthenticatedContext) => {
      const user = requireAuth(context);
      const input = submissionSchema.parse(args.input);
      return submissionService.submit(user.userId, input);
    }
  },
  User: {
    createdAt: (user: { createdAt?: Date | string }) => user.createdAt?.toString() ?? new Date().toISOString()
  },
  Problem: {
    difficulty: (problem: { difficulty: string }) => problem.difficulty
  },
  Submission: {
    createdAt: (submission: { createdAt: Date }) => submission.createdAt.toISOString()
  },
  Evaluation: {
    strengths: (evaluation: { strengths: unknown }) => evaluation.strengths as string[],
    weaknesses: (evaluation: { weaknesses: unknown }) => evaluation.weaknesses as string[],
    missingComponents: (evaluation: { missingComponents: unknown }) => evaluation.missingComponents as string[],
    idealAnswerOutline: (evaluation: { idealAnswerOutline: unknown }) => evaluation.idealAnswerOutline as string[],
    createdAt: (evaluation: { createdAt: Date }) => evaluation.createdAt.toISOString()
  }
};
