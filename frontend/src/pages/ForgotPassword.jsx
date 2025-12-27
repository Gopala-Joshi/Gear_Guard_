import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-8">
          {!sent ? (
            <>
              <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                Forgot Password
              </h1>
              <p className="text-sm text-slate-500 mb-6">
                Enter your email and we’ll send you reset instructions.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Check your email
              </h2>
              <p className="text-sm text-slate-500">
                If this were a real system, a reset link would be sent to:
              </p>
              <p className="font-medium text-slate-700 mt-2">{email}</p>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-violet-600 hover:underline mt-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
