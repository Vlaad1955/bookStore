import { create } from "zustand";
import { toggleLikeBook, getLikesCount, getLikedBooks } from "../api/favorite";

interface FavoriteBooksStore {
  favorites: string[];
  likesCount: Record<string, number>;

  toggleFavorite: (bookId: string) => Promise<void>;
  isFavorite: (bookId: string) => boolean;
  fetchFavorites: () => Promise<void>;
  fetchLikesCount: (bookId: string) => Promise<number>;
}

export const useFavoriteBooksStore = create<FavoriteBooksStore>((set, get) => ({
  favorites: [],
  likesCount: {},

  toggleFavorite: async (bookId: string) => {
    try {
      await toggleLikeBook(bookId);

      const isFav = get().favorites.includes(bookId);
      const updatedFavorites = isFav
        ? get().favorites.filter((id) => id !== bookId)
        : [...get().favorites, bookId];

      set({ favorites: updatedFavorites });

      const { count } = await getLikesCount(bookId);
      set((state) => ({
        likesCount: {
          ...state.likesCount,
          [bookId]: count,
        },
      }));
    } catch (e) {
      console.error("Failed to toggle favorite:", e);
    }
  },

  isFavorite: (bookId: string) => get().favorites.includes(bookId),

  fetchFavorites: async () => {
    try {
      const books = await getLikedBooks();
      const ids = books.map((book) => book.id.toString());
      set({ favorites: ids });
    } catch (e) {
      console.error("Failed to fetch favorites:", e);
    }
  },

  fetchLikesCount: async (bookId: string) => {
    try {
      const { count } = await getLikesCount(bookId);
      set((state) => ({
        likesCount: {
          ...state.likesCount,
          [bookId]: count,
        },
      }));
      return count;
    } catch (e) {
      console.error("Failed to fetch like count:", e);
      return 0;
    }
  },
}));
