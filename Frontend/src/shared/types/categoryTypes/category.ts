export type Category = {
  id: string;
  name: string;
  parentId: string | null;
};

export interface FetchCategoriesOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  parentId?: string;
  name?: string;
}
