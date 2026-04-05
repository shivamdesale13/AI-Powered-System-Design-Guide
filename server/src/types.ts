export type JwtPayload = {
  userId: string;
  email: string;
  name: string;
};

export type AuthenticatedContext = {
  user: JwtPayload | null;
};

export type SubmissionInput = {
  problemId: string;
  overview: string;
  requirements: string;
  capacityEstimation: string;
  dataModel: string;
  apiDesign: string;
  highLevelDesign: string;
  deepDives: string;
  bottlenecks: string;
};

export type EvaluationPayload = {
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
};
