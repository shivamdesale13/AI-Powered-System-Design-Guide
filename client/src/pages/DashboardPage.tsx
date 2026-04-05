import { useQuery } from "@apollo/client";
import { Activity, Gauge, Sparkles, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { DASHBOARD_QUERY, PROBLEMS_QUERY } from "../api/graphql";
import { ProblemCard } from "../components/problems/ProblemCard";
import { StatsCard } from "../components/stats/StatsCard";
import { formatDate } from "../lib/format";
import type { DashboardStats, Problem } from "../types";

export const DashboardPage = () => {
  const { data: dashboardData, loading: dashboardLoading, error } = useQuery<{ dashboard: DashboardStats }>(DASHBOARD_QUERY);
  const { data: problemData } = useQuery<{ problems: Problem[] }>(PROBLEMS_QUERY);

  if (dashboardLoading) {
    return <div className="glass-panel rounded-[30px] border border-white/70 p-8 shadow-panel">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="rounded-[24px] bg-red-50 p-5 text-sm text-red-700">{error.message}</div>;
  }

  const stats = dashboardData?.dashboard;

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Submissions" value={stats?.totalSubmissions ?? 0} helper="Completed interview attempts" accent={<Activity size={20} />} />
        <StatsCard label="Average score" value={stats?.averageScore ?? 0} helper="Your overall quality bar" accent={<Gauge size={20} />} />
        <StatsCard label="Latest score" value={stats?.latestScore ?? 0} helper="Most recent evaluation" accent={<Sparkles size={20} />} />
        <StatsCard label="Best topic" value={stats?.strongestProblem ?? "N/A"} helper="Highest-scoring challenge so far" accent={<Trophy size={20} />} />
      </section>

      <section className="glass-panel rounded-[32px] border border-white/70 p-6 shadow-panel">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-slate">Recent practice</div>
            <h2 className="section-title mt-2">Your latest submissions</h2>
          </div>
          <Link to="/app/history" className="text-sm text-ember transition hover:text-ink">
            View all history
          </Link>
        </div>
        <div className="space-y-4">
          {stats?.recentSubmissions?.length ? (
            stats.recentSubmissions.map((submission) => (
              <Link
                key={submission.id}
                to={`/app/results/${submission.id}`}
                className="flex flex-col gap-2 rounded-[24px] border border-white/70 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:shadow-panel md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="text-lg font-semibold text-ink">{submission.problem.title}</div>
                  <div className="text-sm text-slate">Submitted on {formatDate(submission.createdAt)}</div>
                </div>
                <div className="text-sm text-slate">
                  Score: <span className="font-semibold text-ink">{submission.evaluation?.score ?? "Pending"}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-stone-300 bg-white/50 p-6">
              <div className="mb-2 text-lg font-semibold text-ink">Your workspace is ready.</div>
              <p className="mb-4 max-w-2xl text-sm leading-6 text-slate">
                New accounts start with an empty history by design. Pick a challenge below, submit your first architecture answer, and this dashboard will start showing scores and improvement over time.
              </p>
              <a href="#problem-library" className="inline-flex rounded-full bg-ink px-5 py-2 text-sm text-paper transition hover:bg-forest">
                Choose your first challenge
              </a>
            </div>
          )}
        </div>
      </section>

      <section id="problem-library">
        <div className="mb-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate">Problem library</div>
          <h2 className="section-title mt-2">Pick your next challenge</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {problemData?.problems?.map((problem) => <ProblemCard key={problem.id} problem={problem} />)}
        </div>
      </section>
    </div>
  );
};
