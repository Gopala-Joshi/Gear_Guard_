import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, Mail, Lock } from "lucide-react";
import { useStore } from "../stores/useStore";
import Button from "../components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-14 h-14 bg-violet-600 rounded-xl mb-4">
              <Settings className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">
              GearGuardPro
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Enterprise Maintenance Management
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <Link
                to="/forgot-password"
                className="text-violet-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-violet-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>

            <p className="mt-3 text-xs text-slate-400">
              Demo mode: authentication is simulated
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
