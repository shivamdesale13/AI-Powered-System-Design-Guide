import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { AppShell } from "../components/layout/AppShell";
import { AuthPage } from "../pages/AuthPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HistoryPage } from "../pages/HistoryPage";
import { LandingPage } from "../pages/LandingPage";
import { ProblemPage } from "../pages/ProblemPage";
import { ResultsPage } from "../pages/ResultsPage";

const ProtectedRoute = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/auth" replace />;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="problems/:slug" element={<ProblemPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="results/:submissionId" element={<ResultsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
