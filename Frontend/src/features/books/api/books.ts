import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import { FetchBooksOptions, Book } from "@/features/books/types/book";
import { retryAsync } from "@/shared/hooks/retry/useRetry.hook";

type BooksListResponse = {
  entities: Book[];
  pages: number;
  page: number;
};

export async function getAllBooks(): Promise<BooksListResponse> {
  return retryAsync(() =>
    axiosInstance.get<BooksListResponse>("/books/list").then((res) => res.data)
  );
}

export async function getBooksInOneCategory(
  cleanParams: FetchBooksOptions
): Promise<BooksListResponse> {
  return retryAsync(() =>
    axiosInstance
      .get<BooksListResponse>("/books/list", { params: cleanParams })
      .then((res) => res.data)
  );
}

export async function getOneBook(id: string): Promise<Book> {
  return retryAsync(() =>
    axiosInstance.get<Book>(`/books/find/${id}`).then((res) => res.data)
  );
}
