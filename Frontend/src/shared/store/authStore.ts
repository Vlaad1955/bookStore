import { create } from "zustand";
import { useEffect, useState } from "react";
import {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from "../types/authTypes/authTypes";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  error: string | null;
  signIn: (payload: UserSignInRequestDto) => void;
  signUp: (payload: UserSignUpRequestDto) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false, 
  isLoading: false,
  token: null,
  error: null,

  signIn: async (payload) => {
    set({ isLoading: true });
    try {
      const fakeToken = "mock_token_" + payload.email;
      localStorage.setItem("token", fakeToken);
      set({ isAuthenticated: true, token: fakeToken, isLoading: false });
    } catch (error) {
      console.error("Sign In Error:", error);
      set({ isLoading: false, error: "Помилка входу" });
    }
  },

  signUp: async (payload) => {
    set({ isLoading: true });
    try {
      const fakeToken = "mock_token_" + payload.email;
      localStorage.setItem("token", fakeToken);
      set({ isAuthenticated: true, token: fakeToken, isLoading: false });
    } catch (error) {
      console.error("Sign Up Error:", error);
      set({ isLoading: false, error: "Помилка реєстрації" });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, token: null });
  },
}));

// Функція для ініціалізації isAuthenticated на клієнті
export const useAuthInit = () => {
  const { setState } = useAuthStore;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setState({ isAuthenticated: !!token, token });
    setIsMounted(true);
  }, []);

  return isMounted;
};
