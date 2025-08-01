"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, accessToken } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  console.log("AuthGuard State:", { isAuthenticated, accessToken, isChecking });

  useEffect(() => {
    // Give time for auth state to initialize
    const timer = setTimeout(() => {
      setIsChecking(false);

      console.log("AuthGuard Check:", { isAuthenticated, accessToken });

      // Check if user is authenticated
      if (!isAuthenticated && !accessToken) {
        console.log("AuthGuard: Redirecting to login");
        router.push("/login");
      } else {
        console.log("AuthGuard: User is authenticated");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, accessToken, router]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show loading or redirect if not authenticated
  if (!isAuthenticated && !accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
