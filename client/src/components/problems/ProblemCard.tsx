import { ArrowRight, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import { difficultyLabel } from "../../lib/format";
import type { Problem } from "../../types";

export const ProblemCard = ({ problem }: { problem: Problem }) => {
  return (
    <article className="glass-panel flex h-full flex-col rounded-[28px] border border-white/70 p-6 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate">
          {difficultyLabel(problem.difficulty)}
        </span>
        <Layers3 size={18} className="text-ember" />
      </div>
      <h3 className="mb-2 font-display text-2xl text-ink">{problem.title}</h3>
      <p className="mb-5 flex-1 text-sm leading-6 text-slate">{problem.description}</p>
      <div className="mb-5 flex flex-wrap gap-2">
        {problem.expectedServices.slice(0, 4).map((service) => (
          <span key={service} className="rounded-full bg-mist px-3 py-1 text-xs text-forest">
            {service}
          </span>
        ))}
      </div>
      <Link
        to={`/app/problems/${problem.slug}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-ink transition hover:text-ember"
      >
        Start challenge
        <ArrowRight size={16} />
      </Link>
    </article>
  );
};
