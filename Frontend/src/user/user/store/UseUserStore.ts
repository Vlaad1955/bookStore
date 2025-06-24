import { create } from "zustand";
import { userService } from "../user-service/userService";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  age: number;
  image: string;
  isEmailConfirmed: boolean;
  role: "Admin" | "User";
  comments: unknown[];
  basket: null;
}

interface UserState {
  user: User | null;
  isUserInitialized: boolean;
  setUser: (user: User | null) => void;
  loadUser: () => Promise<void>;
  updateUserFields: (data: Partial<User>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isUserInitialized: false,

  setUser: (user) => {
    set({ user, isUserInitialized: true });
  },

  loadUser: async () => {
    try {
      const user = await userService.getCurrentUser();
      set({ user: user ?? null, isUserInitialized: true });
    } catch {
      set({ user: null, isUserInitialized: true }); // навіть у разі помилки
    }
  },

  updateUserFields: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : state.user,
    })),

  resetUser: () => set({ user: null, isUserInitialized: true }),
}));
