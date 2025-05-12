export interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  price: number;
}

export interface FetchBooksOptions {
  categories?: string;
  [key: string]: string | number | boolean | undefined;
}
