"use client"

import { useAppSelector } from "@/redux/hooks"

export default function TestPage() {
  const auth = useAppSelector((state) => state.auth)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(auth, null, 2)}
      </pre>
    </div>
  )
} 