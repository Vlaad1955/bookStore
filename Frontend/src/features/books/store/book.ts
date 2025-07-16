import { create } from "zustand";

interface BookStore {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  clearSelectedCategories: () => void;
}

export const useBookStore = create<BookStore>((set) => ({
  selectedCategories: [],
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
  clearSelectedCategories: () => set({ selectedCategories: [] }),
}));
