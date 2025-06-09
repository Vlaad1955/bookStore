export type Category = {
  id: string;
  name: string;
  parentId: string | null;
};

export interface CreateCategoryDto {
  name: string;
  parentId?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  parentId?: string;
}

export interface FetchCategoriesOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  parentId?: string;
  name?: string;
}
