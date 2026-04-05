import OpenAI from "openai";
import { env } from "../config/env.js";
import type { EvaluationPayload, SubmissionInput } from "../types.js";

const openai = env.OPENAI_API_KEY ? new OpenAI({ apiKey: env.OPENAI_API_KEY }) : null;

const fallbackEvaluation = (submission: SubmissionInput, problemTitle: string): EvaluationPayload => {
  const completeness = [
    submission.overview,
    submission.requirements,
    submission.capacityEstimation,
    submission.dataModel,
    submission.apiDesign,
    submission.highLevelDesign,
    submission.deepDives,
    submission.bottlenecks
  ].filter((section) => section.trim().length > 120).length;

  const score = Math.min(95, 45 + completeness * 6);

  return {
    score,
    strengths: [
      "Clear attempt to structure the solution into interview-friendly sections.",
      "Touches both API and data concerns instead of staying purely conceptual."
    ],
    weaknesses: [
      "Some trade-offs and failure-mode reasoning need more depth.",
      "The design should better justify component boundaries and scaling triggers."
    ],
    missingComponents: [
      "Back-of-the-envelope capacity numbers tied to traffic assumptions.",
      "Reliability tactics such as retries, idempotency, and disaster recovery."
    ],
    scalabilityReview: `The answer for ${problemTitle} shows a reasonable scaling direction, but it needs more explicit sharding, caching, and asynchronous processing decisions.`,
    tradeOffsReview: "You identify core building blocks, but interviewer-level depth comes from explaining why one approach was chosen over realistic alternatives.",
    databaseReview: "The database section should more clearly separate hot-path reads, write patterns, indexing strategy, and long-term partitioning.",
    apiReview: "The API design is serviceable, but it would benefit from clearer contracts, pagination strategy, and consistency guarantees.",
    reliabilityReview: "Reliability considerations are present but should explicitly cover redundancy, observability, backpressure, and recovery workflows.",
    finalRecommendation: "Treat the next iteration like a real interview whiteboard pass: tighten assumptions, quantify scale, and defend the highest-risk trade-offs.",
    idealAnswerOutline: [
      "Clarify functional and non-functional requirements",
      "Estimate scale, throughput, storage, and growth assumptions",
      "Design APIs and core data model",
      "Propose high-level architecture and request flow",
      "Deep dive into scaling, consistency, and reliability trade-offs",
      "Call out bottlenecks, mitigations, and phased evolution"
    ]
  };
};

export const aiService = {
  async evaluateSubmission(submission: SubmissionInput, problemTitle: string, prompt: string): Promise<EvaluationPayload> {
    if (!openai) {
      return fallbackEvaluation(submission, problemTitle);
    }

    const systemPrompt = `You are a senior system design interviewer. Evaluate candidate answers with direct, rigorous, constructive feedback. Return only valid JSON with keys: score, strengths, weaknesses, missingComponents, scalabilityReview, tradeOffsReview, databaseReview, apiReview, reliabilityReview, finalRecommendation, idealAnswerOutline. score must be an integer 0-100. strengths, weaknesses, missingComponents, idealAnswerOutline must be arrays of short strings.`;

    const userPrompt = JSON.stringify(
      {
        problemTitle,
        prompt,
        submission
      },
      null,
      2
    );

    const response = await openai.responses.create({
      model: env.OPENAI_MODEL,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      text: {
        format: {
          type: "json_object"
        }
      }
    });

    const text = response.output_text;

    return JSON.parse(text) as EvaluationPayload;
  }
};
