import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SUBMISSION_QUERY } from "../api/graphql";
import { FeedbackCard } from "../components/feedback/FeedbackCard";
import { ScoreDisplay } from "../components/feedback/ScoreDisplay";
import { formatDate } from "../lib/format";
import type { Submission } from "../types";

export const ResultsPage = () => {
  const { submissionId = "" } = useParams();
  const { data, loading, error } = useQuery<{ submission: Submission }>(SUBMISSION_QUERY, {
    variables: { id: submissionId }
  });

  if (loading) return <div className="glass-panel rounded-[30px] border border-white/70 p-8 shadow-panel">Loading evaluation...</div>;
  if (error || !data?.submission?.evaluation) {
    return <div className="rounded-[24px] bg-red-50 p-5 text-sm text-red-700">{error?.message ?? "Evaluation not found."}</div>;
  }

  const { submission } = data;
  const evaluation = submission.evaluation!;

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <ScoreDisplay score={evaluation.score} />
        <div className="glass-panel rounded-[32px] border border-white/70 p-8 shadow-panel">
          <div className="text-sm uppercase tracking-[0.2em] text-slate">Evaluation summary</div>
          <h1 className="mt-3 font-display text-4xl text-ink">{submission.problem.title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate">
            Submitted on {formatDate(submission.createdAt)}. The AI reviewed architecture depth, scaling choices, APIs, data design, and reliability thinking.
          </p>
          <div className="mt-6 rounded-[24px] border border-white/70 bg-white/70 p-5">
            <div className="mb-2 text-sm uppercase tracking-[0.18em] text-slate">Final recommendation</div>
            <p className="text-sm leading-6 text-ink">{evaluation.finalRecommendation}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <FeedbackCard title="Strengths" content={evaluation.strengths} tone="positive" />
        <FeedbackCard title="Weaknesses" content={evaluation.weaknesses} tone="warning" />
        <FeedbackCard title="Missing components" content={evaluation.missingComponents} />
        <FeedbackCard title="Ideal answer outline" content={evaluation.idealAnswerOutline} />
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <FeedbackCard title="Scalability review" content={evaluation.scalabilityReview} />
        <FeedbackCard title="Trade-offs review" content={evaluation.tradeOffsReview} />
        <FeedbackCard title="Database review" content={evaluation.databaseReview} />
        <FeedbackCard title="API review" content={evaluation.apiReview} />
        <FeedbackCard title="Reliability review" content={evaluation.reliabilityReview} />
      </section>
    </div>
  );
};
