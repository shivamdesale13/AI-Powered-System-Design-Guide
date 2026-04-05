import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GOOGLE_AUTH_MUTATION, LOGIN_MUTATION, SIGNUP_MUTATION } from "../api/graphql";
import { useAuth } from "../app/AuthProvider";
import { Navbar } from "../components/layout/Navbar";
import { GoogleAuthButton } from "../components/auth/GoogleAuthButton";
import type { User } from "../types";

type AuthResponse = {
  token: string;
  user: User;
};

export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const auth = useAuth();
  const [signup, signupState] = useMutation<{ signup: AuthResponse }>(SIGNUP_MUTATION);
  const [login, loginState] = useMutation<{ login: AuthResponse }>(LOGIN_MUTATION);
  const [googleAuth, googleAuthState] = useMutation<{ googleAuth: AuthResponse }>(GOOGLE_AUTH_MUTATION);

  const loading = signupState.loading || loginState.loading || googleAuthState.loading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      if (mode === "signup") {
        const { data } = await signup({ variables: { input: form } });
        if (data) auth.login(data.signup);
        return;
      }

      const { data } = await login({
        variables: { input: { email: form.email, password: form.password } }
      });
      if (data) auth.login(data.login);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Authentication failed.");
    }
  };

  const handleGoogleCredential = async (idToken: string) => {
    setError("");

    try {
      const { data } = await googleAuth({
        variables: {
          input: { idToken }
        }
      });

      if (data) {
        auth.login(data.googleAuth);
      }
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Google authentication failed.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[36px] border border-white/70 bg-ink p-8 text-paper shadow-panel">
          <div className="text-sm uppercase tracking-[0.2em] text-gold">Sharpen your architecture thinking</div>
          <h1 className="mt-4 font-display text-5xl leading-tight">Train with problem prompts and interviewer-style critique.</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-paper/75">
            Build the habit of writing clear trade-offs, not vague buzzwords. Every submission is scored and archived so improvement is measurable.
          </p>
        </section>
        <section className="glass-panel rounded-[36px] border border-white/70 p-8 shadow-panel">
          <div className="mb-6 flex rounded-full bg-white p-1">
            {(["signup", "login"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${
                  mode === item ? "bg-ink text-paper" : "text-slate"
                }`}
              >
                {item === "signup" ? "Create account" : "Log in"}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Your name"
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-ember"
              />
            ) : null}
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="Email address"
              type="email"
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-ember"
            />
            <input
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Password"
              type="password"
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-ember"
            />
            {error ? <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e6572c] disabled:opacity-60"
            >
              {loading ? "Working..." : mode === "signup" ? "Create account" : "Log in"}
            </button>
          </form>
          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate">
            <div className="h-px flex-1 bg-stone-200" />
            or continue with
            <div className="h-px flex-1 bg-stone-200" />
          </div>
          <GoogleAuthButton onCredential={handleGoogleCredential} disabled={loading} />
          <p className="mt-4 text-xs leading-5 text-slate">
            Google sign-in requires `GOOGLE_CLIENT_ID` in both `.env` and the Google Cloud OAuth configuration.
          </p>
        </section>
      </main>
    </div>
  );
};
