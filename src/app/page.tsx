'use client'

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Not authenticated</p>
      </div>
    );
  }

  const { user, expires } = session;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome, {user?.name}
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/edit")}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium"
            >
              Edit Profile
            </button>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm font-medium"
            >
              Signout
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex items-center gap-6">
          <Image
            src={user?.image || ""}
            alt="User Avatar"
            width={96}
            height={96}
            className="rounded-full border"
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.name}
            </h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              User ID: {user?.id}
            </p>
          </div>
        </div>

        {/* Session Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Session Status
            </h3>
            <p className="text-lg font-semibold text-green-600">
              Authenticated
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Session Expires
            </h3>
            <p className="text-sm text-gray-900">
              {new Date(expires).toLocaleString()}
            </p>
          </div>

        </div>

        {/* Raw Session */}
        <div className="mt-8 bg-black rounded-2xl p-6 text-sm text-green-400 overflow-x-auto">
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>

      </div>
    </div>
  );
}
