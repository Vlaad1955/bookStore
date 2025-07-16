import { create } from "zustand";
import { toggleLikeBook, getLikesCount, getLikedBooks } from "../api/favorite";
import { useAuthStore } from "@/features/auth/auth-store/useAuthStore";
import { Book } from "@/features/books/types/book";

interface FavoriteBooksStore {
  favorites: Book[];
  likesCount: Record<string, number>;
  isSyncing: boolean;

  toggleFavorite: (bookId: string) => Promise<void>;
  isFavorite: (bookId: string) => boolean;
  fetchFavorites: () => Promise<void>;
  fetchLikesCount: (bookId: string) => Promise<number>;
}

export const useFavoriteBooksStore = create<FavoriteBooksStore>((set, get) => ({
  favorites: [],
  likesCount: {},
  isSyncing: false,

  toggleFavorite: async (bookId: string) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      console.warn("User not authenticated — toggle aborted.");
      return;
    }

    if (get().isSyncing) return;
    set({ isSyncing: true });

    const state = get();
    const isFav = state.favorites.some((b) => String(b.id) === bookId);

    const updatedFavorites = isFav
      ? state.favorites
      : [...state.favorites, { id: bookId } as unknown as Book];

    set({ favorites: updatedFavorites });

    try {
      await toggleLikeBook(bookId);

      const updatedList = await getLikedBooks({ noLimit: true });
      set({ favorites: updatedList });

      const { count } = await getLikesCount(bookId);
      set((state) => ({
        likesCount: {
          ...state.likesCount,
          [bookId]: count,
        },
      }));
    } catch (error) {
      console.error("toggleFavorite error:", error);
      await get().fetchFavorites();
    } finally {
      set({ isSyncing: false });
    }
  },

  isFavorite: (bookId: string) => {
    return get().favorites.some((book) => String(book.id) === bookId);
  },

  fetchFavorites: async () => {
    try {
      const books = await getLikedBooks({ noLimit: true });
      set({ favorites: books });
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
