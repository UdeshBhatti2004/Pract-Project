'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Logging in...");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    toast.dismiss(toastId);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Logged in successfully");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm px-6 sm:px-8 py-6">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-sm text-center mt-1">
          Login to your account
        </p>

        {/* Google Login */}
        <button
          type="button"
          disabled={loading}
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full mt-6 flex items-center justify-center gap-3 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition font-medium text-gray-700 disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSignIn}>
          {/* Email */}
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-600">Password</label>
            <div className="relative mt-1">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-5">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
