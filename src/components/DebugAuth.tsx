"use client";

import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";

export default function DebugAuth() {
  const { data: session, status } = useSession();
  const auth = useAppSelector((state) => state.auth);

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded mt-4">
      <h3 className="font-bold text-red-800">Debug Information:</h3>

      <div className="mt-2">
        <h4 className="font-semibold">NextAuth Session:</h4>
        <p>Status: {status}</p>
        <p>Has Session: {session ? "Yes" : "No"}</p>
        {session && (
          <div className="ml-4">
            <p>Access Token: {session.access_token ? "Present" : "Missing"}</p>
            <p>
              Refresh Token: {session.refresh_token ? "Present" : "Missing"}
            </p>
            <p>User Email: {session.user?.email || "None"}</p>
            <p>User Name: {session.user?.name || "None"}</p>
          </div>
        )}
      </div>

      <div className="mt-2">
        <h4 className="font-semibold">Redux Auth State:</h4>
        <p>Is Authenticated: {auth.isAuthenticated ? "Yes" : "No"}</p>
        <p>Access Token: {auth.accessToken ? "Present" : "Missing"}</p>
        <p>User Email: {auth.user?.email || "None"}</p>
        <p>User Name: {auth.user?.name || "None"}</p>
      </div>
    </div>
  );
}
