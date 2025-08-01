"use client";

import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginSuccess, logout } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";

export default function AuthSync() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (session?.access_token && session?.refresh_token && !isAuthenticated) {
      // Store NextAuth tokens in Redux
      console.log("Storing NextAuth tokens in Redux:", {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        user: session.user,
      });

      dispatch(
        loginSuccess({
          user: {
            email: session.user?.email || "user@example.com",
            name: session.user?.name || "Authenticated User",
            provider: "keycloak",
          },
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
        })
      );
    } else if (!session && isAuthenticated) {
      // Clear Redux auth if NextAuth session is gone
      console.log("Clearing Redux auth - NextAuth session ended");
      dispatch(logout());
    }
  }, [session, status, dispatch, isAuthenticated]);

  return null; // This component doesn't render anything
}
