export const FeedbackCard = ({
  title,
  content,
  tone = "default"
}: {
  title: string;
  content: string | string[];
  tone?: "default" | "positive" | "warning";
}) => {
  const toneClasses =
    tone === "positive"
      ? "border-emerald-200 bg-emerald-50"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50"
        : "border-white/60 bg-white/70";

  return (
    <section className={`rounded-[24px] border p-5 ${toneClasses}`}>
      <h3 className="mb-3 text-lg font-semibold text-ink">{title}</h3>
      {Array.isArray(content) ? (
        <ul className="space-y-2 text-sm leading-6 text-slate">
          {content.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-6 text-slate">{content}</p>
      )}
    </section>
  );
};
