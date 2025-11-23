'use client'

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setCandidates(data);
      }

      setLoading(false);
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold">Loading candidates...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Candidates</h1>

      {candidates.length === 0 && (
        <p className="opacity-70">No candidates found.</p>
      )}

      <div className="grid gap-6">
        {candidates.map((c) => (
          <div
            key={c.candidate_id}
            className="border border-white/10 p-4 rounded-lg bg-[#0f172a]"
          >
            <h2 className="font-bold text-lg">
              {c.full_name || "Unnamed"}
            </h2>
            <p className="text-sm opacity-70">{c.email || "No email"}</p>
            <p className="text-sm opacity-70">
              {c.current_job_title || "No job title"}
            </p>
            <p className="text-sm mt-2">
              Fit Score: <span className="text-blue-400 font-bold">{c.fit_score ?? 0}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
