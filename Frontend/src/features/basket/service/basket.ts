import { Book } from "@/features/books/types/book";
import { basketApi } from "../api/basket";

export type BasketItem = {
  id: string;
  book: Book;
  quantity: number;
};

export type Basket = {
  id: string;
  items: BasketItem[];
};

class BasketService {
  private basket: Basket | null = null;
  private isLoading = false;
  private error: string | null = null;

  async fetchBasket() {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await basketApi.getBasket();
      this.basket = res.data;
    } catch {
      this.error = "Не вдалося завантажити корзину";
    } finally {
      this.isLoading = false;
    }
  }

  async addToBasket(bookId: string, quantity = 1) {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await basketApi.addBook({ bookId, quantity });

      const updatedItem = res.data.items.find(
        (item: { book: { id: string } }) => item.book.id === bookId
      );

      if (!updatedItem) {
        this.basket = res.data;
        return;
      }

      const currentItems = this.basket?.items || [];

      const itemExists = currentItems.some(
        (item) => String(item.book.id) === bookId
      );

      const updatedItems = itemExists
        ? currentItems.map((item) =>
            String(item.book.id) === bookId ? updatedItem : item
          )
        : [...currentItems, updatedItem];

      this.basket = {
        ...res.data,
        items: updatedItems,
      };
    } catch {
      this.error = "Не вдалося додати книгу до корзини";
    } finally {
      this.isLoading = false;
    }
  }

  async removeFromBasket(bookId: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await basketApi.removeBook(bookId);

      const currentItems = this.basket?.items || [];

      const updatedItems = currentItems.filter(
        (item) => String(item.book.id) !== bookId
      );

      this.basket = {
        ...res.data,
        items: updatedItems,
      };
    } catch {
      this.error = "Не вдалося видалити книгу з корзини";
    } finally {
      this.isLoading = false;
    }
  }

  async clearBasket() {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await basketApi.clearBasket();
      this.basket = res.data;
    } catch {
      this.error = "Не вдалося очистити корзину";
    } finally {
      this.isLoading = false;
    }
  }

  getState() {
    return {
      basket: this.basket,
      isLoading: this.isLoading,
      error: this.error,
    };
  }
}

export const basketService = new BasketService();
