'use client'

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const session = useSession()
  console.log(session?.data?.user)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, 
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Logged in successfully");
      router.push("/"); 
    }

    console.log(res);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-6">

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
          onClick={() => signIn("google")}
          className="w-full mt-5 flex items-center justify-center gap-3 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition font-medium text-gray-700"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignIn}>

          {/* Email */}
          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 text-xs text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-4">
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
