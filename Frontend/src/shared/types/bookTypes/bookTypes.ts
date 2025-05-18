export interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  price: number;
  description?: string;
  gift: boolean;
  cover: 'soft' | 'firm';
  published: boolean;
}

export interface FetchBooksOptions {
  categories?: string;
  [key: string]: string | number | boolean | undefined;
}



//Для адміністратора
export interface CreateBookDto {
  title: string;
  price: number;
  description?: string;
  author?: string;
  image?: string; // бек сам проставить, не обов’язково передавати
  gift: boolean;
  cover: 'soft' | 'firm';
  categories: string[]; // масив UUID
}

export interface UpdateBookDto {
  title?: string;
  price?: number;
  description?: string;
  author?: string;
  image?: string;
  gift?: boolean;
  cover?: 'soft' | 'firm';
  categories?: string[];
}

export interface UpdatePublishedDto {
  published: boolean;
}

export interface CategoryDto {
  id: string;
  name: string;
}