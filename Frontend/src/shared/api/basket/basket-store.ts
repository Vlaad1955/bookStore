import { create } from "zustand";
import { basketApi } from "./basket-api";
import { Book } from "@/shared/types/bookTypes/bookTypes";

type BasketItem = {
  id: string;
  book: Book;
  quantity: number;
};

type Basket = {
  id: string;
  items: BasketItem[];
};

type BasketState = {
  basket: Basket | null;
  isLoading: boolean;
  error: string | null;

  fetchBasket: () => Promise<void>;
  addToBasket: (bookId: string, quantity?: number) => Promise<void>;
  removeFromBasket: (bookId: string) => Promise<void>;
  clearBasket: () => Promise<void>;
};

export const useBasketStore = create<BasketState>((set) => ({
  basket: null,
  isLoading: false,
  error: null,

  fetchBasket: async () => {
    try {
      set({ isLoading: true });
      const res = await basketApi.getBasket();
      set({ basket: res.data, error: null });
    } catch {
      set({ error: "Не вдалося завантажити корзину" });
    } finally {
      set({ isLoading: false });
    }
  },

  addToBasket: async (bookId, quantity = 1) => {
    try {
      set({ isLoading: true });
      const res = await basketApi.addBook({ bookId, quantity });

      set((state) => {
        const updatedItem = res.data.items.find(
          (item: { book: { id: string } }) => item.book.id === bookId
        );
        if (!updatedItem) {
          return { basket: res.data, error: null };
        }

        const currentItems = state.basket?.items || [];

        const itemExists = currentItems.some(
          (item) => String(item.book.id) === bookId
        );

        const updatedItems = itemExists
          ? currentItems.map((item) =>
              String(item.book.id) === bookId ? updatedItem : item
            )
          : [...currentItems, updatedItem];

        return {
          basket: {
            ...res.data,
            items: updatedItems,
          },
          error: null,
        };
      });
    } catch {
      set({ error: "Не вдалося додати книгу до корзини" });
    } finally {
      set({ isLoading: false });
    }
  },

  removeFromBasket: async (bookId) => {
    try {
      set({ isLoading: true });
      const res = await basketApi.removeBook(bookId);
      set({ basket: res.data, error: null });
    } catch {
      set({ error: "Не вдалося видалити книгу з корзини" });
    } finally {
      set({ isLoading: false });
    }
  },

  clearBasket: async () => {
    try {
      set({ isLoading: true });
      const res = await basketApi.clearBasket();
      set({ basket: res.data, error: null });
    } catch {
      set({ error: "Не вдалося очистити корзину" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
