import { create } from "zustand";
import { authService } from "../auth-service/authService";
import { userApi } from "@/features/user/user-api/userApi";
import { useUserStore } from "@/features/user/store/UseUserStore";
import { tokenStorage } from "@/shared/token/UseTokenStore";
import { UserSignInRequestDto } from "../authTypes/user-sign-in-request-dto";
import { UserSignUpRequestDto } from "../authTypes/user-sign-up-request-dto";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  token: string | null;
  error: string | null;
  signIn: (payload: UserSignInRequestDto) => Promise<void>;
  signUp: (payload: UserSignUpRequestDto) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,

  setToken: (token) => {
    set({ token, isAuthenticated: !!token, isInitialized: true });
  },

  signIn: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const token = await authService.signIn(payload);
      tokenStorage.setToken(token);
      const { data } = await userApi.fetchCurrentUser();
      useUserStore.getState().setUser(data);
      set({ token, isAuthenticated: true });
    } catch (err) {
      set({ error: "Помилка входу", isAuthenticated: false });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const token = await authService.signUp(payload);
      tokenStorage.setToken(token);
      const { data } = await userApi.fetchCurrentUser();
      useUserStore.getState().setUser(data);
      set({ token, isAuthenticated: true });
    } catch (err) {
      set({ error: "Помилка реєстрації", isAuthenticated: false });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  refresh: async () => {
    try {
      const token = await authService.refreshToken();
      tokenStorage.setToken(token);
      set({ token, isAuthenticated: true });
      const { data } = await userApi.fetchCurrentUser();
      useUserStore.getState().setUser(data);
    } catch {
      tokenStorage.removeToken();
      set({ token: null, isAuthenticated: false });
      useUserStore.getState().setUser(null);
    }
  },

  logout: async () => {
    await authService.logout();
    tokenStorage.removeToken();
    useUserStore.getState().setUser(null);
    set({ token: null, isAuthenticated: false });
  },
}));
