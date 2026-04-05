import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const AppShell = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <Sidebar />
        </div>
        <Outlet />
      </main>
    </div>
  );
};
