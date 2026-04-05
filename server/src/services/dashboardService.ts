import { prisma } from "../config/prisma.js";

export const dashboardService = {
  async getDashboard(userId: string) {
    const submissions = await prisma.submission.findMany({
      where: { userId },
      include: {
        problem: true,
        evaluation: true
      },
      orderBy: { createdAt: "desc" }
    });

    const totalSubmissions = submissions.length;
    const scored = submissions.filter((submission) => submission.evaluation !== null);
    const averageScore = scored.length
      ? Math.round(
          scored.reduce((sum: number, submission) => sum + (submission.evaluation?.score ?? 0), 0) / scored.length
        )
      : 0;
    const latestScore = scored[0]?.evaluation?.score ?? 0;
    const strongestProblem = [...scored]
      .sort((left, right) => (right.evaluation?.score ?? 0) - (left.evaluation?.score ?? 0))[0]?.problem.title ?? null;

    return {
      totalSubmissions,
      averageScore,
      latestScore,
      strongestProblem,
      recentSubmissions: submissions.slice(0, 6)
    };
  }
};
