import { create } from "zustand";
import { userService } from "../user-service/user-service";

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
  setUser: (user: User | null) => void;
  loadUser: () => Promise<void>;
  updateUserFields: (data: Partial<User>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  loadUser: async () => {
    const user = await userService.getCurrentUser();
    set({ user: user ?? null });
  },

  updateUserFields: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : state.user,
    })),

  resetUser: () => set({ user: null }),
}));
