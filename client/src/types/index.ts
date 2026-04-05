export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

export type Problem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  prompt: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  expectedServices: string[];
};

export type Evaluation = {
  id: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingComponents: string[];
  scalabilityReview: string;
  tradeOffsReview: string;
  databaseReview: string;
  apiReview: string;
  reliabilityReview: string;
  finalRecommendation: string;
  idealAnswerOutline: string[];
  createdAt: string;
};

export type Submission = {
  id: string;
  overview: string;
  requirements: string;
  capacityEstimation: string;
  dataModel: string;
  apiDesign: string;
  highLevelDesign: string;
  deepDives: string;
  bottlenecks: string;
  createdAt: string;
  problem: Problem;
  evaluation: Evaluation | null;
};

export type DashboardStats = {
  totalSubmissions: number;
  averageScore: number;
  latestScore: number;
  strongestProblem: string | null;
  recentSubmissions: Submission[];
};
