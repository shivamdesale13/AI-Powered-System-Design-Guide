import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const GOOGLE_AUTH_MUTATION = gql`
  mutation GoogleAuth($input: GoogleAuthInput!) {
    googleAuth(input: $input) {
      token
      user {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const PROBLEMS_QUERY = gql`
  query Problems {
    problems {
      id
      title
      slug
      description
      prompt
      difficulty
      expectedServices
    }
  }
`;

export const PROBLEM_QUERY = gql`
  query Problem($slug: String!) {
    problem(slug: $slug) {
      id
      title
      slug
      description
      prompt
      difficulty
      expectedServices
    }
  }
`;

export const DASHBOARD_QUERY = gql`
  query Dashboard {
    dashboard {
      totalSubmissions
      averageScore
      latestScore
      strongestProblem
      recentSubmissions {
        id
        createdAt
        problem {
          title
          slug
          difficulty
          description
          prompt
          expectedServices
          id
        }
        evaluation {
          id
          score
          strengths
          weaknesses
          missingComponents
          scalabilityReview
          tradeOffsReview
          databaseReview
          apiReview
          reliabilityReview
          finalRecommendation
          idealAnswerOutline
          createdAt
        }
      }
    }
  }
`;

export const HISTORY_QUERY = gql`
  query SubmissionHistory {
    submissionHistory {
      id
      createdAt
      problem {
        id
        title
        slug
        difficulty
        description
        prompt
        expectedServices
      }
      evaluation {
        id
        score
        strengths
        weaknesses
        missingComponents
        scalabilityReview
        tradeOffsReview
        databaseReview
        apiReview
        reliabilityReview
        finalRecommendation
        idealAnswerOutline
        createdAt
      }
    }
  }
`;

export const SUBMISSION_QUERY = gql`
  query Submission($id: ID!) {
    submission(id: $id) {
      id
      overview
      requirements
      capacityEstimation
      dataModel
      apiDesign
      highLevelDesign
      deepDives
      bottlenecks
      createdAt
      problem {
        id
        title
        slug
        difficulty
        description
        prompt
        expectedServices
      }
      evaluation {
        id
        score
        strengths
        weaknesses
        missingComponents
        scalabilityReview
        tradeOffsReview
        databaseReview
        apiReview
        reliabilityReview
        finalRecommendation
        idealAnswerOutline
        createdAt
      }
    }
  }
`;

export const CREATE_SUBMISSION_MUTATION = gql`
  mutation CreateSubmission($input: SubmissionInput!) {
    createSubmission(input: $input) {
      id
      createdAt
      problem {
        id
        title
        slug
        difficulty
        description
        prompt
        expectedServices
      }
      evaluation {
        id
        score
        strengths
        weaknesses
        missingComponents
        scalabilityReview
        tradeOffsReview
        databaseReview
        apiReview
        reliabilityReview
        finalRecommendation
        idealAnswerOutline
        createdAt
      }
    }
  }
`;
