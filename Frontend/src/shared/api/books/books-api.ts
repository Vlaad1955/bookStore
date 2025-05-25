import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import { FetchBooksOptions } from "@/shared/types/bookTypes/bookTypes";

export async function getAllBooks() {
  const response = await axiosInstance.get("/books/list");
  return response.data;
}

export async function getBooksInOneCategory(cleanParams: FetchBooksOptions) {
  const response = await axiosInstance.get("/books/list", {
    params: cleanParams,
  });

  return response.data;
}

export async function getOneBook(id: string) {
  const response = await axiosInstance.get(`/books/find/${id}`);
  return response.data;
}
