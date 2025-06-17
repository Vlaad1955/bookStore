"use client";
import { useEffect } from "react";
import { tokenStorage } from "./UseTokenStore";
import { useAuthStore } from "../auth/auth-store/useAuthStore";
import { userApi } from "@/user/user/user-api/userApi";
import { useUserStore } from "@/user/user/store/UseUserStore";

export const TokenInit = () => {
  useEffect(() => {
    const token = tokenStorage.getToken();

    if (token) {
      useAuthStore.getState().setToken(token);
      userApi
        .fetchCurrentUser()
        .then(({ data }) => {
          useUserStore.getState().setUser(data);
        })
        .catch(() => {
          useAuthStore.getState().setToken(null);
          tokenStorage.removeToken();
          useUserStore.getState().resetUser();
        });
    } else {
      useAuthStore.getState().setToken(null);
      useUserStore.getState().resetUser();
    }
  }, []);

  return null;
};

export default TokenInit;
