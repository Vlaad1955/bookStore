export interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  price: number;
  description: string;
}

export interface FetchBooksOptions {
  categories?: string;
  [key: string]: string | number | boolean | undefined;
}
