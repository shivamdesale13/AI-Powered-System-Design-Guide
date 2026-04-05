export const typeDefs = `#graphql
  scalar JSON

  type User {
    id: ID!
    name: String!
    email: String!
    avatarUrl: String
    createdAt: String!
  }

  type Problem {
    id: ID!
    title: String!
    slug: String!
    description: String!
    prompt: String!
    difficulty: String!
    expectedServices: JSON!
  }

  type Evaluation {
    id: ID!
    score: Int!
    strengths: [String!]!
    weaknesses: [String!]!
    missingComponents: [String!]!
    scalabilityReview: String!
    tradeOffsReview: String!
    databaseReview: String!
    apiReview: String!
    reliabilityReview: String!
    finalRecommendation: String!
    idealAnswerOutline: [String!]!
    createdAt: String!
  }

  type Submission {
    id: ID!
    overview: String!
    requirements: String!
    capacityEstimation: String!
    dataModel: String!
    apiDesign: String!
    highLevelDesign: String!
    deepDives: String!
    bottlenecks: String!
    createdAt: String!
    problem: Problem!
    evaluation: Evaluation
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type DashboardStats {
    totalSubmissions: Int!
    averageScore: Int!
    latestScore: Int!
    strongestProblem: String
    recentSubmissions: [Submission!]!
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input GoogleAuthInput {
    idToken: String!
  }

  input SubmissionInput {
    problemId: ID!
    overview: String!
    requirements: String!
    capacityEstimation: String!
    dataModel: String!
    apiDesign: String!
    highLevelDesign: String!
    deepDives: String!
    bottlenecks: String!
  }

  type Query {
    me: User
    problems: [Problem!]!
    problem(slug: String!): Problem
    dashboard: DashboardStats!
    submissionHistory: [Submission!]!
    submission(id: ID!): Submission
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    googleAuth(input: GoogleAuthInput!): AuthPayload!
    createSubmission(input: SubmissionInput!): Submission!
  }
`;
