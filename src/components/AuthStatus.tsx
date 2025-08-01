"use client";

import { useAppSelector } from "@/redux/hooks";

export default function AuthStatus() {
  const { isAuthenticated, accessToken, user } = useAppSelector(
    (state) => state.auth
  );

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded">
      <h3 className="font-bold">Redux Auth Status:</h3>
      <p>Authenticated: {isAuthenticated ? "✅ Yes" : "❌ No"}</p>
      <p>
        Access Token:{" "}
        {accessToken ? `✅ ${accessToken.substring(0, 20)}...` : "❌ None"}
      </p>
      <p>User: {user ? `✅ ${user.email}` : "❌ None"}</p>
    </div>
  );
}
