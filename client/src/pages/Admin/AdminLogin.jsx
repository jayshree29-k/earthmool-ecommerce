import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.png";
import useAdminAuth from "../../hooks/useAdminAuth";

function AdminLogin() {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const requestedPath = location.state?.from?.pathname;
  const redirectPath =
    requestedPath?.startsWith("/admin") && requestedPath !== "/admin/login"
      ? requestedPath
      : "/admin";

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6]">
        <LoaderCircle className="animate-spin text-[#274E13]" size={32} />
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Unable to log in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FCFAF6] px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#E8E1D5] bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex justify-center">
            <img src={logo} alt="Earthmool" className="h-16 w-auto object-contain" />
          </Link>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[2px] text-[#527443]">
            Admin Portal
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[#163824]">
            Sign in to Earthmool
          </h1>
        </div>

        {error && (
          <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Email</span>
            <span className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 focus-within:border-[#274E13] focus-within:ring-2 focus-within:ring-[#274E13]/15">
              <Mail size={18} className="shrink-0 text-gray-400" />
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="min-w-0 flex-1 py-3 outline-none"
                placeholder="admin@example.com"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Password</span>
            <span className="flex items-center gap-3 rounded-lg border border-gray-300 px-3 focus-within:border-[#274E13] focus-within:ring-2 focus-within:ring-[#274E13]/15">
              <LockKeyhole size={18} className="shrink-0 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="min-w-0 flex-1 py-3 outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#274E13] px-5 py-3.5 font-semibold text-white transition hover:bg-[#163824] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <LoaderCircle size={18} className="animate-spin" />}
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLogin;
