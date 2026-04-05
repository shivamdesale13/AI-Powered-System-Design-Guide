import { prisma } from "../config/prisma.js";

export const problemService = {
  listProblems() {
    return prisma.problem.findMany({
      orderBy: [
        { difficulty: "asc" },
        { title: "asc" }
      ]
    });
  },

  getProblemBySlug(slug: string) {
    return prisma.problem.findUnique({
      where: { slug }
    });
  }
};
