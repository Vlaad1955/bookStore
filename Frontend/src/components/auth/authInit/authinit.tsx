"use client";

import { useAuthStore } from "@/shared/auth/auth-store/use-auth-store";
import { useEffect } from "react";

export const AuthInit = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    console.log("AuthInit useEffect");
    const checkUserAuth = async () => {
      await checkAuth();
    };

    checkUserAuth();
  }, [checkAuth]);

  console.log("AuthInit user", useAuthStore.getState().user);
  console.log("Home isAuthenticated", useAuthStore.getState().isAuthenticated);
  return null;
};
