export interface Comment {
  id: string;
  text: string;
  user: {
    id: string;
    firstName: string;
    role?: string; // якщо роль знадобиться для перевірки прав
  };
  book: {
    id: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
