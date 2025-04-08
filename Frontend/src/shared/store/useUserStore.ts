import { create } from "zustand";

// Тип користувача
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  //   cart: any[];
  //   favorites: any[];
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  //   updateCart: (cart: any[]) => void;
  //   updateFavorites: (favorites: any[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  // Зберігаємо користувача після авторизації
  setUser: (user) => set({ user }),

  // Оновлення кошика
  //   updateCart: (cart) =>
  // set((state) => (state.user ? { user: { ...state.user, cart } } : {})),

  // Оновлення вподобань
  //   updateFavorites: (favorites) =>
  // set((state) => (state.user ? { user: { ...state.user, favorites } } : {})),
}));
