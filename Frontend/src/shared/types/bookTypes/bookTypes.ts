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
  categories: CategoryDto[];
}

export interface FetchBooksOptions {
  page?: number;
  title?: string;
  published?: string; // важливо: string, не boolean
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