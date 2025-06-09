import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";

export const basketApi = {
  addBook: (payload: { bookId: string; quantity?: number }) =>
    axiosInstance.post("/basket/add", payload),

  removeBook: (bookId: string) =>
    axiosInstance.delete(`/basket/remove/${bookId}`),

  clearBasket: () => axiosInstance.delete("/basket/clear"),

  getBasket: () => axiosInstance.get("/basket/find"),
};
