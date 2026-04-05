import { useQuery } from "@apollo/client";
import { ArrowRight, ChartSpline, FilePenLine, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PROBLEMS_QUERY } from "../api/graphql";
import { Navbar } from "../components/layout/Navbar";
import { ProblemCard } from "../components/problems/ProblemCard";
import type { Problem } from "../types";

export const LandingPage = () => {
  const { data } = useQuery<{ problems: Problem[] }>(PROBLEMS_QUERY);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[40px] border border-white/70 bg-ink px-8 py-10 text-paper shadow-panel">
            <div className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-gold">
              Production-style interview prep
            </div>
            <h1 className="max-w-3xl font-display text-5xl leading-tight md:text-6xl">
              Practice system design like a senior engineer under real interview pressure.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-paper/75">
              Submit structured architecture answers, receive AI-generated interviewer feedback, and track whether your reasoning is improving across high-signal challenges.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/auth" className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e6572c]">
                Start practicing
              </Link>
              <a href="#problems" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm transition hover:bg-white/10">
                Explore problems
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["Structured answers", "Interview-friendly sections help you think clearly instead of free-writing chaos.", <FilePenLine size={18} key="1" />],
              ["AI feedback engine", "Scores, gaps, trade-offs, reliability, and an ideal answer outline on every attempt.", <Sparkles size={18} key="2" />],
              ["Progress tracking", "A dashboard that shows recent submissions and score momentum over time.", <ChartSpline size={18} key="3" />]
            ].map(([title, body, icon]) => (
              <div key={title as string} className="glass-panel rounded-[30px] border border-white/70 p-6 shadow-panel">
                <div className="mb-4 inline-flex rounded-2xl bg-white p-3 text-ember">{icon}</div>
                <h2 className="mb-2 text-xl font-semibold text-ink">{title}</h2>
                <p className="text-sm leading-6 text-slate">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="problems" className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-slate">Challenge library</div>
              <h2 className="section-title mt-2">Practice on real interview classics</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {data?.problems?.map((problem) => <ProblemCard key={problem.id} problem={problem} />)}
          </div>
        </section>
      </main>
    </div>
  );
};
