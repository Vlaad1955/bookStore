export interface Comment {
  id: string;
  text: string;
  user: {
    id: string;
    firstName: string;
    role?: string;
  };
  book: {
    id: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
