"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session?.user) {
      setName(session.user.name || "");
      setPreview(session.user.image || "");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  // Image change (preview only)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    //  loading toast
    const toastId = toast.loading("Saving profile...");

    try {
      let imageUrl = preview;

      // Upload image if changed
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await axios.post("/api/upload", formData);
        imageUrl = uploadRes.data.url;
      }

      // Update database
      await axios.put("/api/user/update", {
        name,
        image: imageUrl,
      });

      // Update NextAuth session
      await update({
        name,
        image: imageUrl,
      });

      /// success toast (replace loading)
      toast.success("Profile updated successfully", { id: toastId });

      router.push("/");
    } catch (error: any) {
      /// error toast (replace loading)
      toast.error(
        error?.response?.data?.message || "Profile update failed",
        { id: toastId }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Edit Profile
          </h1>

          <button
            onClick={() => router.push("/")}
            className="
              group inline-flex items-center gap-2
              px-5 py-2.5 rounded-xl
              bg-white border border-gray-200
              shadow-sm text-sm font-medium text-gray-700
              hover:bg-gray-50 hover:shadow-md
              transition-all
            "
          >
            <span
              className="
                flex items-center justify-center
                w-8 h-8 rounded-full
                bg-gray-100
                group-hover:bg-indigo-100
                group-hover:text-indigo-600
                transition
              "
            >
              ←
            </span>
            Back to Home
          </button>
        </div>

        
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          
          <div className="flex items-center gap-6 mb-6">
            <label className="relative cursor-pointer group">
              <Image
                src={preview || "/avatar.png"}
                alt="User Avatar"
                width={80}
                height={80}
                className="rounded-full border object-cover"
              />

              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium">
                Change
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <div>
              <p className="text-sm text-gray-500">Profile picture</p>
              <p className="text-xs text-gray-400">
                JPG or PNG • Max 2MB
              </p>
            </div>
          </div>

          
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="text-xs text-gray-600">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">
                Email (read only)
              </label>
              <input
                value={session?.user?.email || ""}
                disabled
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
