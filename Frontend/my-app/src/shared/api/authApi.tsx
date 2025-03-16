import { create } from "zustand";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  UserSignInRequestDto,
  UserSignUpRequestDto,
} from "../types/authTypes/authTypes";

const API_URL = "https://your-backend.com/api/auth"; // Замініть на URL вашого бекенду

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
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, payload);
      const { token } = response.data;
      localStorage.setItem("token", token);
      set({ isAuthenticated: true, token, isLoading: false });
    } catch (error) {
      console.error("Sign In Error:", error);
      set({ isLoading: false, error: "Помилка входу" });
    }
  },

  signUp: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register`, payload);
      const { token } = response.data;
      localStorage.setItem("token", token);
      set({ isAuthenticated: true, token, isLoading: false });
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
    if (token) {
      setState({ isAuthenticated: true, token });
    }
    setIsMounted(true);
  }, []);

  return isMounted;
};
