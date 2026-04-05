import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_SUBMISSION_MUTATION, PROBLEM_QUERY } from "../api/graphql";
import { StructuredEditor, emptyDraft } from "../components/editor/StructuredEditor";
import type { Problem, Submission } from "../types";

export const ProblemPage = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(emptyDraft);
  const [formError, setFormError] = useState("");
  const { data, loading, error } = useQuery<{ problem: Problem }>(PROBLEM_QUERY, { variables: { slug } });
  const [createSubmission, submissionState] = useMutation<{ createSubmission: Submission }>(CREATE_SUBMISSION_MUTATION);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");

    if (!data?.problem) {
      return;
    }

    try {
      const { data: submissionData } = await createSubmission({
        variables: {
          input: {
            problemId: data.problem.id,
            ...draft
          }
        }
      });

      if (submissionData?.createSubmission.id) {
        navigate(`/app/results/${submissionData.createSubmission.id}`);
      }
    } catch (submissionError) {
      setFormError(submissionError instanceof Error ? submissionError.message : "Failed to submit answer.");
    }
  };

  if (loading) return <div className="glass-panel rounded-[30px] border border-white/70 p-8 shadow-panel">Loading problem...</div>;
  if (error || !data?.problem) return <div className="rounded-[24px] bg-red-50 p-5 text-sm text-red-700">{error?.message ?? "Problem not found."}</div>;

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/70 bg-ink p-8 text-paper shadow-panel">
        <div className="text-sm uppercase tracking-[0.2em] text-gold">Challenge</div>
        <h1 className="mt-3 font-display text-5xl">{data.problem.title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-7 text-paper/80">{data.problem.prompt}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {data.problem.expectedServices.map((service) => (
            <span key={service} className="rounded-full bg-white/10 px-3 py-1 text-xs text-paper/85">
              {service}
            </span>
          ))}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <StructuredEditor value={draft} onChange={setDraft} />
        {formError ? <div className="rounded-[20px] bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</div> : null}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submissionState.loading}
            className="rounded-full bg-ember px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#e6572c] disabled:opacity-60"
          >
            {submissionState.loading ? "Evaluating answer..." : "Submit for AI feedback"}
          </button>
        </div>
      </form>
    </div>
  );
};
