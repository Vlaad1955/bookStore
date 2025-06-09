import { create } from "zustand";
import { authService } from "../auth-service/auth-service";
import { UserSignInRequestDto } from "@/shared/auth/authTypes/user-sign-in-request-dto";
import { UserSignUpRequestDto } from "@/shared/auth/authTypes/user-sign-up-request-dto";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  // user: unknown | null;
  error: string | null;
  // checkAuth: () => Promise<void>;
  signIn: (payload: UserSignInRequestDto) => Promise<void>;
  signUp: (payload: UserSignUpRequestDto) => Promise<void>;
  logout: () => Promise<void>;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  ...authService.getState(),
  // checkAuth: async () => {
  //   await authService.checkAuth();
  //   set(authService.getState());
  // },
  signIn: async (payload) => {
    await authService.signIn(payload);
    set(authService.getState());
  },
  signUp: async (payload) => {
    console.log(typeof payload.phone);
    await authService.signUp(payload);
    set(authService.getState());
  },
  logout: async () => {
    await authService.logout();
    set(authService.getState());
  },
  setToken: (token: string | null) => set({ token, isAuthenticated: !!token }),
}));
