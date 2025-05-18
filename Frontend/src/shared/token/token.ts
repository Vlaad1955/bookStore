"use client";
import { useEffect } from "react";
import { tokenStorage } from "./UseTokenStore";
import { useAuthStore } from "../auth/auth-store/use-auth-store";

const TokenInit = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = tokenStorage.getToken();
      useAuthStore.getState().setToken(token);
    }
  });
  return null;
};

export default TokenInit;
