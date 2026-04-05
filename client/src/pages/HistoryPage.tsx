import { useQuery } from "@apollo/client";
import { HISTORY_QUERY } from "../api/graphql";
import { SubmissionHistoryTable } from "../components/history/SubmissionHistoryTable";
import type { Submission } from "../types";

export const HistoryPage = () => {
  const { data, loading, error } = useQuery<{ submissionHistory: Submission[] }>(HISTORY_QUERY);

  if (loading) return <div className="glass-panel rounded-[30px] border border-white/70 p-8 shadow-panel">Loading history...</div>;
  if (error) return <div className="rounded-[24px] bg-red-50 p-5 text-sm text-red-700">{error.message}</div>;

  return (
    <div className="space-y-6">
      <section>
        <div className="text-sm uppercase tracking-[0.2em] text-slate">Submission archive</div>
        <h1 className="section-title mt-2">Review every attempt</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate">
          Use the history view to spot whether your explanations are becoming more concrete, more structured, and easier to defend under interviewer pressure.
        </p>
      </section>
      <SubmissionHistoryTable submissions={data?.submissionHistory ?? []} />
    </div>
  );
};
