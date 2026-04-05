import type { ChangeEvent } from "react";

const sections = [
  ["overview", "Overview", "Summarize the core problem framing and the first-pass architecture."],
  ["requirements", "Functional + Non-functional Requirements", "List the product scope, scale assumptions, latency targets, and consistency needs."],
  ["capacityEstimation", "Capacity Estimation", "Rough throughput, storage, QPS, read/write ratios, and growth assumptions."],
  ["dataModel", "Database Design", "Main entities, relationships, indexes, and partitioning thoughts."],
  ["apiDesign", "API Design", "Key endpoints, payload shapes, and pagination/streaming strategy."],
  ["highLevelDesign", "High-Level Design", "Services, data flow, caches, queues, and storage systems."],
  ["deepDives", "Deep Dives", "Pick the hardest components and explain them in detail."],
  ["bottlenecks", "Trade-offs + Reliability", "Call out bottlenecks, failure modes, observability, and trade-offs."]
] as const;

export type SubmissionDraft = Record<(typeof sections)[number][0], string>;

export const emptyDraft: SubmissionDraft = {
  overview: "",
  requirements: "",
  capacityEstimation: "",
  dataModel: "",
  apiDesign: "",
  highLevelDesign: "",
  deepDives: "",
  bottlenecks: ""
};

export const StructuredEditor = ({
  value,
  onChange
}: {
  value: SubmissionDraft;
  onChange: (next: SubmissionDraft) => void;
}) => {
  const handleChange = (key: keyof SubmissionDraft) => (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...value,
      [key]: event.target.value
    });
  };

  return (
    <div className="space-y-5">
      {sections.map(([key, label, helper]) => (
        <section key={key} className="rounded-[28px] border border-white/70 bg-white/70 p-5">
          <label className="mb-2 block text-lg font-semibold text-ink">{label}</label>
          <p className="mb-4 text-sm text-slate">{helper}</p>
          <textarea
            value={value[key]}
            onChange={handleChange(key)}
            rows={6}
            className="w-full rounded-2xl border border-stone-200 bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-ember"
            placeholder={`Write your ${label.toLowerCase()} here...`}
          />
        </section>
      ))}
    </div>
  );
};
