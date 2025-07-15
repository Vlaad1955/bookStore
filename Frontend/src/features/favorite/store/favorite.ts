import { create } from "zustand";
import { toggleLikeBook, getLikesCount, getLikedBooks } from "../api/favorite";
import { useAuthStore } from "@/features/auth/auth-store/useAuthStore";
import { Book } from "@/features/books/types/book";

interface FavoriteBooksStore {
  favorites: Book[];
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
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      console.warn("Користувач не авторизований — запит не відправлено.");
      return;
    }

    try {
      await toggleLikeBook(bookId);

      const currentFavorites = get().favorites;
      const isFav = currentFavorites.some((book) => String(book.id) === bookId);

      let updatedFavorites: Book[] = [];

      if (isFav) {
        updatedFavorites = currentFavorites.filter(
          (book) => String(book.id) !== bookId
        );
      } else {
        const updatedList = await getLikedBooks();
        const newBook = updatedList.find((book) => String(book.id) === bookId);
        if (newBook) {
          updatedFavorites = [...currentFavorites, newBook];
        } else {
          updatedFavorites = currentFavorites;
        }
      }

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
