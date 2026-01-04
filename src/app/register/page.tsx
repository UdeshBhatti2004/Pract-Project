'use client'

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });
     
      toast.success("Account created successfully!");
      console.log(res);

      router.push("/login")

    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("User already exists");
      } else {
        toast.error("Something went wrong");
      }
      console.log("Error in sending data", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm px-8 py-6">
        
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Create Account
        </h2>
        <p className="text-gray-500 text-sm text-center mt-1">
          Sign up to get started
        </p>

        <button
          type="button"
          className="w-full mt-5 flex items-center justify-center gap-3 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 transition font-medium text-gray-700"
          onClick={() => signIn("google", { callbackUrl: "/login" })}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          
          <div>
            <label className="text-xs text-gray-600">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600">Password</label>
            <div className="relative mt-1">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
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

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
