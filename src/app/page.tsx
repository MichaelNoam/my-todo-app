"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    getSupabase().auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/todos");
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}
