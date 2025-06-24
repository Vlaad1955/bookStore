import { create } from "zustand";

interface CategoryListStore {
  isOpen: boolean;
  openList: () => void;
  closeList: () => void;
  toggleList: () => void;
}

export const useCategoryListStore = create<CategoryListStore>((set) => ({
  isOpen: false,
  openList: () => set({ isOpen: true }),
  closeList: () => set({ isOpen: false }),
  toggleList: () => set((state) => ({ isOpen: !state.isOpen })),
}));
