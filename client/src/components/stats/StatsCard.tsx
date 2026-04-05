import type { ReactNode } from "react";

export const StatsCard = ({
  label,
  value,
  accent,
  helper
}: {
  label: string;
  value: string | number;
  accent: ReactNode;
  helper: string;
}) => {
  return (
    <div className="glass-panel rounded-[28px] border border-white/70 p-6 shadow-panel">
      <div className="mb-5 flex items-center justify-between">
        <div className="text-sm uppercase tracking-[0.18em] text-slate">{label}</div>
        <div className="rounded-2xl bg-white p-3 text-ember">{accent}</div>
      </div>
      <div className="mb-2 font-display text-5xl text-ink">{value}</div>
      <div className="text-sm text-slate">{helper}</div>
    </div>
  );
};
