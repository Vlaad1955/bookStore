"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/auth-store/useAuthStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push("/auth/sign-in");
    }
  }, [isInitialized, isAuthenticated, router]);

  if (!isInitialized) {
    return <p>Завантаження...</p>;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
