import { create } from "zustand";
import {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from "../types/authTypes/authTypes";
import axiosInstance from "./axiosInstance";

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
  isAuthenticated:
    typeof window !== "undefined" && !!localStorage.getItem("token"),
  isLoading: false,
  token: null,
  error: null,

  signIn: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/login", payload);
      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      set({ isAuthenticated: true, token: accessToken, isLoading: false });
    } catch (error) {
      console.error("Sign In Error:", error);
      set({ isLoading: false, error: "Помилка входу" });
    }
  },

  signUp: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/auth/registration", payload);
      const { accessToken } = response.data;
      localStorage.setItem("token", accessToken);
      set({ isAuthenticated: true, token: accessToken, isLoading: false });
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
