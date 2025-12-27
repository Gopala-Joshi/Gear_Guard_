import { Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./stores/useStore";

/* Layout */
import Layout from "./components/layout/Layout";

/* Auth pages */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

/* App pages */
import Dashboard from "./pages/Dashboard";
import Technicians from "./pages/Technicians";
import Teams from "./pages/Teams";
import Categories from "./pages/Categories";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";
import Requests from "./pages/Requests";
import RequestNew from "./pages/RequestNew";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import WorkCenters from "./pages/WorkCenters";

/* -----------------------------
   Protected Route Wrapper
-------------------------------- */
function ProtectedRoute({ children }) {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
}

export default function App() {
  const user = useStore((state) => state.user);

  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
      />
      <Route
        path="/forgot-password"
        element={user ? <Navigate to="/dashboard" replace /> : <ForgotPassword />}
      />

      {/* ================= APP ================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/technicians"
        element={
          <ProtectedRoute>
            <Technicians />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <Teams />
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      <Route
        path="/equipment"
        element={
          <ProtectedRoute>
            <Equipment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/equipment/:id"
        element={
          <ProtectedRoute>
            <EquipmentDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <Requests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/requests/new"
        element={
          <ProtectedRoute>
            <RequestNew />
          </ProtectedRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      <Route
        path="/workcenters"
        element={
          <ProtectedRoute>
            <WorkCenters />
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
