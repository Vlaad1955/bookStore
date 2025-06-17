"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/user/user/store/UseUserStore";
import { useAuthStore } from "../auth/auth-store/useAuthStore";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export const ProtectedRouteRole = ({ allowedRoles, children }: Props) => {
  const router = useRouter();
  const { isAuthenticated, isInitialized } = useAuthStore();
  const { user, isUserInitialized, loadUser } = useUserStore();

  const role = user?.role;

  useEffect(() => {
    const initialize = async () => {
      if (!isUserInitialized) {
        await loadUser();
      }
    };
    initialize();
  }, [isUserInitialized, loadUser]);

  useEffect(() => {
    if (isInitialized && isUserInitialized) {
      if (!isAuthenticated) {
        router.push("/auth/sign-in");
      } else if (!role || !allowedRoles.includes(role)) {
        router.push("/403");
      }
    }
  }, [
    isInitialized,
    isUserInitialized,
    isAuthenticated,
    role,
    allowedRoles,
    router,
  ]);

  if (!isInitialized || !isUserInitialized) {
    return <p>Завантаження...</p>;
  }

  return <>{children}</>;
};
