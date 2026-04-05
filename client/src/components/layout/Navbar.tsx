import { BrainCircuit, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/AuthProvider";

export const Navbar = () => {
  const { user, logout, token } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-white/50 bg-paper/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to={token ? "/app" : "/"} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-paper shadow-panel">
            <BrainCircuit size={20} />
          </div>
          <div>
            <div className="font-display text-xl">AI-Powered System Design Simulator</div>
            <div className="text-sm text-slate">Interview practice with AI feedback</div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              {user.avatarUrl ? <img src={user.avatarUrl} alt={user.name} className="h-9 w-9 rounded-full object-cover" /> : null}
              <div className="text-sm text-slate">{user.name}</div>
            </div>
          ) : null}
          {token ? (
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-2 text-sm text-ink transition hover:bg-ink hover:text-paper"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link to="/auth" className="rounded-full bg-ink px-5 py-2 text-sm text-paper transition hover:bg-forest">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
