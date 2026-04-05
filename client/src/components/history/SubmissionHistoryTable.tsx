import { Link } from "react-router-dom";
import { difficultyLabel, formatDate } from "../../lib/format";
import type { Submission } from "../../types";

export const SubmissionHistoryTable = ({ submissions }: { submissions: Submission[] }) => {
  return (
    <div className="glass-panel overflow-hidden rounded-[28px] border border-white/70 shadow-panel">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/70 text-slate">
          <tr>
            <th className="px-6 py-4 font-medium">Problem</th>
            <th className="px-6 py-4 font-medium">Difficulty</th>
            <th className="px-6 py-4 font-medium">Score</th>
            <th className="px-6 py-4 font-medium">Submitted</th>
            <th className="px-6 py-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} className="border-t border-white/60">
              <td className="px-6 py-4">{submission.problem.title}</td>
              <td className="px-6 py-4 text-slate">{difficultyLabel(submission.problem.difficulty)}</td>
              <td className="px-6 py-4 font-semibold text-ink">{submission.evaluation?.score ?? "Pending"}</td>
              <td className="px-6 py-4 text-slate">{formatDate(submission.createdAt)}</td>
              <td className="px-6 py-4">
                <Link to={`/app/results/${submission.id}`} className="text-ember transition hover:text-ink">
                  View feedback
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
