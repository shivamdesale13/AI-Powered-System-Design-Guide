import { BarChart3, ClipboardList, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/history", label: "History", icon: ClipboardList },
  { to: "/app", label: "Insights", icon: BarChart3 }
];

export const Sidebar = () => {
  return (
    <aside className="glass-panel rounded-[32px] border border-white/60 p-5 shadow-panel">
      <div className="mb-6 text-sm uppercase tracking-[0.25em] text-slate">Workspace</div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/app"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive ? "bg-ink text-paper" : "text-slate hover:bg-white/70 hover:text-ink"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
