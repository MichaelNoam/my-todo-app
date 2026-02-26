"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      getSupabase()
        .auth.getSession()
        .then(({ data: { session } }) => {
          if (session) {
            router.replace("/todos");
          } else {
            router.replace("/login");
          }
        })
        .catch((err) => setError(String(err)));
    } catch (err) {
      setError(String(err));
    }
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded p-4 max-w-lg">
          <h2 className="font-bold text-red-800">Error</h2>
          <p className="text-red-700 text-sm mt-1">{error}</p>
          <p className="text-gray-500 text-xs mt-2">
            SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "MISSING"} |
            ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "MISSING"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}
