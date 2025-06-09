import { create } from "zustand";
import { Basket, basketService } from "../service/basket";

interface BasketState {
  basket: Basket | null;
  isLoading: boolean;
  error: string | null;
  fetchBasket: () => Promise<void>;
  addToBasket: (bookId: string, quantity?: number) => Promise<void>;
  removeFromBasket: (bookId: string) => Promise<void>;
  clearBasket: () => Promise<void>;
}

export const useBasketStore = create<BasketState>((set) => ({
  ...basketService.getState(),

  fetchBasket: async () => {
    await basketService.fetchBasket();
    set(basketService.getState());
  },

  addToBasket: async (bookId, quantity) => {
    await basketService.addToBasket(bookId, quantity);
    set(basketService.getState());
  },

  removeFromBasket: async (bookId) => {
    await basketService.removeFromBasket(bookId);
    set(basketService.getState());
  },

  clearBasket: async () => {
    await basketService.clearBasket();
    set(basketService.getState());
  },
}));
