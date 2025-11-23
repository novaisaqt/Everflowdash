'use client'

export const dynamic = "force-dynamic"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function Page() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.from("candidates").select("*")
      setData(data || [])
    }
    run()
  }, [])

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Supabase Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
