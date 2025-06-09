import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";

export const basketApi = {
  // Додати книгу до корзини
  addBook: (payload: { bookId: string; quantity?: number }) =>
    axiosInstance.post("/basket/add", payload),

  // Видалити одну книгу з корзини
  removeBook: (bookId: string) =>
    axiosInstance.delete(`/basket/remove/${bookId}`),

  // Очистити всю корзину
  clearBasket: () => axiosInstance.delete("/basket/clear"),

  // (Опційно) Отримати поточну корзину
  getBasket: () => axiosInstance.get("/basket/find"),
};
