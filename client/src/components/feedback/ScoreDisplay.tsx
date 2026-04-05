export const ScoreDisplay = ({ score }: { score: number }) => {
  const stroke = 2 * Math.PI * 52;
  const offset = stroke - (score / 100) * stroke;

  return (
    <div className="glass-panel flex flex-col items-center rounded-[32px] border border-white/70 p-6 shadow-panel">
      <div className="mb-4 text-sm uppercase tracking-[0.18em] text-slate">Interview Score</div>
      <div className="relative h-36 w-36">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="12" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#ff6a3d"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={stroke}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-4xl text-ink">{score}</div>
      </div>
      <p className="mt-4 text-center text-sm text-slate">AI-evaluated readiness for this system design challenge.</p>
    </div>
  );
};
