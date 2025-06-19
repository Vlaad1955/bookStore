import { Book } from "@/features/books/types/book";

export interface Comment {
  id: string;
  text: string;
  user: {
    id: string;
    firstName: string;
    role?: string;
  };
  book: Book;
  createdAt?: string;
  updatedAt?: string;
}
