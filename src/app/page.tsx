'use client'

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Not authenticated</p>
      </div>
    );
  }

  const { user, expires } = session;

  return (
        <div className="min-h-screen sm:h-screen sm:overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-5">
      <div className="max-w-4xl mx-auto space-y-6">

        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Welcome, <span className="text-indigo-600">{user?.name}</span>
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/edit")}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm font-medium"
            >
              Edit Profile
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm font-medium"
            >
              Sign out
            </button>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
            <Image
              src={user?.image || "/avatar.png"}
              alt="User Avatar"
              fill
              className="rounded-full border object-cover"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-500 truncate">
              {user?.email}
            </p>
            <p className="text-xs text-gray-400 truncate">
              User ID: {user?.id}
            </p>
          </div>
        </div>

        {/* Session Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Session Status</p>
            <p className="text-base font-semibold text-green-600">
              Authenticated
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Session Expires</p>
            <p className="text-sm text-gray-900">
              {new Date(expires).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-black rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-green-400 h-56 sm:h-64 overflow-hidden">
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
}
