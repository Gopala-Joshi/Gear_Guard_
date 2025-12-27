import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, Mail, Lock, User } from "lucide-react";
import Button from "../components/ui/Button";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo-only: no backend
    navigate("/login");
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
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-violet-600 rounded-xl flex items-center justify-center mb-4">
              <Settings className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Create Account
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Join GearGuardPro
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  required
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2">
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400 mt-2">
            Demo mode – signup is simulated
          </p>
        </div>
      </motion.div>
    </div>
  );
}
